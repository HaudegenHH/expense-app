import React, { useEffect, useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';

import Cookies from 'js-cookie';

export default function CheckAuth({ children }) {
  const token = Cookies.get('token');
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URI}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      redirect('/login');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return children;
}
