"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUCKET = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;
if (!url || !key) {
    throw new Error('SUPABASE_URL e SUPABASE_SERVICE_KEY devem estar definidos no .env');
}
exports.supabase = (0, supabase_js_1.createClient)(url, key);
exports.BUCKET = 'look-photos';
