import './SubjectDetailsPage.css';
import './HomePage.css';
import LinkButton from '../components/LinkButton';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { useEffect } from 'react';

function HomePage() {
    return (
    <div>
    <PageHeader homePage='/home' useLogout={true}></PageHeader>
    <div id="mainHomePageContent">
        <div id="buttonMenu">
            <LinkButton linkText='Student 🧑‍🎓' linkValue='/student'></LinkButton>
            <LinkButton linkText='Zamestnanec 👷' linkValue='/employee'></LinkButton>
            <LinkButton linkText='Admin B-)' linkValue='/adminPage'></LinkButton>
        </div>
    </div>

    <PageFooter></PageFooter>
    </div>
    );
}

export default HomePage;
