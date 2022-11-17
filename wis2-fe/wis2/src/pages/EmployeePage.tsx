import logo from './logo.svg';
import './EmployeePage.css';
import LinkButton from '../components/LinkButton';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

function EmployeePage() {
  return (
	<div>
		<PageHeader homePage='/'></PageHeader>
		<div id="employeeMainContent">
			<div id="buttonMenu">
				<LinkButton linkText='Profil 🤓' linkValue='/userProfile'></LinkButton>
				<LinkButton linkText='Vyucovane kurzy' linkValue='/lecturedCourses'></LinkButton>
			</div>
		</div>
		<PageFooter></PageFooter>
	</div>
  );
}

export default EmployeePage;
