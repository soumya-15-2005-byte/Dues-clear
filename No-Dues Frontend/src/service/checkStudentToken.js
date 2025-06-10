import { userTypeValues } from "../context/auth/authState";

export default function checkStudentToken() {
    const token = localStorage.getItem('token');
    const type =  localStorage.getItem('userType');

    if(type !== userTypeValues.student){
        return null;
    }

    return token;
}