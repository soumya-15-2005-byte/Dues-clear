import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import GenericModal from '../../components/GenericModal';
import CreateDueForm from '../../components/CreateDueForm';

const Filter = ({ setParam, setClick }) => {
  const [filter, setFilter] = useState({
    role: '',
    academic_program: '',
    start_date: '',
    end_date: '',
    status:null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilter((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleClick = () => {
    console.log(filter);
    setParam(filter);
  };

  return (
    <div className="w-full">
      <div className="text-xl font-bold mx-4 my-2">Filters</div>
      <div className="flex flex-wrap gap-8 py-2 px-24 items-center justify-between">
        <div className="flex items-center justify-between">
          <label className="mr-2">Role:</label>
          <select
            name="role"
            value={filter.role}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="">Select Role</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="Phd">PHD</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Status:</label>
          <select
            name="status"
            value={filter.status}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="">Select Status</option>
            <option value="paid">paid</option>
            <option value="pending">pending</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Start Date:</label>
          <input
            name="start_date"
            type="date"
            value={filter.start_date}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">End Date:</label>
          <input
            name="end_date"
            type="date"
            value={filter.end_date}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>
        <div className="flex items-center">
          <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            <GenericModal buttonName={'Create Due'}>
              <CreateDueForm setClick={setClick} />
            </GenericModal>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
