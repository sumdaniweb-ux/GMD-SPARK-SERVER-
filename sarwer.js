// api/chat.js
// GMD Spark® — Secure Backend API (Replaces server.js)
// Project Hash: pro_cd08ad44bdc2d429c19bcffe590f4f3926dd5c2de8f630c3499f60fa0f941f92

const crypto = require('crypto');

// === CONFIGURATION ===
const CONFIG = {
  PASSWORD: 'GMD2026Spark',           // ← آپ یہاں پاس ورڈ تبدیل کر سکتے ہیں
  PROJECT_HASH: 'pro_cd08ad44bdc2d429c19bcffe590f4f3926dd5c2de8f630c3499f60fa0f941f92',
  SHA256_ENABLED: true,
  LOG_ENABLED: true
};

// === KNOWLEDGE BASE (Merged & Powerful) ===
const KB = {
  "software": "Software engineering applies systematic, disciplined, quantifiable approaches to software development, operation, and maintenance.",
  "algorithm": "An algorithm is a finite sequence of rigorous instructions, typically used to solve a class of specific problems or to perform a computation.",
  "security": "SHA-256 generates a unique 64-character hexadecimal hash for any input, ensuring data integrity, authentication, and tamper detection.",
  "design": "Design patterns are general reusable solutions to commonly occurring problems within a given context in software design.",
  "testing": "Software testing is the process of evaluating and verifying that a software product or application does what it is supposed to do.",
  "agent": "An autonomous agent is a system that perceives its environment and takes actions to achieve goals with minimal human intervention.",
  "api": "An API defines methods and data formats for applications to communicate, enabling secure, standardized integration between systems.",
  "github": "GitHub provides Git repository hosting with collaboration features like pull requests, issue tracking, and continuous integration.",
  "vercel": "Vercel is a cloud platform for static sites and serverless functions with automatic SSL, global CDN, and preview deployments.",
  "encryption": "AES-256-GCM provides authenticated encryption, ensuring both confidentiality and integrity with a 256-bit symmetric key.",
  "authentication": "Authentication verifies identity through credentials; MFA adds layers using password, token, and biometric factors.",
  "firewall": "A firewall filters network traffic based on security rules, blocking unauthorized access while permitting legitimate communication.",
  "backup": "The 3-2-1 backup strategy: three copies, two media types, one offsite location — ensuring recovery from any disaster scenario.",
  "audit": "Append-only audit logs record every action with timestamp, user, and operation, enabling forensic analysis and compliance verification.",
  "sandbox": "Sandbox isolation executes untrusted code in a restricted environment with no access to host filesystem or network resources.",
  "integrity": "File integrity monitoring compares current SHA-256 hashes against baseline values to detect unauthorized modifications.",
  "access": "Role-Based Access Control (RBAC) assigns permissions to roles, enforcing least-privilege and simplifying user management.",
  "session": "Secure sessions use short-lived, HTTPS-only tokens with server-side validation to prevent hijacking and replay attacks.",
  "input": "Input validation sanitizes all user data against injection attacks using allowlists, parameterization, and output encoding.",
  "logging": "Structured logging with severity levels enables real-time monitoring, alerting, and post-incident root cause analysis.",
  "default": "میں سیکھ رہا ہوں۔ براہ کرم مزید تفصیل بتائیں یا کوئی مخصوص اصطلاح پوچھیں۔"
};

// === SHA-256 HASH FUNCTION ===
function generateHash(input) {
  if (!CONFIG.SHA256_ENABLED) return '';
  return crypto.createHash('sha256').update(input).digest('hex');
}

// === MAIN API HANDLER (Vercel Serverless Format) ===
export default async function handler(req, res) {
  // CORS Headers for frontend communication
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Project-Hash');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, clientHash, password } = req.body;

    // Optional password verification
    if (password && password !== CONFIG.PASSWORD) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message required' });
    }

    // Optional: Verify client hash (log mismatch but continue)
    if (clientHash && CONFIG.SHA256_ENABLED) {
      const expectedHash = generateHash(message);
      if (clientHash !== expectedHash) {
        console.warn(`[GMD] Hash mismatch: client=${clientHash?.slice(0,16)}..., expected=${expectedHash.slice(0,16)}...`);
      }
    }

    // Find reply from knowledge base
    const lowerMsg = message.toLowerCase();
    let reply = KB.default;
    
    for (const key in KB) {
      if (key !== 'default' && lowerMsg.includes(key)) {
        reply = KB[key];
        break;
      }
    }

    // Generate response hash
    const replyHash = CONFIG.SHA256_ENABLED ? generateHash(reply) : '';

    // Log request (if enabled)
    if (CONFIG.LOG_ENABLED) {
      console.log(`[GMD Spark] t=${new Date().toISOString()} msg="${message.substring(0,40)}..." hash=${replyHash?.slice(0,16)}...`);
    }

    // Return secure JSON response
    res.status(200).json({
      reply: reply,
      hash: replyHash,
      projectHash: CONFIG.PROJECT_HASH,
      timestamp: new Date().toISOString(),
      verified: CONFIG.SHA256_ENABLED
    });

  } catch (error) {
    console.error('[GMD Spark Error]', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      projectHash: CONFIG.PROJECT_HASH
    });
  }
}
