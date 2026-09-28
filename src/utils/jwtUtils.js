/**
 * JWT Simulation Utilities
 * Author: Saibadeep Mullick (BCA 4th Year)
 * React Assignment 7: Authentication System with Protected Route Guarding
 */

// Simple Base64 URL encode/decode for simulated standard RFC 7519 JWT
export const base64UrlEncode = (str) => {
  try {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
};

export const base64UrlDecode = (str) => {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(escape(atob(base64)));
  } catch (e) {
    return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  }
};

/**
 * Generate a simulated valid 3-part JWT token (header.payload.signature)
 * @param {Object} user 
 * @param {number} expiresInSeconds Default: 3600 (1 hour)
 * @returns {string} Simulated JWT
 */
export const generateJwtToken = (user, expiresInSeconds = 3600) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const expiryTime = currentTime + expiresInSeconds;

  const header = {
    alg: 'HS256',
    typ: 'JWT',
    kid: 'authguard-key-2026'
  };

  const payload = {
    sub: user.id || 'usr_007',
    username: user.username,
    name: user.name || 'Saibadeep Mullick',
    role: user.role || 'Security Specialist',
    email: user.email || `${user.username.toLowerCase()}@authguard.security`,
    department: 'Cyber Systems & BCA Research',
    iat: currentTime,
    exp: expiryTime,
    iss: 'AuthGuard-SecSystem-v7',
    aud: 'ReactAssignment7-Dashboard'
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  
  // Simulated SHA-256 HMAC signature hash representation
  const signatureSeed = `${encodedHeader}.${encodedPayload}.authguard_secret_2026`;
  let hash = 0;
  for (let i = 0; i < signatureSeed.length; i++) {
    const char = signatureSeed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const simulatedSignature = base64UrlEncode(`sig_sha256_${Math.abs(hash)}_${Date.now().toString(36)}`);

  return `${encodedHeader}.${encodedPayload}.${simulatedSignature}`;
};

/**
 * Decode a JWT token into its component parts
 * @param {string} token 
 * @returns {Object|null}
 */
export const decodeJwtToken = (token) => {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const headerStr = base64UrlDecode(parts[0]);
    const payloadStr = base64UrlDecode(parts[1]);

    const header = JSON.parse(headerStr);
    const payload = JSON.parse(payloadStr);

    return {
      raw: token,
      parts: {
        headerPart: parts[0],
        payloadPart: parts[1],
        signaturePart: parts[2]
      },
      header,
      payload,
      isExpired: payload.exp ? Math.floor(Date.now() / 1000) > payload.exp : false,
      expiresAt: payload.exp ? new Date(payload.exp * 1000) : null,
      issuedAt: payload.iat ? new Date(payload.iat * 1000) : null
    };
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

/**
 * Check if a token has expired
 * @param {string} token 
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  const decoded = decodeJwtToken(token);
  if (!decoded) return true;
  return decoded.isExpired;
};

/**
 * Format remaining time in MM:SS or human string
 * @param {number} expTimestamp 
 * @returns {string}
 */
export const formatRemainingTime = (expTimestamp) => {
  if (!expTimestamp) return '00:00';
  const remaining = expTimestamp - Math.floor(Date.now() / 1000);
  if (remaining <= 0) return 'Expired';
  
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
