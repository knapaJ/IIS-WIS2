import './SubjectDetailsPage.css';
import './SchedulePage.css';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

function SchedulePage() {

    return (
    <div>
        <PageHeader homePage='/home' useLogout={true}></PageHeader>
        <PageFooter></PageFooter>
    </div>
    );
}

export default SchedulePage;
