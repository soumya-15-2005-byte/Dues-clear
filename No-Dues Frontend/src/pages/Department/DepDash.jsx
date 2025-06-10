import React, { useState } from 'react'
import { authState } from '../../context/auth/authState';
import { backendUri } from '../../env';
import { useRecoilValue } from 'recoil';
import Header from '../../components/Nav';
import checkDepartmentToken from '../../service/checkDepartmentToken';
import { toast } from 'react-toastify';

const DepDash = () => {
  const token = checkDepartmentToken();
  const [formstate, setFormState] = useState({});
  const handleChange = (e) => {
    setFormState({
      ...formstate,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUri}/department/add-student`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formstate)
      });
      const data = await res.json();
      if(res.status === 201 || res.status === 200){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Header label={'DASHBOARD'} isDep={true} />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Add Student</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="roll_number" placeholder="Enter roll number" className="border p-3 rounded-lg" id="roll_number" onChange={handleChange}
          />
          <button
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Add Roll Number
          </button>
        </form>
      </div>
    </>
  )
}

export default DepDash
