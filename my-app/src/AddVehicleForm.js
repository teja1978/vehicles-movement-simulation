// AddVehicleForm.js
import React, { useState } from 'react';
import './AddVehicleForm.css';

const AddVehicleForm = ({ scenarios, goBack, addVehicle }) => {
  const [scenarioId, setScenarioId] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [speed, setSpeed] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [direction, setDirection] = useState('');
  const [errors, setErrors] = useState({});

  const handleAddClick = () => {
    const newErrors = {};

    if (!scenarioId) {
      newErrors.scenarioId = 'Scenario is required';
    }
    if (!vehicleName) {
      newErrors.vehicleName = 'Vehicle name is required';
    }
    if (!speed || isNaN(speed) || speed <= 0) {
      newErrors.speed = 'Valid speed is required';
    }
    if (!positionX || isNaN(positionX) || positionX < 0 || positionX > 100) {
      newErrors.positionX = 'Position X must be between 0 and 100';
    }
    if (!positionY || isNaN(positionY) || positionY < 0 || positionY > 100) {
      newErrors.positionY = 'Position Y must be between 0 and 100';
    }
    if (!direction) {
      newErrors.direction = 'Direction is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addVehicle(scenarioId, vehicleName, speed, positionX, positionY, direction);
      setScenarioId('');
      setVehicleName('');
      setSpeed('');
      setPositionX('');
      setPositionY('');
      setDirection('');
      setErrors({});
      goBack();
    }
  };

  return (
    <div className="form-container">
      <h2>Add Vehicle</h2>
      <form>
        <div className="form-group">
          <label>Scenario List:</label>
          <select value={scenarioId} onChange={(e) => setScenarioId(e.target.value)}>
            <option value="">Select Scenario</option>
            {scenarios.map(scenario => (
              <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
            ))}
          </select>
          {errors.scenarioId && <div className="error-message">{errors.scenarioId}</div>}
        </div>
        <div className="form-group">
          <label>Vehicle Name:</label>
          <input
            type="text"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
          {errors.vehicleName && <div className="error-message">{errors.vehicleName}</div>}
        </div>
        <div className="form-group">
          <label>Speed:</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            min="0"
            step="0.1"
          />
          {errors.speed && <div className="error-message">{errors.speed}</div>}
        </div>
        <div className="form-group">
          <label>Position X:</label>
          <input
            type="number"
            value={positionX}
            onChange={(e) => setPositionX(e.target.value)}
            min="0"
            max="100"
          />
          {errors.positionX && <div className="error-message">{errors.positionX}</div>}
        </div>
        <div className="form-group">
          <label>Position Y:</label>
          <input
            type="number"
            value={positionY}
            onChange={(e) => setPositionY(e.target.value)}
            min="0"
            max="100"
          />
          {errors.positionY && <div className="error-message">{errors.positionY}</div>}
        </div>
        <div className="form-group">
          <label>Direction:</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="">Select Direction</option>
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
          {errors.direction && <div className="error-message">{errors.direction}</div>}
        </div>
        <div className="form-buttons">
          <button type="button" onClick={handleAddClick}>Add</button>
          <button type="button" onClick={() => {
            setScenarioId('');
            setVehicleName('');
            setSpeed('');
            setPositionX('');
            setPositionY('');
            setDirection('');
            setErrors({});
          }}>Reset</button>
          <button type="button" onClick={goBack}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
