import './EmployeePage.css';
import LinkButton from '../components/LinkButton';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

type Props = {
	apiPath:string
}

function EmployeePage({apiPath}:Props) {
  return (
	<div>
		<PageHeader apiPath={apiPath} homePage='/home' useLogout={true}></PageHeader>
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
