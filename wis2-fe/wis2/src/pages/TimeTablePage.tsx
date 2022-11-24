import { useEffect, useState } from 'react';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import './SubjectRegistrationPage.css';
import data from '../mockData/mockRegistrationtableData.json';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

type Props = {
	apiPath:string
}

function SubjectRegistrationPage({apiPath}:Props) {
	const [tableData, setTableData] = useState(data);
	
	useEffect(() => {
	  fetch(apiPath + '/term/listupcoming').then(res => res.json()).then(recData => {
		console.log(recData);
	  });
	}, []);
	
	return (
		<div>
			<PageHeader apiPath={apiPath}  homePage='/home' useLogout={true}></PageHeader>
			<div id="mainContent">
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
