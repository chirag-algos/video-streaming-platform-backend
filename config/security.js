// Security Configuration for Production

export const validateRequiredEnv = () => {
const required = [
    'mongooseKey',
    'JWT_SECRET',
    'EMAIL_USER',
    'EMAIL_PASS',
    'EMAIL_CHECK',
    'cloudinaryName',
    'cloudinaryKey',
    'cloudinarySecret'
];

    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.error("❌ MISSING ENVIRONMENT VARIABLES:");
        missing.forEach(key => console.error(`   - ${key}`));
        
        if (process.env.NODE_ENV === 'production') {
            throw new Error(`Missing critical environment variables: ${missing.join(', ')}`);
        }
    }
};

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/'
};

export const validateJWTSecret = () => {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    
    if (secret.length < 32) {
        console.warn("⚠️  WARNING: JWT_SECRET should be at least 32 characters long for security");
    }
    
    if (process.env.NODE_ENV === 'development' && secret.includes('replace_me')) {
        console.warn("⚠️  WARNING: Using default JWT_SECRET - CHANGE THIS IN PRODUCTION");
    }
};

export default {
    validateRequiredEnv,
    validateJWTSecret,
    cookieOptions
};
