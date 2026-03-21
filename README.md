# Text Analyzer

A minimal full-stack application that analyzes unstructured text using an LLM API and returns structured, actionable insights.

## Features

- **Input**: Paste or type any unstructured text (up to 10,000 characters)
- **Processing**: Send text to OpenAI or Anthropic Claude
- **Output**: Get back:
  - One-sentence summary
  - Three key points
  - Sentiment classification (positive/negative/neutral)
- **UI**: Clean, modern web interface with real-time feedback
- **Security**: API keys stored on backend, not exposed to frontend

## Project Structure

```
zoo/
├── backend/              # Node.js Express server
│   ├── server.js         # Main API server with LLM integration
│   ├── package.json      # Dependencies
│   ├── .env.example      # Configuration template
│   └── .gitignore
│
└── frontend/             # React web application
    ├── src/
    │   ├── App.js        # Main React component
    │   ├── App.css       # Styling
    │   └── index.js      # ReactDOM entry
    ├── public/
    │   └── index.html
    ├── package.json
    └── .gitignore
```

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Dependencies**:
  - `axios` - HTTP requests to LLM APIs
  - `cors` - Cross-origin requests
  - `dotenv` - Environment variables

### Frontend
- **Framework**: React 18
- **HTTP Client**: axios
- **Styling**: Plain CSS with gradients and animations

### LLM Provider Options
- **OpenAI**: GPT-4o mini (configurable)
- **Anthropic**: Claude (configurable)

## Architecture Decisions

### 1. **Backend-First API Calls**
- **Why**: Keeps API keys secure (not exposed in browser)
- **How**: Backend server proxies all LLM requests, validates keys privately
- **Trade-off**: Requires running a backend server vs. pure frontend (but essential for production)

### 2. **Structured JSON Output**
- **Why**: Makes data predictable and easy to display
- **How**: Prompt explicitly asks LLM to return JSON with exact schema
- **Trade-off**: Small risk of parsing failure if LLM returns malformed JSON (mitigated with try-catch)

### 3. **Flexible LLM Provider Support**
- **Why**: Not locked into one service; costs can vary
- **How**: Single environment variable (`LLM_PROVIDER`) switches between OpenAI and Anthropic
- **Trade-off**: Requires separate API key management

### 4. **Simple React Component**
- **Why**: Single component keeps code minimal and easy to understand
- **How**: One App.js with state for input, results, loading, errors
- **Trade-off**: Not modular (for a production app, would split into smaller components)

## Setup & Running

### Prerequisites
- Node.js (v14+)
- npm or yarn
- LLM API key (OpenAI or Anthropic)

### Step 1: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):
```
LLM_PROVIDER=openai
LLM_API_KEY=sk-...your-key...
LLM_MODEL=gpt-4o-mini
PORT=5000
```

Start the backend:
```bash
npm start
```

Expected output:
```
Text Analyzer backend running on http://localhost:5000
LLM Provider: openai
```

### Step 2: Frontend Setup

In a new terminal:
```bash
cd frontend
npm install
npm start
```

This opens http://localhost:3000 automatically.

## API Documentation

### POST `/api/analyze`

**Request:**
```json
{
  "text": "Your unstructured text here..."
}
```

**Response (Success):**
```json
{
  "summary": "The text discusses how to build scalable software.",
  "keyPoints": [
    "Design with modularity in mind",
    "Use caching for performance",
    "Monitor system health continuously"
  ],
  "sentiment": "positive"
}
```

**Response (Error):**
```json
{
  "error": "Text input is required"
}
```

## How It Works

1. User enters text in React frontend
2. Click "Analyze" sends POST request to backend
3. Backend validates text length and content
4. Backend sends prompt + text to LLM (OpenAI or Anthropic)
5. LLM returns structured JSON response
6. Backend parses JSON and returns to frontend
7. Frontend displays summary, key points, and sentiment

## Example Usage

**Input:**
> "The meeting was productive. We discussed Q2 goals, assigned action items, and everyone committed to delivering by end of month. Some challenges were raised about resource constraints, but the team agreed to prioritize effectively."

**Output:**
- **Summary**: "The team held a productive meeting where Q2 goals were set and action items assigned despite resource constraints."
- **Key Points**:
  - Team committed to Q2 goals and action items
  - Resource constraints identified as a challenge
  - Team agreed on prioritization strategy
- **Sentiment**: positive

## Customization Options

### Change LLM Model
In `backend/.env`:
```
LLM_PROVIDER=openai
LLM_MODEL=gpt-4-turbo  # or gpt-3.5-turbo
```

### Switch to Claude
In `backend/.env`:
```
LLM_PROVIDER=anthropic
LLM_API_KEY=sk-ant-...
LLM_MODEL=claude-opus-4-1-20250805
```

### Adjust Temperature / Response Quality
In `backend/server.js`, modify the temperature parameter (0.0 = deterministic, 1.0 = creative):
```javascript
temperature: 0.3,  // Lower = more consistent, higher = more creative
```

### Change Character Limit
In `backend/server.js`:
```javascript
if (text.length > 10000) {  // Change 10000 to desired limit
```

## Error Handling

- **Invalid API Key**: Returns "Invalid OpenAI API key" or "Invalid Anthropic API key"
- **Text Too Long**: Returns "Text exceeds 10,000 character limit"
- **Empty Input**: Returns "Text input is required"
- **Backend Down**: Frontend shows "Failed to analyze text. Check if backend is running."

## Performance Notes

- **Response Time**: 2-5 seconds (depends on LLM provider)
- **Rate Limiting**: Depends on your LLM API plan
- **Max Text Size**: 10,000 characters (configurable)

## What This Demonstrates

✅ **Good Decisions**:
- Separation of concerns (frontend/backend)
- Secure API key handling
- Clear error messages
- Structured output format
- Flexible provider support
- Clean UI with real-time feedback

✅ **Clear Code**:
- Well-commented functions
- Descriptive variable names
- Proper middleware usage
- Consistent formatting

✅ **Explained Trade-offs**:
- Single-component React vs. modularity
- JSON parsing risks vs. structured data
- Provider flexibility vs. added complexity
- Security (backend API calls) vs. client-side simplicity

## Monitoring & Debugging

### Check Backend Health
```bash
curl http://localhost:5000/health
```

Should return: `{"status":"ok"}`

### Enable Debug Logging
Add to `backend/server.js`:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

## License

MIT

## Next Steps (Not Included)

For production, consider:
- Input sanitization (XSS protection)
- Rate limiting middleware
- Request caching
- Database for history
- User authentication
- Unit and integration tests
- Docker containerization
