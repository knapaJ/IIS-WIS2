import './App.css';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import StudentPage from './pages/StudentPage';
import EmployeePage from './pages/EmployeePage';
import SubjectDetailsPage from './pages/SubjectDetailsPage';
import RegisteredSubjectsPage from './pages/RegisteredSubjectsPage';
import SubjectRegistrationPage from './pages/SubjectRegistrationPage';
import LecturedCourses from './pages/LecturedCourses';
import LecturedCourseDetail from './pages/LecturedCourseDetail';
import UserProfile from './pages/UserProfile';
import NoAccPage from './pages/NoAccPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import GarantPage from './pages/GarantPage';
import PrivateRoute from './components/ProtectedRoute';

function App() {

  /* <Route element={<PrivateRoute userType='admin' url='/home'/>}>
        <Route path="/home" element={<HomePage/>}/>
      </Route>
  */


  return (
    <Routes>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/student" element={<StudentPage/>}/>
      <Route path="/employee" element={<EmployeePage/>}/>
      <Route path="/subjectDetails" element={<SubjectDetailsPage/>}/>
      <Route path="/registeredSubjects" element={<RegisteredSubjectsPage/>}/>
      <Route path="/registeredSubjectsDetails/:subName/:id" element={<SubjectDetailsPage/>}/>
      <Route path="/termRegistration" element={<SubjectRegistrationPage/>}/>
      <Route path="/lecturedCourses" element={<LecturedCourses/>}/>
      <Route path="/lecturedCourseDetail/:subName/:id" element={<LecturedCourseDetail/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
      <Route path="/noAccount" element={<NoAccPage/>}/>
      <Route path="/adminPage" element={<AdminPage/>}/>
      <Route path="/garant" element={<GarantPage/>}/>
    </Routes>
  );
}

export default App;
