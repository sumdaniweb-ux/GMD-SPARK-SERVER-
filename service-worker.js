export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Only POST'});
  const KB = {
    "software":"Software engineering is systematic approach to development.",
    "algorithm":"Step-by-step procedure for solving problems.",
    "security":"SHA-256 ensures data integrity and authenticity.",
    "design":"Design patterns are reusable solutions to common problems.",
    "testing":"Testing verifies software works correctly.",
    "default":"میں سیکھ رہا ہوں۔ براہ کرم مزید تفصیل بتائیں۔"
  };
  const msg = (req.body.message||'').toLowerCase();
  let reply = KB.default;
  for(let key in KB) {
    if(msg.includes(key) && key!=='default') { reply = KB[key]; break; }
  }
  const crypto = require('crypto');
  res.status(200).json({
    reply: reply,
    hash: crypto.createHash('sha256').update(reply).digest('hex'),
    timestamp: new Date().toISOString()
  });
}
