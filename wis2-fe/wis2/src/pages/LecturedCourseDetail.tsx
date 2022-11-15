import logo from './logo.svg';
import './LecturedCourses.css';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import { useEffect, useState } from 'react';
import DetailsTable from '../DetailsTable';
import DropDown from '../DropDown';
import InputTable from '../InputTable';
import data from '../mockData/mockInputTableData.json'

function LecturedCourses() {
	const [tableData, setTableData] = useState(data);
	const [editPointsId, setEditPointsId] = useState(null);
	

	return (
		<div>
			<PageHeader homePage='/'></PageHeader>
				<div id="lecturedCoursesMainContent">
					<InputTable tableData={tableData}></InputTable>
				</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default LecturedCourses;
