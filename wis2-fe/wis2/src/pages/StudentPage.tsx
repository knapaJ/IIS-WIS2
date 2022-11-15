import LinkButton from '../LinkButton';
import LogoutButton from '../LogoutButton';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import logo from './logo.svg';
import './StudentPage.css';

function StudentPage() {
  return (
  <div>
    <PageHeader homePage='/'></PageHeader>
		<div id="studentPageMainContent">
			<div id="buttonMenu">
				<LinkButton linkText='Profil 🤓' linkValue='/profile'></LinkButton>
				<LinkButton linkText='Registracie terminov 📅' linkValue='/termRegistration'></LinkButton>
				<LinkButton linkText='Aktualne predmety 😩' linkValue='/registeredSubjects'></LinkButton>
			</div>
		</div>
	<PageFooter></PageFooter>
  </div>
  );
}

export default StudentPage;
