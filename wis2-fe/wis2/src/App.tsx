import logo from './logo.svg';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
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

      
    </Routes>
  );
}

export default App;
