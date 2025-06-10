import { atom } from 'recoil';


export const userTypeValues = {
  department: 'Department',
  student: 'Student'
}

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    token: null,
    userType: null,
  },
});
