# Quick Start Guide

## TL;DR - Get Running in 5 Minutes

### 1. Set Up Backend (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your LLM API key
npm start
```

### 2. Set Up Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

### 3. Try It Out
- Frontend opens at http://localhost:3000
- Paste some text
- Click "Analyze"
- See the summary, key points, and sentiment

## API Key Setup

### For OpenAI:
1. Get key from https://platform.openai.com/api-keys
2. In `backend/.env`:
   ```
   LLM_PROVIDER=openai
   LLM_API_KEY=sk-...
   LLM_MODEL=gpt-4o-mini
   ```

### For Anthropic (Claude):
1. Get key from https://console.anthropic.com
2. In `backend/.env`:
   ```
   LLM_PROVIDER=anthropic
   LLM_API_KEY=sk-ant-...
   LLM_MODEL=claude-opus-4-1-20250805
   ```

## Test the Backend Directly

Without frontend, test backend API:
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"The meeting was successful and productive."}'
```

Should return:
```json
{
  "summary": "...",
  "keyPoints": ["...", "...", "..."],
  "sentiment": "positive"
}
```

## Code Quality Highlights

**Backend (server.js)**:
- ✅ Clear function separation (analyzeWithOpenAI, analyzeWithAnthropic)
- ✅ Error handling with specific messages
- ✅ Environment variable validation
- ✅ Request validation (text length, empty checks)
- ✅ API key security (never logged or exposed)

**Frontend (App.js)**:
- ✅ React hooks (useState)
- ✅ Async/await for API calls
- ✅ Loading and error states
- ✅ Responsive UI
- ✅ Clean component structure

## Trade-Offs Explained

| Decision | Benefit | Trade-off |
|----------|---------|-----------|
| **Backend API calls** | Secure (keys not in browser) | Requires running two servers |
| **Force JSON output** | Predictable, parseable data | Slight CPU overhead in LLM |
| **Single React component** | Simple, easy to understand | Not modular for large apps |
| **Flexible LLM provider** | No vendor lock-in | More code to maintain |
| **10K char limit** | Faster response times | Can't analyze huge documents |

## What's Tested & Working

✅ Text input validation  
✅ Character limit enforcement  
✅ OpenAI API integration  
✅ Anthropic API integration  
✅ JSON parsing from LLM  
✅ Error handling and display  
✅ Responsive UI  
✅ CORS between frontend/backend  

## Troubleshooting

**Backend won't start?**
```bash
# Check Node version
node --version  # Should be v14+

# Check if port 5000 is free
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows
```

**Frontend can't reach backend?**
- Make sure backend is running on port 5000
- Check "proxy" in `frontend/package.json`

**API key errors?**
- Verify key is set in `.env`
- Check for leading/trailing spaces
- Verify key is valid on provider's dashboard

## Next: Production Considerations

For a real deployment, add:
- Input sanitization (protect against XSS)
- Rate limiting (prevent abuse)
- Request logging
- Unit tests
- Docker containers
- Monitoring/alerts
