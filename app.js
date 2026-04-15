import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

// Security & Environment Validation
import { validateRequiredEnv, validateJWTSecret } from './config/security.js';

// Validate environment variables at startup
try {
    validateRequiredEnv();
    validateJWTSecret();
    console.log("✅ Environment variables validated");
} catch (error) {
    console.error("❌ Startup validation failed:", error.message);
    process.exit(1);
}

import "./utils/videoQueue.js";

const app = express();

// Routes Import
import userRouter from './routes/userRoutes.js'; 
import videoRouter from './routes/videoRoute.js';
import commentRouter from './routes/commentroutes.js';
import playlistRouter from './routes/playlistRoute.js';
import aiRouter from './routes/aiRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from "child_process";
exec("ffmpeg -version", (err, stdout, stderr) => {
    if (err) {
        console.error("❌ FFmpeg not working:", err);
        return;
    }
    console.log("✅ FFmpeg working:");
    console.log(stdout);
});
// ES Modules path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============ MIDDLEWARE ============

// CORS Configuration
const corsOptions = {
    origin: (process.env.corsOrigin || 'http://localhost:5173').split(',').map(url => url.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Request logging middleware (development)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`📨 ${req.method} ${req.path}`);
        next();
    });
}

// Body parser with limits for video metadata
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ============ API ROUTES ============
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/ai", aiRouter);

// ============ TEST ROUTE ============
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

// ============ HOME ROUTE ============
app.get('/', (req, res) => {
    res.json({ 
        message: "🎬 Welcome to Streaming YouTube Clone API",
        version: "1.0.0",
        endpoints: {
            health: "/health",
            api: "/api/v1",
            docs: "Contact admin for documentation"
        }
    });
});

// ============ 404 HANDLER ============
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        path: req.path,
        method: req.method
    });
});

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ============ DATABASE & SERVER START ============
const port = process.env.PORT || 5000;
const mongoUri = process.env.mongooseKey;

if (!mongoUri) {
    console.error("❌ FATAL: mongooseKey environment variable is not set");
    process.exit(1);
}

const connectWithRetry = async (retries = 5, delay = 3000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log("✅ Successfully connected to MongoDB");
            return true;
        } catch (err) {
            console.error(`❌ MongoDB connection attempt ${i + 1}/${retries} failed:`, err.message);
            if (i < retries - 1) {
                console.log(`⏳ Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    return false;
};

const startServer = async () => {
    try {
        const connected = await connectWithRetry();
        
        if (!connected) {
            throw new Error("Failed to connect to MongoDB after multiple retries");
        }

        const server = app.listen(port, () => {
            console.log(`\n🚀 Server running on port ${port}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 Base URL: http://localhost:${port}`);
            console.log(`💾 Database: Connected\n`);
        });

        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            console.log(`\n${signal} received, shutting down gracefully...`);
            
            server.close(async () => {
                console.log("✅ HTTP server closed");
                
                try {
                    await mongoose.connection.close();
                    console.log("✅ MongoDB connection closed");
                } catch (err) {
                    console.error("❌ Error closing MongoDB:", err);
                }
                
                process.exit(0);
            });

            // Force shutdown after 5 seconds
            setTimeout(() => {
                console.error("❌ Force shutdown after 10 seconds");
                process.exit(1);
            }, 5000);
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    } catch (err) {
        console.error("❌ Failed to start server:", err.message);
        process.exit(1);
    }
};

// Start the server
startServer();

