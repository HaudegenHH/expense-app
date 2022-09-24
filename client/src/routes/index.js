import { createBrowserRouter } from 'react-router-dom';

import App from '../App.js';
import Login from '../pages/Login.js';
import Home from '../pages/Home.js';
import Register from '../pages/Register.js';
import CheckAuth from '../utils/CheckAuth.js';
import Guest from '../utils/Guest.js';

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        // element: token ? <Home /> : <Navigate to="/login" replace={true} />,
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },
      {
        path: '/login',
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: '/register',
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },
    ],
  },
]);
