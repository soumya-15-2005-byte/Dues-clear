import React from 'react';
import DepartmentVerticalNav from '../../components/DepartmentVerticalNav';

const DepartmentLayout = ({ children }) => {
    return (
        <div style={{height: '100vh', width: '100vw'}} className="flex">
            <DepartmentVerticalNav />
            <div>{children}</div>
        </div>
    );
};

export default DepartmentLayout;
