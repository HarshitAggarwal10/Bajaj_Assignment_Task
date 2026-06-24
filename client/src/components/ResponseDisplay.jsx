import React, { useState } from 'react';
import TreeViewer from './TreeViewer';

export default function ResponseDisplay({ response }) {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Response</h2>

      {/* User Info */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">User Information</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <p><strong>User ID:</strong> <span className="text-indigo-600 font-mono">{response.user_id}</span></p>
          <p><strong>Email:</strong> <span className="text-indigo-600 font-mono">{response.email_id}</span></p>
          <p><strong>Roll Number:</strong> <span className="text-indigo-600 font-mono">{response.college_roll_number}</span></p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        {['summary', 'hierarchies', 'invalid', 'duplicates'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition capitalize ${
              activeTab === tab
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* Summary Tab */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <p className="text-gray-600 text-sm font-medium">Total Trees</p>
                <p className="text-2xl font-bold text-indigo-600">{response.summary.total_trees}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-gray-600 text-sm font-medium">Cycles</p>
                <p className="text-2xl font-bold text-amber-600">{response.summary.total_cycles}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-gray-600 text-sm font-medium">Largest Tree Root</p>
                <p className="text-2xl font-bold text-green-600">{response.summary.largest_tree_root || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hierarchies Tab */}
        {activeTab === 'hierarchies' && (
          <div className="space-y-4">
            {response.hierarchies.length === 0 ? (
              <p className="text-gray-500">No hierarchies found</p>
            ) : (
              response.hierarchies.map((hierarchy, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-3">Tree {idx + 1}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Root:</strong> <span className="font-mono">{hierarchy.root}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Depth:</strong> {hierarchy.depth}
                  </p>
                  <TreeViewer tree={hierarchy.tree} root={hierarchy.root} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Invalid Entries Tab */}
        {activeTab === 'invalid' && (
          <div>
            {response.invalid_entries.length === 0 ? (
              <p className="text-green-600 font-medium">✓ No invalid entries</p>
            ) : (
              <ul className="space-y-2">
                {response.invalid_entries.map((entry, idx) => (
                  <li key={idx} className="bg-red-50 p-3 rounded border border-red-200 text-red-700 font-mono text-sm">
                    {entry === '' ? '(empty string)' : entry}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Duplicate Edges Tab */}
        {activeTab === 'duplicates' && (
          <div>
            {response.duplicate_edges.length === 0 ? (
              <p className="text-green-600 font-medium">✓ No duplicate edges</p>
            ) : (
              <ul className="space-y-2">
                {response.duplicate_edges.map((edge, idx) => (
                  <li key={idx} className="bg-yellow-50 p-3 rounded border border-yellow-200 text-yellow-700 font-mono text-sm">
                    {edge}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Raw JSON */}
      <details className="bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition">
        <summary className="font-semibold text-gray-700">Raw JSON Response</summary>
        <pre className="mt-4 bg-gray-900 text-gray-100 p-4 rounded overflow-auto text-xs">
          {JSON.stringify(response, null, 2)}
        </pre>
      </details>
    </div>
  );
}
