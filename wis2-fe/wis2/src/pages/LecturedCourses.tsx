import logo from './logo.svg';
import './LecturedCourses.css';
import LinkButton from '../LinkButton';
import LogoutButton from '../LogoutButton';
import PageHeader from '../PageHeader';
import PageFooter from '../PageFooter';
import data from '../mockData/mockLecturerClassesTable.json';
import dropDownData from '../mockData/mockDropDownData.json';
import { useEffect, useState } from 'react';
import DetailsTable from '../DetailsTable';
import DropDown from '../DropDown';

function LecturedCourses() {
	const [tableData, setTableData] = useState(data);
	const [dropDownValue, setDropDownValue] = useState(dropDownData);
	var tableValues = [{id:'1', shortcut:'Skratka predmetu', fullname:'Typ vyuky', credits:'PocetStudentov', link:'Hodnotenie studentov'}];
	
	useEffect(() => {
		fetch('/getSubjectData').then(res => res.json()).then(recData => {
			setTableData(recData);
		});
		
		fetch('/getDropDownData').then(res => res.json()).then(recData => {
			setDropDownValue(recData);
		});
	}, []);

	useEffect(() => {console.log("change", tableData)}, [tableData]);
	
	function onDropDownChange() {
		var dropDownVal = (document.getElementsByClassName("dropDown")[0] as HTMLInputElement).value;
		var slicedData = [...tableData];
		
		for (var i = 0; i < slicedData.length; i++) {
			if ((dropDownVal != slicedData[i].shortcut) && (dropDownVal != 'All')) {
				console.log(slicedData[i]);	
				slicedData[i].visible = "false"
			} else {

				slicedData[i].visible = "true"
			}
		}
		
		setTableData(slicedData);
		console.log(slicedData);
		
	}

	return (
		<div>
			<PageHeader homePage='/'></PageHeader>
				<div id="lecturedCoursesMainContent">
					<DropDown onChange={onDropDownChange} dropDownData={dropDownValue}></DropDown>
					<DetailsTable tableData={tableData} tableValues={tableValues}></DetailsTable>
				</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default LecturedCourses;
