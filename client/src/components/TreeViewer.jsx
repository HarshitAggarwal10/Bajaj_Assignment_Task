import React from 'react';

export default function TreeViewer({ tree, root }) {
  const renderTree = (node, children = {}) => {
    return (
      <div key={node} className="ml-4">
        <div className="flex items-center py-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-6 h-6 bg-indigo-100 border border-indigo-400 rounded text-center text-indigo-700 font-bold text-sm">
              {node}
            </span>
            {Object.keys(children).length > 0 && (
              <span className="text-gray-500 text-xs">({Object.keys(children).length} children)</span>
            )}
          </div>
        </div>
        {Object.entries(children).map(([childNode, grandchildren]) =>
          renderTree(childNode, grandchildren)
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded p-3 font-mono text-sm">
      {renderTree(root, tree)}
    </div>
  );
}
