import { userTypeValues } from "../context/auth/authState";
import { useNavigate } from "react-router-dom";

export default function checkDepartmentToken() {
    const token = localStorage.getItem('token');
    const type =  localStorage.getItem('userType');

    if(type !== userTypeValues.department){
        return null;
    }

    return token;
}