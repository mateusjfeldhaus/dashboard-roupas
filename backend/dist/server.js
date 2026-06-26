"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const client_1 = require("./db/client");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3001;
// ── Wardrobe root: two levels up from backend/ ────────────────────────────────
const ROUPAS_DIR = path_1.default.resolve(__dirname, '../..');
// ── Middleware ────────────────────────────────────────────────────────────────
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
}));
app.use(express_1.default.json({ limit: '1mb' }));
// ── Image server (/img/*) ────────────────────────────────────────────────────
const MIME = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
};
app.use('/img', (req, res, next) => {
    try {
        const decoded = decodeURIComponent(req.path);
        const filePath = path_1.default.join(ROUPAS_DIR, decoded);
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
// ── Rate limit: máx 10 tentativas por IP a cada 15 min ───────────────────────
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
});
// ── POST /api/auth — valida PIN e emite JWT 24h ──────────────────────────────
app.post('/api/auth', authLimiter, (req, res) => {
    const { pin } = req.body;
    const apiKey = process.env.API_KEY;
    const jwtSecret = process.env.JWT_SECRET ?? apiKey; // JWT_SECRET separado; fallback para API_KEY
    if (!apiKey || pin !== apiKey) {
        res.status(401).json({ error: 'PIN incorreto' });
        return;
    }
    if (!jwtSecret) {
        res.status(500).json({ error: 'JWT_SECRET não configurado' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({}, jwtSecret, { expiresIn: '24h' });
    res.json({ token });
});
// ── Auth: bloqueia POST/PUT/DELETE sem token JWT válido ───────────────────────
app.use((req, res, next) => {
    if (req.method === 'GET' || req.method === 'OPTIONS')
        return next();
    (0, requireApiKey_1.requireApiKey)(req, res, next);
});
// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/pieces', pieces_1.default);
app.use('/api/looks', looks_1.default);
app.use('/api/usage', usage_1.default);
app.use('/api/rating', rating_1.default);
app.use('/api/wishlist', requireApiKey_1.requireApiKey, wishlist_1.default); // GET também protegido
app.use('/api/photos', requireApiKey_1.requireApiKey, photos_1.default); // GET também protegido
// ── Start ─────────────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
    if (!process.env.API_KEY) {
        console.warn('\n  ⚠️  AVISO: API_KEY não configurada — autenticação desativada!\n');
    }
    if (!process.env.CORS_ORIGIN) {
        console.warn('\n  ⚠️  AVISO: CORS_ORIGIN não configurado — aceitando qualquer origem!\n');
    }
    console.log(`\n  🚀  Backend rodando em http://localhost:${PORT}\n`);
});
// ── Graceful shutdown ─────────────────────────────────────────────────────────
async function shutdown(signal) {
    console.log(`\n  ${signal} recebido — encerrando servidor...\n`);
    server.close(async () => {
        await client_1.pool.end();
        console.log('  Pool de conexões encerrado. Até logo!\n');
        process.exit(0);
    });
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
