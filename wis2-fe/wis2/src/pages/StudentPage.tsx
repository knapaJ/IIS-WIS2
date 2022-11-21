import LinkButton from '../components/LinkButton';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import './StudentPage.css';

function StudentPage() {
  return (
  <div>
    <PageHeader homePage='/home' useLogout={true}></PageHeader>
		<div id="studentPageMainContent">
			<div id="buttonMenu">
				<LinkButton linkText='Profil 🤓' linkValue='/userProfile'></LinkButton>
				<LinkButton linkText='Registracie terminov 📅' linkValue='/termRegistration'></LinkButton>
				<LinkButton linkText='Aktualne predmety 😩' linkValue='/registeredSubjects'></LinkButton>
			</div>
		</div>
	<PageFooter></PageFooter>
  </div>
  );
}

export default StudentPage;
