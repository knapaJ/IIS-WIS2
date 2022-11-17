import './SubjectDetailsPage.css';
import './HomePage.css';
import LinkButton from '../components/LinkButton';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { useEffect } from 'react';

function HomePage() {

    useEffect(() => {
        document!.getElementById("headerLogOut")!.style.visibility = "hidden";
    })

    return (
    <div>
    <PageHeader homePage='/'></PageHeader>
    <div id="mainHomePageContent">
        <div id="buttonMenu">
            <LinkButton linkText='Student 🧑‍🎓' linkValue='/student'></LinkButton>
            <LinkButton linkText='Zamestnanec 👷' linkValue='/employee'></LinkButton>
            <LinkButton linkText='Nemam ucet 😢' linkValue='/noAccount'></LinkButton>
            <LinkButton linkText='Admin B-)' linkValue='/adminPage'></LinkButton>
        </div>
    </div>

    <PageFooter></PageFooter>
    </div>
    );
}

export default HomePage;
