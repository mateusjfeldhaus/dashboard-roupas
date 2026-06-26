"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireApiKey = requireApiKey;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireApiKey(req, res, next) {
    const secret = process.env.JWT_SECRET ?? process.env.API_KEY; // JWT_SECRET separado; fallback para API_KEY
    if (!secret) {
        res.status(500).json({ error: 'Servidor mal configurado: API_KEY ausente' });
        return;
    }
    const token = req.headers['x-api-key'];
    if (!token) {
        res.status(401).json({ error: 'Token ausente' });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch {
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}
