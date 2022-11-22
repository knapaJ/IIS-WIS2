import { useEffect, useState } from 'react';
import DetailsTable from '../components/DetailsTable';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import './RegisteredSubjectsPage.css';
import data from '../mockData/mockRegistrationtableData.json';

function RegisteredSubjectsPage() {
	const [tableData, setTableData] = useState(data);
	//const [year, setYear] = useState("ziadenrok");
	
	useEffect(() => {
		fetch('/course/list/registered').then(res => res.json()).then(recData => {
			setTableData(recData);
		});
	}, []);

	/*useEffect(() => {
		fetch('/year').then(res => res.json()).then(recData => {
			setYear(recData.year);
		});
	}, []);*/

	return (
	<div>
		<PageHeader homePage='/home' useLogout={true}></PageHeader>
			<div id="registeredSubjectsMainContent">
				<DetailsTable tableData={tableData}></DetailsTable>
			</div>
		<PageFooter></PageFooter>
	</div>
	);
}

export default RegisteredSubjectsPage;
