import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, userTypeValues } from "../../context/auth/authState";
import { useNavigate } from "react-router-dom";
import { backendUri } from "../../env";
import { toast } from "react-toastify";

const LoginDep = () => {
  const [formstate, setFormState] = useState({});
  const context = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);
  const { token, userType } = context;
  const navigator = useNavigate()

  const handleChange = (e) => {
    setFormState({
      ...formstate,
      [e.target.id]: e.target.value,
    });
  };

  const handleDepPOST = async (e) => {
    e.preventDefault();
    try {
      if (token != null || userType == userTypeValues.department) {
        navigator("/department-dues");
      } else {
        const response = await fetch(`${backendUri}/department/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formstate.username,
            password: formstate.password,
          }),
        });

        if (response.ok) {
          const { token } = await response.json();

          setAuth({
            isAuthenticated: true,
            token: token,
            userType: userTypeValues.department
          });
          localStorage.setItem('token', token);
          localStorage.setItem('userType', userTypeValues.department);
          toast('Login Successfully')
          navigator('/department-dues')
        } else {
          toast('Login Failed')
        }

      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(()=>{

  },[])

  return (
    <div
      id="departmentlogin"
      className="text-right mt-6"
    >
      <form
        onSubmit={handleDepPOST}
        method="post"
        className="flex flex-col "
      >
        <input
          type="username"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="h-10 border p-2 rounded-lg border-gray-400 mb-4 text-black outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="h-10 border p-2 rounded-lg border-gray-400 mt-4 mb-2 text-black outline-none"
        />

        <a
          href="#"
          className="text-[#024182]  text-xs mb-2"
        >
          Forgot Password?
        </a>

        <button className="bg-blue-900 bg-opacity-97 rounded-lg px-4 py-2 align-center mt-4 mb-12 w-80 sm:w-[22rem] active:scale-[1.02]">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginDep;
