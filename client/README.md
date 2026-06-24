# Frontend Documentation

Complete documentation for the React frontend application.

## Overview
Single-page React application built with Vite and Tailwind CSS for interacting with the hierarchy API.

## Tech Stack
- **React** 18.2.0 - UI framework
- **Vite** 5.0.2 - Build tool
- **Tailwind CSS** 3.3.6 - Styling
- **JavaScript** (ES6+)

## Installation

```bash
npm install
```

## Configuration

### Environment Variables (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Running

### Development
```bash
npm run dev
```
Opens on: http://localhost:5173

### Build for Production
```bash
npm run build
```
Output: `dist/` directory

### Preview Build
```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx                      # Main component
├── main.jsx                     # Entry point
├── index.css                    # Global styles (Tailwind)
└── components/
    ├── HierarchyForm.jsx        # Input form
    ├── ResponseDisplay.jsx      # Results display
    └── TreeViewer.jsx           # Tree visualization
index.html                        # HTML template
vite.config.js                    # Vite config
tailwind.config.js                # Tailwind config
postcss.config.js                 # PostCSS config
```

## Components

### App.jsx
Main application component managing state and API calls.

**State:**
- `response` - API response data
- `loading` - Loading state
- `error` - Error message

**Functions:**
- `handleSubmit()` - Sends data to API
- Manages loading and error states

**Layout:**
- Header section
- Two-column layout (Form + Results)
- Responsive grid

### HierarchyForm.jsx
Form component for user input.

**Form Fields:**
- User ID (text input)
- Email ID (email input)
- College Roll Number (text input)
- Data Entries (textarea, one per line)

**Features:**
- Form validation
- Error messages
- Load example button
- Format hints
- Submit button

**Validation:**
- Required field checks
- Proper email format
- Non-empty data entries

### ResponseDisplay.jsx
Component for displaying API results.

**Tabs:**
- Summary - Overview metrics
- Hierarchies - Tree structures
- Invalid - Invalid entries
- Duplicates - Duplicate edges

**Features:**
- Tabbed interface
- User information display
- Raw JSON view
- Tree visualization

### TreeViewer.jsx
Component for rendering tree structures.

**Features:**
- Recursive tree rendering
- Node highlighting
- Child count display
- Indentation for hierarchy

## Styling

### Tailwind CSS Setup

The project uses Tailwind CSS for styling without autoprefixer method.

**Configuration:** `tailwind.config.js`
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**PostCSS:** `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
  },
}
```

### CSS Classes
- `bg-gradient-to-br` - Gradient background
- `text-xl`, `text-2xl`, etc. - Text sizes
- `grid`, `grid-cols-1`, `lg:grid-cols-2` - Responsive layout
- `space-y-4`, `gap-8` - Spacing
- `rounded-lg` - Border radius
- `shadow-lg` - Shadows
- `border`, `border-red-500` - Borders
- `hover:`, `focus:` - Interactive states

## API Integration

### Fetch Function
```javascript
const handleSubmit = async (formData) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const res = await fetch(`${apiUrl}/bfhl`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  const data = await res.json();
  setResponse(data);
};
```

### Environment Variable Usage
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Features

### Form Input
- User ID format: `fullname_ddmmyyyy`
- Email ID: Valid email address
- Roll Number: College-specific format
- Data: Entries in `X->Y` format

### Validation
- Empty field validation
- Format hint display
- Error message shows
- Submit button disabled during loading

### Results Display
- Summary metrics (Total trees, cycles, largest root)
- Tree hierarchy visualization
- Invalid entries list
- Duplicate edges list
- Raw JSON response view

### User Experience
- Loading spinner while processing
- Clear error messages
- Example data for testing
- Responsive design
- Smooth transitions

## Responsive Design

### Breakpoints
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (medium layout)
- Desktop: > 1024px (two-column layout)

### Grid Layout
```javascript
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Form */}
  {/* Results */}
</div>
```

## Error Handling

### Types of Errors
1. **Network Error** - No connection to API
2. **API Error** - 400, 500 status codes
3. **Validation Error** - Empty form fields
4. **Parse Error** - Invalid response format

### Error Display
```javascript
{error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <h3 className="text-red-800 font-semibold mb-2">Error</h3>
    <p className="text-red-700">{error}</p>
  </div>
)}
```

## Performance

### Optimizations
- Lazy loading of components
- Event handler memoization
- Efficient re-renders
- CSS minimization

### Load Times
- Initial load: < 2s
- API response: < 3s (per requirements)
- Total interaction: < 4s

## Development

### Hot Module Replacement (HMR)
Changes update instantly without refresh
```javascript
// Vite HMR enabled by default
```

### Browser DevTools
1. Open Developer Tools (F12)
2. React DevTools extension recommended
3. Check Network tab for API calls
4. Console for error messages

## Building & Deployment

### Build Process
```bash
npm run build
```

Outputs optimized files to `dist/`:
- Minified JavaScript
- Optimized CSS
- Bundled assets

### Deployment
```bash
npm run build
# Deploy dist/ folder to static hosting
```

### Environment for Production
```env
VITE_API_URL=https://your-api-domain.com
```

## Testing

### Manual Testing Checklist
- [ ] Form submits with valid data
- [ ] Validation shows errors for empty fields
- [ ] Load example button works
- [ ] API response displays correctly
- [ ] Tabs switch properly
- [ ] Tree visualization renders
- [ ] Error message displays on API failure
- [ ] Loading spinner shows during request
- [ ] Responsive on mobile
- [ ] No console errors

### Test Data
```
A->B
A->C
B->D
C->E
E->F
G->H
G->I
G->J
```

## Troubleshooting

### Issue: API URL not connecting
**Solution:**
```env
# Check .env file
VITE_API_URL=http://localhost:5000
```

### Issue: Styles not applying
**Solution:**
```bash
# Rebuild Tailwind CSS
npm run build
```

### Issue: Form not submitting
**Solution:**
1. Check browser console for errors
2. Verify API is running
3. Check VITE_API_URL in .env

### Issue: Results not displaying
**Solution:**
1. Check Network tab in DevTools
2. Verify API response format
3. Check browser console errors

## Code Examples

### Custom Component
```jsx
import React, { useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  
  return (
    <div className="bg-white p-4 rounded-lg">
      {/* JSX */}
    </div>
  );
}
```

### Tailwind Classes
```jsx
<div className="
  bg-white
  border border-gray-300
  rounded-lg
  p-4
  shadow-lg
  hover:shadow-xl
  transition
">
  Content
</div>
```

## Dependencies

- **react** (18.2.0) - UI library
- **react-dom** (18.2.0) - DOM rendering
- **tailwindcss** (3.3.6) - CSS framework
- **postcss** (8.4.31) - CSS processing
- **autoprefixer** (10.4.16) - Vendor prefixes
- **vite** (5.0.2) - Build tool

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---
**Frontend Version:** 1.0.0  
**Last Updated:** June 2026
