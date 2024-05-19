// App.js
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import AddScenarioForm from './AddScenarioForm';
import AllScenarios from './AllScenarios';
import AddVehicleForm from './AddVehicleForm';
import Home from './Home';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);

  useEffect(() => {
    // Fetch scenarios and vehicles from the backend when the app loads
    const fetchData = async () => {
      const scenariosResponse = await fetch('http://localhost:3001/scenarios');
      const scenariosData = await scenariosResponse.json();
      setScenarios(scenariosData);

      const vehiclesResponse = await fetch('http://localhost:3001/vehicles');
      const vehiclesData = await vehiclesResponse.json();
      setVehicles(vehiclesData);
    };

    fetchData();
  }, []);

  const addScenario = async (scenarioName, scenarioTime) => {
    const response = await fetch('http://localhost:3001/scenarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: scenarioName, time: scenarioTime }),
    });
    const newScenario = await response.json();
    setScenarios([...scenarios, newScenario]);
    setActiveSection('all-scenarios');
  };

  const incrementVehicles = (id) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === id ? { ...scenario, vehicles: scenario.vehicles + 1 } : scenario
    ));
  };
  const deleteAllScenarios = async () => {
    await fetch('http://localhost:3001/scenarios', {
      method: 'DELETE',
    });
    setScenarios([]);
    setVehicles([]);
  };
  const deleteScenario = async (id) => {
    await fetch(`http://localhost:3001/scenarios/${id}`, {
      method: 'DELETE',
    });
    setScenarios(scenarios.filter(scenario => scenario.id !== id));
    setVehicles(vehicles.filter(vehicle => vehicle.scenarioId !== id));
  };

  const updateScenario = (id, updatedScenario) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === id ? updatedScenario : scenario
    ));
  };

  const addVehicle = async (scenarioId, vehicleName, speed, positionX, positionY, direction) => {
    const response = await fetch('http://localhost:3001/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scenarioId, name: vehicleName, speed, positionX, positionY, direction }),
    });
    const newVehicle = await response.json();
    setVehicles([...vehicles, newVehicle]);
    const updatedScenarios = scenarios.map(scenario =>
      scenario.id === parseInt(scenarioId) ? { ...scenario, vehicles: scenario.vehicles + 1 } : scenario
    );
    setScenarios(updatedScenarios);
    setActiveSection('home');
  };

  const selectScenario = (id) => {
    setSelectedScenario(id);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home scenarios={scenarios} selectScenario={selectScenario} selectedScenario={selectedScenario} />;
      case 'add-scenario':
        return <AddScenarioForm goBack={() => setActiveSection('home')} addScenario={addScenario} />;
      case 'all-scenarios':
        return (
          <AllScenarios 
            scenarios={scenarios} 
            incrementVehicles={incrementVehicles} 
            deleteScenario={deleteScenario} 
            updateScenario={updateScenario}
            deleteAllScenarios={deleteAllScenarios}
          />
        );
      case 'add-vehicle':
        return <AddVehicleForm scenarios={scenarios} goBack={() => setActiveSection('home')} addVehicle={addVehicle} />;
      default:
        return <div>Welcome to the home page!</div>;
    }
  };

  return (
    <div className="App">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
