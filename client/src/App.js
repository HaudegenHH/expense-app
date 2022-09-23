import * as React from 'react';

import AppBar from './components/AppBar.js';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
