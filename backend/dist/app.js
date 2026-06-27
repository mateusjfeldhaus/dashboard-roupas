"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const pieces_1 = __importDefault(require("./routes/pieces"));
const looks_1 = __importDefault(require("./routes/looks"));
const usage_1 = __importDefault(require("./routes/usage"));
const rating_1 = __importDefault(require("./routes/rating"));
const wishlist_1 = __importDefault(require("./routes/wishlist"));
const photos_1 = __importDefault(require("./routes/photos"));
const requireApiKey_1 = require("./middleware/requireApiKey");
exports.app = (0, express_1.default)();
// ── Wardrobe root: two levels up from backend/ ────────────────────────────────
const ROUPAS_DIR = path_1.default.resolve(__dirname, '../..');
// ── Middleware ────────────────────────────────────────────────────────────────
exports.app.use((0, helmet_1.default)());
const isDev = process.env.NODE_ENV === 'development';
exports.app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : isDev ? 'http://localhost:5173' : false,
}));
exports.app.use(express_1.default.json({ limit: '1mb' }));
// ── Image server (/img/*) ────────────────────────────────────────────────────
const MIME = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
};
exports.app.use('/img', (req, res, next) => {
    try {
        const decoded = decodeURIComponent(req.path);
        const filePath = path_1.default.join(ROUPAS_DIR, decoded);
        if (!filePath.startsWith(ROUPAS_DIR + path_1.default.sep)) {
            res.status(403).end();
            return;
        }
        if (fs_1.default.existsSync(filePath) && fs_1.default.statSync(filePath).isFile()) {
            const ext = path_1.default.extname(filePath).toLowerCase();
            res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            fs_1.default.createReadStream(filePath).pipe(res);
        }
        else {
            next();
        }
    }
    catch {
        next();
    }
});
// ── Rate limit: máx 10 tentativas de login por IP a cada 15 min ──────────────
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
});
// ── Rate limit: máx 60 writes por IP por minuto (POST/PUT/DELETE) ─────────────
const writeLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60_000,
    limit: 60,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skip: (req) => req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS',
    message: { error: 'Muitas requisições. Tente novamente em instantes.' },
});
// ── POST /api/auth — valida PIN e emite JWT 24h ──────────────────────────────
exports.app.post('/api/auth', authLimiter, (req, res) => {
    const { pin } = req.body;
    const apiKey = process.env.API_KEY;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        res.status(500).json({ error: 'JWT_SECRET não configurado' });
        return;
    }
    if (!apiKey || pin !== apiKey) {
        res.status(401).json({ error: 'PIN incorreto' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({}, jwtSecret, { expiresIn: '24h' });
    res.json({ token });
});
// ── Auth: todas as rotas requerem JWT válido ──────────────────────────────────
// /img aceita token via query param ?t= (browser <img> não envia headers)
exports.app.use((req, res, next) => {
    if (req.method === 'OPTIONS')
        return next();
    if (req.path === '/api/auth')
        return next();
    if (req.path.startsWith('/img') && typeof req.query.t === 'string') {
        req.headers['x-api-key'] = req.query.t;
    }
    (0, requireApiKey_1.requireApiKey)(req, res, next);
});
// ── API routes ────────────────────────────────────────────────────────────────
exports.app.use('/api', writeLimiter);
exports.app.use('/api/pieces', pieces_1.default);
exports.app.use('/api/looks', looks_1.default);
exports.app.use('/api/usage', usage_1.default);
exports.app.use('/api/rating', rating_1.default);
exports.app.use('/api/wishlist', wishlist_1.default);
exports.app.use('/api/photos', photos_1.default);
