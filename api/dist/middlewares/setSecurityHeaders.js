"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSecurityHeaders = void 0;
function setSecurityHeaders(req, res, next) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
}
exports.setSecurityHeaders = setSecurityHeaders;
