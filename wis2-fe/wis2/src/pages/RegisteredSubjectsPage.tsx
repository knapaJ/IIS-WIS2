import { useEffect, useState } from 'react';
import DetailsTable from '../components/DetailsTable';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import './RegisteredSubjectsPage.css';
import data from '../mockData/mockRegistrationtableData.json';

function RegisteredSubjectsPage() {
	const [tableData, setTableData] = useState(data);
	const [year, setYear] = useState("ziadenrok");
    var tableValues = [{id:'1', shortcut:'Skratka predmet', fullname:'Nazov predmetu', credits:'Pocet kreditov', link:'Detail predmetu'}];
	
	useEffect(() => {
		fetch('/detailsTable').then(res => res.json()).then(recData => {
			setTableData(recData);
		});
	}, []);

	useEffect(() => {
		fetch('/year').then(res => res.json()).then(recData => {
			setYear(recData.year);
		});
	}, []);


	return (
	<div>
		<PageHeader homePage='/'></PageHeader>
			<div id="registeredSubjectsMainContent">
				<div className="semesterTitle">
					Zimny semester {year}
				</div>
				<DetailsTable tableData={tableData} tableValues={tableValues}></DetailsTable>
				<div className="semesterTitle">
					Letny semester {year}
				</div>
				<DetailsTable tableData={tableData} tableValues={tableValues}></DetailsTable>
			</div>
		<PageFooter></PageFooter>
	</div>
	);
}

export default RegisteredSubjectsPage;
