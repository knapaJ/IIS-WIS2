import logo from './logo.svg';
import './SubjectDetailsPage.css';
import './HomePage.css';
import LinkButton from '../LinkButton';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
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
        </div>
    </div>

    <PageFooter></PageFooter>
    </div>
    );
}

export default HomePage;
