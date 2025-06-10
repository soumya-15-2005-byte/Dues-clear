import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { backendUri } from "../env";
import { authState, userTypeValues } from "../context/auth/authState";
import iitplogo from "/iitplogo.png";
import ezdueslogo from "/ezdueslogo.png";
import mslogo from "/mslogo.png";
import iitplogo2 from "/iitplogoOG.png";
import LoginDep from "./Department/LoginDep";
import { toast } from "react-toastify";

const New = () => {
  const [view, setView] = useState("student");
  const context = useRecoilValue(authState);
  const { token, userType } = context;
  const navigator = useNavigate();

  const handleDepGET = async () => {
    const response = await fetch(`${backendUri}/department/login`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resp = await response.json();
    console.log(resp);
    if (response.status === 200) {
      toast('Login Successfully')
      navigator("/dues");
    } else {
      navigator("/");
    }
  };

  const handleStudLogin = async () => {
    const res = await fetch(`${backendUri}/student/login`, {
      method: 'GET',
    });
    const data = await res.json();
    // console.log(res);
    if (res.status == 200) {
      window.location.href = data.login_url;
    } else {
      toast('Login failed');
    }
  }

  const toggleView = (view) => {
    if (view == 'dep') {
      handleDepGET();
    }
    setView(view);
  };

  return (
    <div className=" relative bg-[url(../loginpg_bg.png)] bg-no-repeat bg-cover bg-center bg-blue-50">
      <div className="absolute inset-0 opacity-50" style={{ backgroundColor: 'rgb(33 41 52)' }}></div>
      <div className="flex flex-col justify-between  px-6 pb-3 pt-5 text-white min-h-screen font-vietnam  bg-hero-pattern-2 backdrop-blur-md">
        <header className="flex flex-col-reverse sm:flex-row gap-10 sm:gap-0 justify-between items-center mb-16 sm:mb-0">
          <img src={ezdueslogo} alt="EzDues Logo" className="w-44 sm:w-24" />
          <img
            src={iitplogo}
            alt="IIT Patna Logo"
            className="hidden sm:block w-80"
          />
          <img
            src={iitplogo2}
            alt="IIT Patna Logo"
            className="sm:hidden w-80"
          />
        </header>

        <div className="flex justify-center items-center mb-16">
          <div className="opacity-90 bg-white max-[640px]:w-[28rem] rounded-3xl px-20 pt-8 flex flex-col justify-center items-center gap-2 border-4 ">
            <h3 className="text-[#201A1A] mb-4 text-3xl font-jakarta font-bold">
              Login
            </h3>
            <div className="border border-blue-900 rounded-lg overflow-hidden text-sm w-80 sm:w-[22rem] mb-4">
              <button
                onClick={() => toggleView("student")}
                className={`${view === "student" ? "bg-blue-900" : "bg-white"
                  } w-1/2 py-1.5`}
              >
                <span
                  className={`${view === "student" ? "text-white" : "text-black"
                    }`}
                >
                  Student
                </span>
              </button>
              <button
                onClick={() => toggleView("dep")}
                className={`${view === "dep" ? "bg-blue-900" : "bg-white"
                  } w-1/2 py-1.5`}
              >
                <span
                  className={`${view === "dep" ? "text-white" : "text-black"}`}
                >
                  Department
                </span>
              </button>
            </div>

            {view == "student" && (
              <div className="flex h-60 flex-col justify-center gap-12">
                <button
                  onClick={handleStudLogin}
                  className="bg-blue-900 rounded-lg px-4 py-2 flex justify-center items-center w-80 sm:w-[22rem] active:scale-[1.02]"
                >
                  <div className="flex justify-center items-center gap-3">
                    <span>Login with</span>
                    <img src={mslogo} alt="Microsoft logo" className="h-6" />
                  </div>
                </button>
                <a href="#" className="text-[#024182] text-center text-xs">
                  Forgot Password?
                </a>
              </div>
            )}
            {view == "dep" && <LoginDep />}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default New;
