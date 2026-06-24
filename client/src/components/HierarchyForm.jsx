import React, { useState } from 'react';

export default function HierarchyForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    user_id: 'johndoe_17091999',
    email_id: 'john.doe@college.edu',
    college_roll_number: '21CS1001',
    data: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_id.trim()) {
      newErrors.user_id = 'User ID is required';
    }
    if (!formData.email_id.trim()) {
      newErrors.email_id = 'Email ID is required';
    }
    if (!formData.college_roll_number.trim()) {
      newErrors.college_roll_number = 'College Roll Number is required';
    }
    if (!formData.data.trim()) {
      newErrors.data = 'Data entries are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Parse data entries
    const dataArray = formData.data
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (dataArray.length === 0) {
      setErrors(prev => ({
        ...prev,
        data: 'Please enter at least one data entry'
      }));
      return;
    }

    const payload = {
      user_id: formData.user_id,
      email_id: formData.email_id,
      college_roll_number: formData.college_roll_number,
      data: dataArray
    };

    onSubmit(payload);
  };

  const loadExample = () => {
    setFormData(prev => ({
      ...prev,
      data: 'A->B\nA->C\nB->D\nC->E\nE->F\nG->H\nG->I\nG->J'
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Input Form</h2>

      {/* User ID */}
      <div>
        <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">
          User ID
        </label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          placeholder="e.g., johndoe_17091999"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.user_id ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
      </div>

      {/* Email ID */}
      <div>
        <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-1">
          Email ID
        </label>
        <input
          type="email"
          id="email_id"
          name="email_id"
          value={formData.email_id}
          onChange={handleChange}
          placeholder="e.g., john.doe@college.edu"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.email_id ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email_id && <p className="text-red-500 text-sm mt-1">{errors.email_id}</p>}
      </div>

      {/* College Roll Number */}
      <div>
        <label htmlFor="college_roll_number" className="block text-sm font-medium text-gray-700 mb-1">
          College Roll Number
        </label>
        <input
          type="text"
          id="college_roll_number"
          name="college_roll_number"
          value={formData.college_roll_number}
          onChange={handleChange}
          placeholder="e.g., 21CS1001"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.college_roll_number ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.college_roll_number && <p className="text-red-500 text-sm mt-1">{errors.college_roll_number}</p>}
      </div>

      {/* Data Entries */}
      <div>
        <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
          Hierarchy Data (one per line, format: A->B)
        </label>
        <textarea
          id="data"
          name="data"
          value={formData.data}
          onChange={handleChange}
          placeholder="A->B&#10;A->C&#10;B->D"
          rows="8"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm ${
            errors.data ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.data && <p className="text-red-500 text-sm mt-1">{errors.data}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={loadExample}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Load Example
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
        <p><strong>Valid format:</strong> X->Y where X and Y are single uppercase letters (A-Z)</p>
      </div>
    </form>
  );
}
