import { useEffect, useState } from 'react';
import EventButton from '../components/EventButton';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import RegisrationTable from '../components/RegistrationTable';
import '../components/RegistrationTable';
import data from '../mockData/mockRegistrationtableData.json';

function SubjectRegistrationPage() {
	const [tableData, setTableData] = useState(data);
	
	useEffect(() => {
	  fetch('/regTable').then(res => res.json()).then(recData => {
		console.log(recData);
		setTableData(recData);
	  });
	}, []);
	
	function onButtonClick() {
		console.log("sending table data")

		var dataToSend = []
		var checkBoxData = document.getElementsByClassName("reg-table-check-box");

		for (var i = 0; i < checkBoxData.length; i++) {
			if ((checkBoxData[i] as HTMLInputElement).checked) {
				var checkedCheckBox = checkBoxData[i];
				
				for (var j = 0; j < tableData.length; j++) {
					if (parseInt((checkedCheckBox as HTMLInputElement).value, 10) == tableData[j].id) {
						dataToSend.push(tableData[j]);
					}
				}
			}
		}

		fetch("/regTableRes", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content_type":"application/json",
			},
			body:JSON.stringify(dataToSend)
			}
		)
	}
		
	
	return (
		<div>
			<PageHeader homePage='/'></PageHeader>
			<div id="subjectRegistrationMainContent">
				<div>
					<RegisrationTable tableData={tableData}></RegisrationTable>
					<EventButton buttonText='Registrovat' onClick={onButtonClick}></EventButton>
				</div>
			</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default SubjectRegistrationPage;
