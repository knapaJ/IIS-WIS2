import { useEffect, useState } from 'react';
import EventButton from '../components/EventButton';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import './SubjectRegistrationPage.css';
import data from '../mockData/mockRegistrationtableData.json';
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function SubjectRegistrationPage() {
	const [tableData, setTableData] = useState(data);
	
	useEffect(() => {
	  fetch('/course/list/notregistered').then(res => res.json()).then(recData => {
		console.log(recData);
		setTableData(recData);
	  });
	}, []);
	
	const onButtonClick = (event:any, tableData:any) => {
		fetch("/course/register", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content-type":"application/json",
			},
			body:JSON.stringify(tableData)
			}
		).then((response) => {
			if (!response.ok) {
				alert("Incorrect data");		
			}
		}).then((recData) => {
			console.log(recData);
			fetch('/course/list/notregistered').then(res => res.json()).then(recData => {
				setTableData(recData);
			});
		});
	}
		
	
	return (
		<div>
			<PageHeader homePage='/home' useLogout={true}></PageHeader>
			<div id="subjectRegistrationMainContent">
				<div>
					<Table id="registrationTable" sx={{ boxShadow: 2}}>
						<colgroup>
							<col style={{width:'40%'}}/>
							<col style={{width:'40%'}}/>
							<col style={{width:'20%'}}/>
						</colgroup>
						<TableHead>
							<TableRow sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
							<TableCell>Skratka predmetu</TableCell>
							<TableCell>Nazov predmetu</TableCell>
							<TableCell>Pocet kreditov</TableCell>
							<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableData.map((td:any) => (
							<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
								<TableCell>{td.shortcut}</TableCell>
								<TableCell>{td.fullname}</TableCell>
								<TableCell>{td.credits}</TableCell>
								<TableCell><Button onClick={(event) => onButtonClick(event, td)}>Registrovat</Button></TableCell>
							</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default SubjectRegistrationPage;
