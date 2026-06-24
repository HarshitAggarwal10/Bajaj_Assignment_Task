import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Helper functions
const isValidNodeFormat = (node) => {
  const nodeRegex = /^[A-Z]->[A-Z]$/;
  return nodeRegex.test(node);
};

const validateInput = (data) => {
  const invalid_entries = [];
  const validData = [];

  data.forEach(entry => {
    if (typeof entry !== 'string' || entry.trim() === '') {
      invalid_entries.push(entry);
    } else if (!isValidNodeFormat(entry)) {
      invalid_entries.push(entry);
    } else {
      validData.push(entry);
    }
  });

  return { valid: validData, invalid: invalid_entries };
};

const findDuplicateEdges = (edges) => {
  const seen = {};
  const duplicates = [];

  edges.forEach(edge => {
    if (seen[edge]) {
      duplicates.push(edge);
    } else {
      seen[edge] = true;
    }
  });

  return duplicates;
};

const buildGraph = (edges) => {
  const graph = {};
  const inDegree = {};
  const nodes = new Set();

  edges.forEach(edge => {
    const [parent, child] = edge.split('->');
    nodes.add(parent);
    nodes.add(child);

    if (!graph[parent]) graph[parent] = [];
    graph[parent].push(child);

    inDegree[child] = (inDegree[child] || 0) + 1;
    if (!inDegree[parent]) inDegree[parent] = 0;
  });

  return { graph, inDegree, nodes: Array.from(nodes) };
};

const detectCycle = (graph, nodes) => {
  const visited = {};
  const recursionStack = {};

  const dfs = (node) => {
    visited[node] = true;
    recursionStack[node] = true;

    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (!visited[neighbor]) {
          if (dfs(neighbor)) return true;
        } else if (recursionStack[neighbor]) {
          return true;
        }
      }
    }

    recursionStack[node] = false;
    return false;
  };

  for (const node of nodes) {
    if (!visited[node]) {
      if (dfs(node)) return true;
    }
  }

  return false;
};

const calculateDepth = (graph, node, memo = {}) => {
  if (memo[node] !== undefined) return memo[node];
  if (!graph[node] || graph[node].length === 0) {
    memo[node] = 1;
    return 1;
  }

  let maxDepth = 0;
  for (const child of graph[node]) {
    maxDepth = Math.max(maxDepth, calculateDepth(graph, child, memo));
  }

  memo[node] = maxDepth + 1;
  return memo[node];
};

const buildTree = (graph, inDegree, nodes) => {
  const trees = [];
  const visited = new Set();
  const memo = {};

  // Find roots (nodes with no parents)
  const roots = nodes.filter(node => inDegree[node] === 0);

  const buildSubtree = (node) => {
    if (visited.has(node)) return null;
    visited.add(node);

    const children = graph[node] || [];
    const tree = {
      root: node,
      tree: {},
      depth: calculateDepth(graph, node, memo)
    };

    const subtrees = [];
    for (const child of children) {
      if (!visited.has(child)) {
        const childTree = buildSubtree(child);
        if (childTree) {
          subtrees.push(childTree);
        }
      }
    }

    tree.tree = children.length > 0 ? Object.fromEntries(
      children.map(child => [child, { ...buildSubtree(child)?.tree }])
    ) : {};

    return tree;
  };

  // Handle case where there are no roots (cycle or all nodes are children)
  if (roots.length === 0) {
    const root = nodes[0];
    return [buildSubtree(root)];
  }

  for (const root of roots) {
    if (!visited.has(root)) {
      trees.push(buildSubtree(root));
    }
  }

  return trees;
};

const processBfhl = (data, user_id, email_id, college_roll_number) => {
  // Validate input
  const { valid: validEdges, invalid: invalidEntries } = validateInput(data);

  // Find duplicate edges (keep first occurrence)
  const duplicateEdges = findDuplicateEdges(validEdges);
  const uniqueEdges = [...new Set(validEdges)];

  // Build graph
  const { graph, inDegree, nodes } = buildGraph(uniqueEdges);

  // Check for cycles
  const hasCycle = detectCycle(graph, nodes);

  // Build trees
  const hierarchies = buildTree(graph, inDegree, nodes);

  // Calculate summary
  const totalTrees = hierarchies.length;
  const totalCycles = hasCycle ? 1 : 0;
  const largestTreeRoot = hierarchies.length > 0 
    ? hierarchies.reduce((max, tree) => tree.depth > (max?.depth || 0) ? tree : max).root 
    : null;

  return {
    user_id,
    email_id,
    college_roll_number,
    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges,
    summary: {
      total_trees: totalTrees,
      total_cycles: totalCycles,
      largest_tree_root: largestTreeRoot
    }
  };
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Chitkara API is running' });
});

app.post('/bfhl', (req, res) => {
  try {
    const { data, user_id, email_id, college_roll_number } = req.body;

    // Validation
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'data must be an array' });
    }
    if (!user_id || !email_id || !college_roll_number) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = processBfhl(data, user_id, email_id, college_roll_number);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});
