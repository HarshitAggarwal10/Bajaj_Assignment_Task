# Chitkara Full Stack Engineering Challenge

A complete full-stack solution for the Chitkara Full Stack Engineering Challenge. This project processes hierarchical relationships and provides comprehensive analysis of tree structures.

## 📋 Project Overview

**Objective:** Build a REST API that accepts an array of node strings, processes hierarchical relationships, and returns structured insights. Also includes a modern React frontend for interaction.

**Tech Stack:**
- **Backend:** Node.js, Express.js
- **Frontend:** React, Vite, Tailwind CSS
- **Language:** JavaScript
- **Deployment:** Ready for Vercel, Netlify, Railway, Render, etc.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation & Development

1. **Clone and setup:**
```bash
cd d:\Bajaj Assign
npm run build
```

2. **Run development servers:**
```bash
# Terminal 1 - Backend (runs on http://localhost:5000)
cd server
npm install
npm run dev

# Terminal 2 - Frontend (runs on http://localhost:5173)
cd client
npm install
npm run dev
```

3. **Access the application:**
- Frontend: http://localhost:5173
- API: http://localhost:5000/bfhl

## 📁 Project Structure

```
Bajaj Assign/
├── server/                    # Backend API
│   ├── index.js              # Main server file
│   ├── package.json
│   ├── .env                  # Development environment
│   ├── .env.production       # Production environment
│   └── .gitignore
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── App.jsx           # Main component
│   │   ├── main.jsx          # Entry point
│   │   ├── index.css         # Tailwind CSS
│   │   └── components/
│   │       ├── HierarchyForm.jsx     # Input form
│   │       ├── ResponseDisplay.jsx   # Results display
│   │       └── TreeViewer.jsx        # Tree visualization
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── postcss.config.js     # PostCSS configuration
│   ├── package.json
│   ├── .env                  # Development environment
│   ├── .env.production       # Production environment
│   └── .gitignore
├── package.json              # Root package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Server (.env & .env.production):**
```env
PORT=5000
FRONTEND_URL=http://localhost:5173  # or your production domain
NODE_ENV=development
```

**Client (.env & .env.production):**
```env
VITE_API_URL=http://localhost:5000  # or your production API
```

## 📡 API Specification

### Endpoint
```
POST /bfhl
Content-Type: application/json
```

### Request Body
```json
{
  "data": ["A->B", "A->C", "B->D"],
  "user_id": "johndoe_17091999",
  "email_id": "john.doe@college.edu",
  "college_roll_number": "21CS1001"
}
```

### Response Schema
```json
{
  "user_id": "string",
  "email_id": "string",
  "college_roll_number": "string",
  "hierarchies": [
    {
      "root": "A",
      "tree": { "B": { "D": {} }, "C": {} },
      "depth": 3
    }
  ],
  "invalid_entries": ["invalid_entry"],
  "duplicate_edges": ["A->B"],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

## ✅ Processing Rules

### 1. Valid Node Format
- Format: `X->Y` where X and Y are single uppercase letters (A-Z)
- Invalid entries are rejected and listed in response

### 2. Duplicate Edges
- First occurrence is used for tree construction
- Duplicates are listed in `duplicate_edges`

### 3. Tree Construction
- Multiple independent trees supported
- Roots are nodes with no parents
- Depth calculated as longest root-to-leaf path

### 4. Cycle Detection
- Returns `true` if cycle exists, otherwise omitted
- Cycle detection uses DFS algorithm

### 5. Summary
- `total_trees`: Count of valid non-cyclic trees
- `total_cycles`: Number of cycles (0 or 1)
- `largest_tree_root`: Root of deepest tree (lexicographically smallest if tied)

## 🎨 Frontend Features

- **Input Form:** Easy-to-use form for data entry
- **Load Example:** Quick loading of sample data
- **Tabbed Results:** Summary, hierarchies, invalid entries, duplicates
- **Tree Visualization:** Visual representation of hierarchies
- **Error Handling:** Clear error messages
- **Responsive Design:** Works on mobile, tablet, and desktop

## 🚢 Deployment

### Option 1: Vercel (Recommended for Full-Stack)

1. **Create GitHub repository:**
```bash
cd d:\Bajaj Assign
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/chitkara-challenge.git
git branch -M main
git push -u origin main
```

2. **Deploy Frontend on Vercel:**
- Go to https://vercel.com and sign in with GitHub
- Click "New Project"
- Select your repository
- Framework: Vite
- Root Directory: `./client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `VITE_API_URL`: https://your-api-domain.com
- Deploy

3. **Deploy Backend on Railway/Render:**

**For Railway:**
- Go to https://railway.app
- Click "New Project"
- Deploy from GitHub repository
- Select `server` as root directory
- Set Environment Variables:
  - `PORT`: 5000
  - `FRONTEND_URL`: https://your-frontend-domain.vercel.app
  - `NODE_ENV`: production
- Deploy

**For Render:**
- Go to https://render.com
- Create new Web Service
- Connect GitHub repository
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables same as above

### Option 2: Heroku (Backend Only)

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set FRONTEND_URL=https://your-frontend-domain.vercel.app
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option 3: Docker Deployment

**Server Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 Example Usage

### Using cURL:
```bash
curl -X POST http://localhost:5000/bfhl \
  -H "Content-Type: application/json" \
  -d '{
    "data": ["A->B", "A->C", "B->D", "C->E", "E->F"],
    "user_id": "johndoe_17091999",
    "email_id": "john.doe@college.edu",
    "college_roll_number": "21CS1001"
  }'
```

### Using JavaScript Fetch:
```javascript
const response = await fetch('http://localhost:5000/bfhl', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: ["A->B", "A->C", "B->D"],
    user_id: "johndoe_17091999",
    email_id: "john.doe@college.edu",
    college_roll_number: "21CS1001"
  })
});
const data = await response.json();
console.log(data);
```

## 🧪 Testing

### Manual Testing Checklist:
- [ ] Form submission with valid data
- [ ] Form validation (empty fields)
- [ ] Invalid node format handling
- [ ] Duplicate edge detection
- [ ] Cycle detection
- [ ] Multiple tree handling
- [ ] CORS functionality
- [ ] Error responses
- [ ] Load example button
- [ ] Tab navigation

### Example Test Cases:

**Test 1: Simple Tree**
```json
{
  "data": ["A->B", "A->C"],
  "user_id": "test_123",
  "email_id": "test@example.com",
  "college_roll_number": "CS001"
}
```

**Test 2: Multiple Trees**
```json
{
  "data": ["A->B", "C->D", "C->E"],
  "user_id": "test_123",
  "email_id": "test@example.com",
  "college_roll_number": "CS001"
}
```

**Test 3: Invalid Entries**
```json
{
  "data": ["A->B", "invalid", "1->2", "A->"],
  "user_id": "test_123",
  "email_id": "test@example.com",
  "college_roll_number": "CS001"
}
```

## 📋 Submission Requirements

For the Chitkara challenge, you need to submit:

1. **API Base URL:** e.g., https://your-api.railway.app
2. **Frontend URL:** e.g., https://your-frontend.vercel.app
3. **GitHub Repository URL:** e.g., https://github.com/username/chitkara-challenge

**Evaluation Criteria:**
- API responds in under 3 seconds for 50 nodes
- CORS enabled
- POST /bfhl accepts application/json
- No hardcoded responses
- Plagiarism check against hidden inputs

## 🔐 Security Considerations

- CORS properly configured for production domains
- Input validation on all endpoints
- Error messages don't expose sensitive data
- Environment variables for sensitive data
- No console.log of sensitive information in production

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-on-windows/)

## 🤝 Support

For issues or questions, refer to the challenge documentation and ensure:
- Environment variables are correctly set
- Dependencies are installed: `npm install`
- Both servers are running on correct ports
- Frontend is accessing correct API URL

## 📄 License

ISC

---

**Last Updated:** June 2026
**Status:** Ready for Submission ✅
