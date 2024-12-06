import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DimensionInput from '../components/ProjectEditor/DimensionInput';
import StepInput from '../components/ProjectEditor/StepInput';
import BoardPreview from '../components/ProjectEditor/BoardPreview';

const ProjectEditor = () => {
  const location = useLocation();

  const [projectData, setProjectData] = useState({
    kerf: null,
    length: null,
    woods: [],
    steps: [],
    createdAt: new Date().toISOString(),
  });

  const getProjectData = (projectData,number) => {
    if (number < 0){
      return { ...projectData, steps: [] };
    } else {
      return { ...projectData, steps: projectData.steps.slice(0, number + 1) };
    }
  };

  useEffect(() => {
    if (location.state?.projectData) {
      const { kerf = null, length = null, woods = [], steps = [], ...rest } = location.state.projectData;
      setProjectData({
        ...rest,
        kerf,
        length,
        woods: Array.isArray(woods) ? woods : [],
        steps: Array.isArray(steps) ? steps : [],
      });
    }
  }, [location.state]);

  // Add a new wood to the woods array
  const addWood = () => {
    setProjectData((prev) => ({
      ...prev,
      woods: [
        ...prev.woods,
        {
          id: `${Date.now()}`,
          type: '',
          dimensions: { width: '' },
          color: '#000000',
        },
      ],
    }));
  };

  // Update wood properties
  const updateWood = (id, field, value) => {
    setProjectData((prev) => ({
      ...prev,
      woods: prev.woods.map((wood) =>
        wood.id === id
          ? {
            ...wood,
            [field]: field === 'dimensions' ? { ...wood.dimensions, ...value } : value,
          }
          : wood
      ),
    }));
  };

  // Delete a wood from the array
  const deleteWood = (id) => {
    setProjectData((prev) => ({
      ...prev,
      woods: prev.woods.filter((wood) => wood.id !== id),
    }));
  };

  // Handle drag-and-drop reordering of woods
  const reorderWoods = (sourceIndex, destinationIndex) => {
    setProjectData((prev) => {
      const updatedWoods = Array.from(prev.woods);
      const [moved] = updatedWoods.splice(sourceIndex, 1);
      updatedWoods.splice(destinationIndex, 0, moved);
      return { ...prev, woods: updatedWoods };
    });
  };

  // Update kerf value
  const updateKerf = (value) => {
    setProjectData((prev) => ({ ...prev, kerf: value }));
  };

  // Update board length
  const updateLength = (value) => {
    setProjectData((prev) => ({ ...prev, length: value }));
  };


  const addStep = () => {
    setProjectData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: prev.steps.length + 1,
          cutWidth: 0, // Initial cut width
          alternate: false, // No alternating cuts by default
        },
      ],
    }));
  };


  const updateStep = (index, updatedStep) => {
    setProjectData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? updatedStep : step
      ),
    }));
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Cutting Board Editor</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div>
          <label htmlFor="kerf" className="block text-lg font-semibold mb-2">
            Kerf (Cut Width)
          </label>
          <input
            type="number"
            id="kerf"
            value={projectData.kerf}
            onChange={(e) => updateKerf(parseFloat(e.target.value) || 0)}
            className="border rounded-md p-2 w-32"
          />
        </div> */}
        <div>
          <label htmlFor="length" className="block text-lg font-semibold mb-2">
            Board Length (pixels)
          </label>
          <input
            type="number"
            id="length"
            value={projectData.length}
            onChange={(e) => updateLength(parseFloat(e.target.value) || 0)}
            className="border rounded-md p-2 w-32"
          />
        </div>
      </div>

      {/* Initial Woods Section */}
      <div className="mt-6">
        <DimensionInput
          woods={projectData.woods}
          addWood={addWood}
          updateWood={updateWood}
          deleteWood={deleteWood}
          reorderWoods={reorderWoods}
        />
        <div className="mt-6">
          <BoardPreview projectData={getProjectData(projectData, -1)} />
        </div>
      </div>

      {/* Steps Section */}
      {projectData.woods.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Add Cuts</h2>
          <ul className="space-y-4">
            {projectData.steps.map((step, index) => (
              <li key={step.id}>
                <StepInput
                  step={step}
                  onChange={(description) => updateStep(index, description)}
                />
                <div className="mt-6">
                <BoardPreview projectData={getProjectData(projectData, index)} />
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={addStep}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-600 mb-4"
          >
            Add Cut
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectEditor;
