# GMD Spark Chatbot

Secure Urdu/English AI Chat Interface with SHA-256 Encryption

## Features
- 🔐 SHA-256 Message Integrity
- 🎨 Custom Theme Editor
- 📎 File Attachment Support
- 🌐 API Integration Ready
- 📱 Mobile Responsive Design

## Configuration

Edit `index.html` line 265:

```javascript
const GMD_CONFIG = {
  API_URL: 'https://your-server.com/api/chat',
  USE_API: true,
  SHA256_ENABLED: true
};
```

## Deployment

1. Upload both files to GitHub
2. Enable GitHub Pages (Settings → Pages → Source: main branch)
3. Access via: `https://yourusername.github.io/repo-name`

## Security

- All messages hashed with SHA-256
- Input sanitization (XSS protection)
- API timeout handling
- CORS ready

## Created by
Saad Mir Hadi (GMD Project)

## License
MIT License