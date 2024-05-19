import React, { useState } from 'react';
import './AllScenarios.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const AllScenarios = ({ scenarios, incrementVehicles, deleteScenario, updateScenario, deleteAllScenarios }) => {
  const [editingId, setEditingId] = useState(null);
  const [editableScenario, setEditableScenario] = useState({});
  const [errors, setErrors] = useState({});

  const handleEditClick = (scenario) => {
    setEditingId(scenario.id);
    setEditableScenario(scenario);
  };

  const handleSaveClick = (id) => {
    const newErrors = {};
    if (!editableScenario.name) {
      newErrors.name = 'Scenario name is required';
    }
    if (!editableScenario.time || isNaN(editableScenario.time) || editableScenario.time <= 0) {
      newErrors.time = 'Valid scenario time is required (positive number)';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      updateScenario(id, editableScenario);
      setEditingId(null);
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableScenario({
      ...editableScenario,
      [name]: value,
    });
  };

  return (
    <div className="scenarios-container">
      <h2>All Scenarios</h2>
      <button className="delete-all-button" onClick={deleteAllScenarios}>Delete All</button>
      <table>
        <thead>
          <tr>
            <th>Scenario ID</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Number of Vehicles</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map(scenario => (
            <tr key={scenario.id}>
              <td>{scenario.id}</td>
              <td>
                {editingId === scenario.id ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editableScenario.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </>
                ) : (
                  scenario.name
                )}
              </td>
              <td>
                {editingId === scenario.id ? (
                  <>
                    <input
                      type="number"
                      name="time"
                      value={editableScenario.time}
                      onChange={handleChange}
                      min="1"
                    />
                    {errors.time && <div className="error-message">{errors.time}</div>}
                  </>
                ) : (
                  scenario.time
                )}
              </td>
              <td>
                {editingId === scenario.id ? (
                  <input
                    type="number"
                    name="vehicles"
                    value={editableScenario.vehicles}
                    onChange={handleChange}
                    min="0"
                  />
                ) : (
                  scenario.vehicles
                )}
              </td>
              <td>
                {editingId !== scenario.id && (
                  <button className="icon-button" onClick={() => incrementVehicles(scenario.id)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </td>
              <td>
                {editingId === scenario.id ? (
                  <button className="icon-button" onClick={() => handleSaveClick(scenario.id)}>Save</button>
                ) : (
                  <button className="icon-button" onClick={() => handleEditClick(scenario)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
              </td>
              <td>
                <button className="icon-button" onClick={() => deleteScenario(scenario.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllScenarios;
