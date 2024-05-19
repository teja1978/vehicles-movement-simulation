// Sidebar.js
import React from 'react';
import './sidebar.css';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <button className="sidebar-button" onClick={() => setActiveSection('home')}>Home</button>
      <button className="sidebar-button" onClick={() => setActiveSection('add-scenario')}>Add Scenario</button>
      <button className="sidebar-button" onClick={() => setActiveSection('all-scenarios')}>All Scenarios</button>
      <button className="sidebar-button" onClick={() => setActiveSection('add-vehicle')}>Add Vehicle</button>
    </div>
  );
};

export default Sidebar;
