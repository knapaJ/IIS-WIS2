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
import SchedulePage from './pages/SchedulePage';
import PrivateRoute from './components/ProtectedRoute';
import LecturedCoursesLectures from './pages/LecturedCoursesLectures';

function App() {

  return (
    <Routes>
      <Route element={<PrivateRoute userType='admin' url='/home'/>}>
        
      </Route>
      <Route element={<PrivateRoute userType='admin' url='/home'/>}>
        
      </Route>
      <Route element={<PrivateRoute userType='admin' url='/home'/>}>

      </Route>

      <Route path="/home" element={<HomePage/>}/>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/student" element={<StudentPage/>}/>
      <Route path="/employee" element={<EmployeePage/>}/>
      <Route path="/subjectDetails" element={<SubjectDetailsPage/>}/>
      <Route path="/registeredSubjects" element={<RegisteredSubjectsPage/>}/>
      <Route path="/registeredSubjects/registeredSubjectsDetails/:subName/:id" element={<SubjectDetailsPage/>}/>
      <Route path="/termRegistration" element={<SubjectRegistrationPage/>}/>
      <Route path="/lecturedCourses" element={<LecturedCourses/>}/>
      <Route path="/lecturedCourseDetail/:subName/:id" element={<LecturedCourseDetail/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
      <Route path="/noAccount" element={<NoAccPage/>}/>
      <Route path="/adminPage" element={<AdminPage/>}/>
      <Route path="/garant" element={<GarantPage/>}/>
      <Route path="/lecturedCourseLectures/:subName/:id" element={<LecturedCoursesLectures/>}/>
      <Route path="/schedule" element={<SchedulePage/>}/>
    </Routes>
  );
}

export default App;
