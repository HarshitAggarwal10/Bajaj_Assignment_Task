import React, { useState } from 'react';
import HierarchyForm from './components/HierarchyForm';
import ResponseDisplay from './components/ResponseDisplay';
import './index.css';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message || 'Failed to submit form');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Chitkara Full Stack Challenge
          </h1>
          <p className="text-gray-600 text-lg">
            Process hierarchical relationships and analyze tree structures
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <HierarchyForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Response Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {loading && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  <p className="mt-4 text-gray-600">Processing...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold mb-2">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {response && !loading && (
              <ResponseDisplay response={response} />
            )}
            {!loading && !error && !response && (
              <div className="text-center text-gray-500 h-96 flex items-center justify-center">
                <p>Fill the form and click Submit to see results here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
