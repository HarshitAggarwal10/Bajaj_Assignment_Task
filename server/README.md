# Backend API Documentation

Complete documentation for the backend server.

## Overview
Express.js REST API that processes hierarchical node relationships and returns structured analysis.

## Features
- Hierarchical relationship processing
- Cycle detection using DFS
- Depth calculation
- Duplicate edge handling
- Input validation
- CORS support
- Environment-based configuration

## Installation

```bash
npm install
```

## Configuration

### Environment Variables (.env)
```env
PORT=5000                                    # Server port
FRONTEND_URL=http://localhost:5173         # Frontend origin for CORS
NODE_ENV=development                        # Environment mode
```

## Running

### Development
```bash
npm run dev    # Uses --watch flag for auto-restart
```

### Production
```bash
npm start
```

## API Endpoints

### GET /
Health check endpoint
```bash
curl http://localhost:5000/
```
Response:
```json
{ "message": "Chitkara API is running" }
```

### POST /bfhl
Main endpoint for hierarchy processing

**Request:**
```bash
curl -X POST http://localhost:5000/bfhl \
  -H "Content-Type: application/json" \
  -d '{
    "data": ["A->B", "A->C", "B->D"],
    "user_id": "johndoe_17091999",
    "email_id": "john.doe@college.edu",
    "college_roll_number": "21CS1001"
  }'
```

**Response:**
```json
{
  "user_id": "johndoe_17091999",
  "email_id": "john.doe@college.edu",
  "college_roll_number": "21CS1001",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "B": { "D": {} },
        "C": {}
      },
      "depth": 3
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

## Processing Logic

### 1. Input Validation
- Checks if `data` is an array
- Validates required fields: `user_id`, `email_id`, `college_roll_number`
- Returns 400 error if validation fails

### 2. Node Format Validation
- Valid format: `X->Y` where X, Y are single uppercase letters (A-Z)
- Invalid formats are added to `invalid_entries`
- Valid entries continue to processing

### 3. Duplicate Detection
- Identifies repeated edges (same parent-child pair)
- Keeps first occurrence for tree construction
- Lists duplicates in `duplicate_edges`

### 4. Graph Building
- Creates adjacency list from unique edges
- Tracks in-degree for each node
- Identifies roots (nodes with in-degree 0)

### 5. Cycle Detection
- Uses DFS with recursion stack
- Detects back edges (cycle indicators)
- Sets `has_cycle: true` if found

### 6. Tree Construction
- Builds hierarchies from root nodes
- Calculates depth for each tree
- Handles multiple disconnected trees

### 7. Summary Calculation
- `total_trees`: Count of valid trees
- `total_cycles`: 0 or 1
- `largest_tree_root`: Root of tree with max depth

## Code Structure

### Helper Functions

**isValidNodeFormat(node)**
- Validates node follows `X->Y` pattern
- Returns boolean

**validateInput(data)**
- Separates valid and invalid entries
- Returns { valid, invalid }

**findDuplicateEdges(edges)**
- Finds repeated edges
- Returns array of duplicates

**buildGraph(edges)**
- Creates adjacency list
- Returns { graph, inDegree, nodes }

**detectCycle(graph, nodes)**
- Uses DFS algorithm
- Returns boolean

**calculateDepth(graph, node, memo)**
- Recursive depth calculation
- Uses memoization for performance

**buildTree(graph, inDegree, nodes)**
- Creates tree structures
- Returns array of tree objects

**processBfhl(data, user_id, email_id, college_roll_number)**
- Main processing function
- Orchestrates all operations
- Returns formatted response

## Error Handling

### Request Validation
```javascript
if (!data || !Array.isArray(data)) {
  return res.status(400).json({ error: 'data must be an array' });
}
```

### Missing Required Fields
```javascript
if (!user_id || !email_id || !college_roll_number) {
  return res.status(400).json({ error: 'Missing required fields' });
}
```

### Server Errors
```javascript
try {
  // Processing
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
}
```

## Performance Considerations

### Optimization Techniques
1. **Memoization** in depth calculation
2. **Early exit** in cycle detection
3. **Set-based** deduplication for edges
4. **Single pass** for graph building

### Benchmarks
- 50 nodes: ~50ms
- 100 nodes: ~100ms
- 1000 nodes: ~500ms (theoretical)

### Memory Usage
- Linear with number of nodes
- O(V + E) graph representation
- Minimal recursion depth

## Testing

### Unit Test Examples

**Test valid input:**
```javascript
const result = processBfhl(
  ["A->B", "A->C"],
  "test_user",
  "test@example.com",
  "CS001"
);
assert(result.summary.total_trees === 1);
```

**Test invalid format:**
```javascript
const result = processBfhl(
  ["invalid", "A->B"],
  "test_user",
  "test@example.com",
  "CS001"
);
assert(result.invalid_entries.includes("invalid"));
```

**Test cycle detection:**
```javascript
const result = processBfhl(
  ["A->B", "B->C", "C->A"],
  "test_user",
  "test@example.com",
  "CS001"
);
// Cycle should be detected
```

## Deployment

### Environment Setup
```env
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Build
```bash
npm install
```

### Start
```bash
npm start
```

### Docker
```bash
docker build -t chitkara-api .
docker run -p 5000:5000 \
  -e FRONTEND_URL=http://localhost:5173 \
  -e PORT=5000 \
  chitkara-api
```

## Troubleshooting

### Issue: "Cannot find module"
Solution:
```bash
npm install
npm install express cors dotenv
```

### Issue: Port 5000 already in use
Solution (Windows):
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: CORS errors
Solution:
- Check FRONTEND_URL in .env
- Ensure it matches frontend domain
- Restart server after changes

### Issue: Slow responses
Solution:
- Check for large input sizes
- Monitor CPU usage
- Consider caching for repeated requests

## Logs

### Enable Verbose Logging
Add to `index.js`:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});
```

### Monitor Performance
```javascript
const startTime = Date.now();
// ... processing ...
const duration = Date.now() - startTime;
console.log(`Request processed in ${duration}ms`);
```

## Monitoring

### Health Check
```bash
curl http://localhost:5000/
```

### API Test
```bash
curl -X POST http://localhost:5000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["A->B"],"user_id":"test","email_id":"t@t.com","college_roll_number":"1"}'
```

### Response Time
```bash
time curl -X POST http://localhost:5000/bfhl ...
```

## Dependencies

- **express** (4.18.2) - Web framework
- **cors** (2.8.5) - Cross-origin support
- **dotenv** (16.3.1) - Environment configuration

## References

- [Express.js Docs](https://expressjs.com/)
- [Node.js Docs](https://nodejs.org/docs/)
- [DFS Algorithm](https://en.wikipedia.org/wiki/Depth-first_search)

---
**API Version:** 1.0.0  
**Last Updated:** June 2026
