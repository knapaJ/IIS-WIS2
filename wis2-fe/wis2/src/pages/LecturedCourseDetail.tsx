import logo from './logo.svg';
import './LecturedCourses.css';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { useEffect, useState } from 'react';
import InputTable from '../components/InputTable';
import data from '../mockData/mockInputTableData.json'

function LecturedCourses() {
	const [tableData, setTableData] = useState(data);
	

	return (
		<div>
			<PageHeader homePage='/home' useLogout={true}></PageHeader>
				<div id="lecturedCoursesMainContent">
					<InputTable tableData={tableData}></InputTable>
				</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default LecturedCourses;
