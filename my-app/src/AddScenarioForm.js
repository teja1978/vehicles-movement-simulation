import React, { useState } from 'react';
import './AddScenarioForm.css';

const AddScenarioForm = ({ goBack, addScenario }) => {
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioTime, setScenarioTime] = useState('');
  const [errors, setErrors] = useState({});

  const handleAddClick = () => {
    const newErrors = {};
    if (!scenarioName) {
      newErrors.scenarioName = 'Scenario name is required';
    }
    if (!scenarioTime || isNaN(scenarioTime) || scenarioTime <= 0) {
      newErrors.scenarioTime = 'Valid scenario time is required (positive number)';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addScenario(scenarioName, parseInt(scenarioTime));
      setScenarioName('');
      setScenarioTime('');
      setErrors({});
      goBack();
    }
  };

  return (
    <div className="form-container">
      <h2>Add Scenario</h2>
      <form>
        <div className="form-group">
          <label>Scenario Name:</label>
          <input
            type="text"
            name="scenarioName"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
          />
          {errors.scenarioName && (
            <div className="error-message">{errors.scenarioName}</div>
          )}
        </div>
        <div className="form-group">
          <label>Scenario Time:</label>
          <input
            type="number"
            name="scenarioTime"
            value={scenarioTime}
            onChange={(e) => setScenarioTime(e.target.value)}
            min="1"
          />
          {errors.scenarioTime && (
            <div className="error-message">{errors.scenarioTime}</div>
          )}
        </div>
        <div className="form-buttons">
          <button type="button" onClick={handleAddClick}>Add</button>
          <button type="button" onClick={() => {
            setScenarioName('');
            setScenarioTime('');
            setErrors({});
          }}>Reset</button>
          <button type="button" onClick={goBack}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default AddScenarioForm;
