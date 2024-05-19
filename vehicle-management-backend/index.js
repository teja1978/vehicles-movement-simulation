const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let scenarios = [];
let vehicles = [];
let nextScenarioId = 1;
let nextVehicleId = 1;

// Get all scenarios
app.get('/scenarios', (req, res) => {
  res.json(scenarios);
});

// Add a new scenario
app.post('/scenarios', (req, res) => {
  const { name, time } = req.body;
  const newScenario = { id: nextScenarioId++, name, time, vehicles: 0 };
  scenarios.push(newScenario);
  res.status(201).json(newScenario);
});

// Get all vehicles
app.get('/vehicles', (req, res) => {
  res.json(vehicles);
});

app.post('/vehicles', (req, res) => {
    console.log(res);
    const { scenarioId, name, speed, positionX, positionY, direction } = req.body;
    const newVehicle = { id: nextVehicleId++, scenarioId: parseInt(scenarioId), name, speed, positionX, positionY, direction };
    vehicles.push(newVehicle);
  
    // Increment the number of vehicles in the corresponding scenario
    const scenario = scenarios.find(s => s.id === parseInt(scenarioId));
    if (scenario) {
      scenario.vehicles++;
    }
  
    res.status(201).json(newVehicle);
  });
  
  app.get('/vehicles/scenario/:scenarioId', (req, res) => {
    const scenarioId = parseInt(req.params.scenarioId);
    const scenarioVehicles = vehicles.filter(vehicle => vehicle.scenarioId === scenarioId);
  
    console.log('Scenario ID:', scenarioId); // Log the scenario ID
    console.log('Scenario Vehicles:', scenarioVehicles); // Log the filtered vehicles
  
    res.json(scenarioVehicles);
  });
  
  app.put('/vehicles/:id', (req, res) => {
    const vehicleId = parseInt(req.params.id);
    const updatedVehicle = req.body;
    vehicles = vehicles.map(vehicle => vehicle.id === vehicleId ? { ...vehicle, ...updatedVehicle } : vehicle);
    res.status(200).json({ message: 'Vehicle updated successfully' });
  });
// Delete a scenario
app.delete('/scenarios/:id', (req, res) => {
  const scenarioId = parseInt(req.params.id);
  scenarios = scenarios.filter(scenario => scenario.id !== scenarioId);
  vehicles = vehicles.filter(vehicle => vehicle.scenarioId !== scenarioId);
  res.status(204).send();
});

// Delete a vehicle
app.delete('/vehicles/:id', (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (vehicle) {
    const scenario = scenarios.find(s => s.id === vehicle.scenarioId);
    if (scenario) {
      scenario.vehicles--;
    }
  }
  vehicles = vehicles.filter(vehicle => vehicle.id !== vehicleId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
