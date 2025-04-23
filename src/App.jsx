import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import MainPage from './components/MainPage/MainPage';
import './App.css'; // add this for styling

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`app-container ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <MainPage />
    </div>
  );
};

export default App;
