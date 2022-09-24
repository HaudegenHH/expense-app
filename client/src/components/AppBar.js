import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-white">
              ExpenseApp
            </Link>
          </Typography>
          <Link to="/login" className="text-white">
            <Button color="inherit">LOGIN</Button>
          </Link>
          <Link to="/register" className="text-white">
            <Button color="inherit">REGISTER</Button>
          </Link>
          <Button color="inherit" onClick={logout}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
