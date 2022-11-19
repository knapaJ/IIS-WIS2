import './SubjectDetailsPage.css';
import './HomePage.css';
import LinkButton from '../components/LinkButton';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { Popup, onPopupEvent } from '../components/Popup';
import { useEffect, useState } from 'react';

function HomePage() {

    const [buttonPopup, setButtonPopup] = useState(false);

    return (
    <div>
        <div className="blurable">
            <PageHeader homePage='/home' useLogout={true}></PageHeader>
            <div id="mainHomePageContent" >
                <div id="buttonMenu">
                    <LinkButton linkText='Student 🧑‍🎓' linkValue='/student'></LinkButton>
                    <LinkButton linkText='Zamestnanec 👷' linkValue='/employee'></LinkButton>
                    <LinkButton linkText='Nemam ucet 😢' linkValue='/noAccount'></LinkButton>
                    <LinkButton linkText='Admin B-)' linkValue='/adminPage'></LinkButton>
                    <button onClick={(event) =>{ onPopupEvent(event); setButtonPopup(true)}}>Open popup</button>
                </div>
            </div>
            <PageFooter></PageFooter>
        </div>

        <Popup triggered={buttonPopup} setTrigger={setButtonPopup}>
            <div>
                <h1>My popup window</h1>
            </div>
        </Popup>
    </div>
    );
}

export default HomePage;
