import logo from './logo.svg';
import './EmployeePage.css';
import LinkButton from '../LinkButton';
import LogoutButton from '../LogoutButton';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';

function EmployeePage() {
  return (
  <div>
	<PageHeader homePage='/'></PageHeader>
	<div id="employeeMainContent">
		<div id="buttonMenu">
			<LinkButton linkText='Profil 🤓' linkValue='/profile'></LinkButton>
			<LinkButton linkText='Vyucovane kurzy' linkValue='/lecturedCourses'></LinkButton>
		</div>
	</div>
	<PageFooter></PageFooter>
  </div>
  );
}

export default EmployeePage;
