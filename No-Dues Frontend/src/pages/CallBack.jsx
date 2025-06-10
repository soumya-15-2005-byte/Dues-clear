import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { backendUri } from '../env';
import { toast } from "react-toastify";
import { useSetRecoilState } from 'recoil';
import { authState, userTypeValues } from '../context/auth/authState';
import Loader from '../components/Loader';

const CallBack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  
  useEffect(() => {
    const handleMicrosoftAuthentication = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        if (code) {
          const response = await fetch(`${backendUri}/student/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "access_code": code,
            }),
          });

          if (response.ok) {
            const { token } = await response.json();
            setAuth({
              isAuthenticated: true,
              token: token,
              userType: userTypeValues.student
            });
            localStorage.setItem('token', token);
            localStorage.setItem('userType', userTypeValues.student);

            navigate('/student');
            toast('Login successful');
          } else {
            console.error('Login failed');
          }
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    handleMicrosoftAuthentication();
  }, []);

  return (
    <div>
      <Loader/>
    </div>
  );
};

export default CallBack;
