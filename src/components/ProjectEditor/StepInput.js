import React from 'react';

const StepInput = ({ step, onChange }) => {
  const handleFieldChange = (field, value) => {
    onChange({ ...step, [field]: value });
  };

  return (
    <div className="border rounded-md p-4 bg-white shadow space-y-4">
      <div className="flex items-center space-x-4">
        <span className="font-semibold">Step {step.id}:</span>
        
        <label className="font-semibold" htmlFor={`cutWidth-${step.id}`}>
          Cut Width:
        </label>
        <input
          type="number"
          id={`cutWidth-${step.id}`}
          value={step.cutWidth || ''}
          onChange={(e) => handleFieldChange('cutWidth', parseFloat(e.target.value) || 0)}
          placeholder="Cut width"
          className="border rounded-md p-2 w-32"
        />
      </div>

      {/* Flip Direction Input */}
      <div className="flex items-center space-x-4">
        <label className="font-semibold" htmlFor={`flipDirection-${step.id}`}>
          Flip Direction:
        </label>
        <select
          id={`flipDirection-${step.id}`}
          value={step.flipDirection || ''}
          onChange={(e) => handleFieldChange('flipDirection', e.target.value)}
          className="border rounded-md p-2 w-40"
        >
          <option value="">Select Flip Direction</option>
          <option value="horizontal">Horizontal Flip</option>
          <option value="vertical">Vertical Flip</option>
        </select>
      </div>
    </div>
  );
};

export default StepInput;
