import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export default function Guest({ children }) {
  const token = Cookies.get('token');

  const fetchUser = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return !token ? children : <Navigate to="/" replace={true} />;
}
