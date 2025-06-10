import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudDash from './pages/Student/StudDash';
import New from './pages/New';
import CallBack from './pages/CallBack';
import DepDash from './pages/Department/DepDash';
import Due from './pages/Department/Due';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import StudDues from './pages/Student/StudDues';
import CommunicationPage from './pages/Department/Communication';
import NotFoundPage from './pages/NotFound';
import DepartmentCertificate from './pages/Department/DepartmentCertificate';
import DepartmentRequest from './pages/Department/DepartmentRequests';
import DepartmentManageStudent from './pages/Department/DepartmentManageStudent';
import StudentRequests from './pages/Student/StudRequests';
import StudentCertificate from './pages/Student/StudentCertificate';

const App = () => {
  return (
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<New />} />
            <Route path='/student' element={<StudDash />} />
            <Route path='/student-dues' element={<StudDues />} />
            <Route path='/student-request' element={<StudentRequests />} />
            <Route path='/student-certificate' element={<StudentCertificate/>} />
            <Route path='/callback' element={<CallBack />} />
            <Route path='/dep' element={<DepDash />} />
            <Route path='/department-dashboard' element={<DepDash />} />
            <Route path='/department-dues' element={<Due />} />
            <Route path='/department-communication' element={<CommunicationPage/>} />
            <Route path='/department-certificates' element={<DepartmentCertificate/>} />
            <Route path='/department-requests' element={<DepartmentRequest />} />
            <Route path='/department-manage-student' element={<DepartmentManageStudent />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </RecoilRoot>
  );
}

export default App;
