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
import LecturedCoursesLectures from './pages/LecturedCoursesLectures';
import PrivateRouteUser from './components/ProtectedRouteUser';
import PrivateRouteAdmin from './components/ProtectedRouteAdmin';
import LectureRegistrationPage from './pages/LectureRegistrationPage';

function App() {

  return (
    <Routes>
      <Route element={<PrivateRouteAdmin/>}>
        <Route path="/adminPage" element={<AdminPage/>}/>
      </Route>

      <Route element={<PrivateRouteUser/>}>
        <Route path="/student" element={<StudentPage/>}/>
        <Route path="/termRegistration" element={<SubjectRegistrationPage/>}/>
        <Route path="/subjectDetails" element={<SubjectDetailsPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/employee" element={<EmployeePage/>}/>
        <Route path="/registeredSubjects" element={<RegisteredSubjectsPage/>}/>
        <Route path="/registeredSubjects/registeredSubjectsDetails/:subName/:id" element={<SubjectDetailsPage/>}/>
        <Route path="/lecturedCourses" element={<LecturedCourses/>}/>
        <Route path="/lecturedCourseDetail/:id" element={<LecturedCourseDetail/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/lecturedCourseLectures/:id" element={<LecturedCoursesLectures/>}/>
        <Route path="/lecureRegistrationPage/:course" element={<LectureRegistrationPage/>}/>
      </Route>

      
      <Route path="/noAccount" element={<NoAccPage/>}/>
      <Route path="/" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;
