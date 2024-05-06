import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoginEndPoint = () => {
    const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/user');
      setUserData(response.data);
      console.log(response); // Aquí se muestra el userData en la consola
    };
    fetchData();

  }, []);

  return null;
};

export default LoginEndPoint;