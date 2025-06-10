import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";

const FilterDash = ({ setParam }) => {
    const [filter, setFilter] = useState({
        dep_name: "",
        due_amount: "",
        is_Active: 0,
        start_date: "",
        end_date: "",
        search: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilter((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    useEffect(() => {
        setParam(filter);
        // console.log(filter);
    }, [filter]);

    return (
        <>
            <div style={{ display: 'flex', width: '100vw', borderBottom: '1px solid grey' }}>
                <div style={{
                    margin: '6px'
                }}>
                    <div
                        style={{
                            display: "flex",
                            fontSize: "x-large",
                            width: '98vw',
                            margin: '6px',
                        }}
                    >
                        Filters
                    </div>
                    <div
                    style={{
                        display: "flex",
                        justifyContent: 'space-between',
                    }}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TextField
                                name="dep_name"
                                label=" Dept. Name"
                                type="text"
                                value={filter.dep_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name="due_amount"
                                label="Due Amount"
                                type="text"
                                value={filter.due_amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name="start_date"
                                type="date"
                                value={filter.start_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                name="end_date"
                                type="date"
                                value={filter.end_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{display: 'flex',alignItems: 'center'}}>
                            <div style={{
                                display: 'flex', display: 'flex',
                                width: '10vw',
                                justifyContent: 'center',
                                alignContent: 'center',
                                borderRadius: '25px',
                                background: 'rgba(119, 136, 153, 0.19)'
                            }}>
                                <div style={{ marginRight: '14px' }}>
                                    <label htmlFor="isActiveCheckbox">Is Active</label>
                                </div>
                                <input
                                    type="checkbox"
                                    id="isActiveCheckbox"
                                    name="is_Active"
                                    checked={filter.is_Active === 1}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <form className="bg-slate-100 p-2 rounded-lg flex items-center">
                                <div>
                                    <input
                                        type="text"
                                        name="search"
                                        value={filter.search}
                                        onChange={handleChange}
                                        placeholder="Search..."
                                        className="bg-transparent focus:outline-none w-20 sm:w-64"
                                    />
                                </div>
                                <FaSearch className="text-slate-500" />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};


export default FilterDash;
