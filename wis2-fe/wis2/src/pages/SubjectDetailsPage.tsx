import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import logo from './logo.svg';
import './SubjectDetailsPage.css';
import data from '../mockData/mockRegistrationtableData.json';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function SubjectDetailsPage() {
	const [tableData, setTableData] = useState(data);
	const {id} = useParams();
	const {subName} = useParams();

	useEffect(() => {
		console.log(id);
		
		const url = "/course/detail/terms/" + id;
		fetch(url).then(res => res.json()).then(recData => {
			console.log(recData);
			setTableData(recData);
		  });
	}, []);

	return (
		<div>
			<PageHeader homePage='/home' useLogout={true}></PageHeader>
				<div id="mainContentSubjectDetailsPage">
					<div className="semesterTitle">
						Detaily predmetu {subName}
					</div>
					<Table id="registrationTable" sx={{ boxShadow: 2}}>
						<TableHead>
							<TableRow sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
								<TableCell>Nazov</TableCell>
								<TableCell>Datum hodnotenia</TableCell>
								<TableCell>Hodnotiaci</TableCell>
								<TableCell>Body</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableData.map((td:any) => (
							<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
								<TableCell>{td.course}</TableCell>
								<TableCell>{td.date}</TableCell>
								<TableCell>{td.lecturer}</TableCell>
								<TableCell>{td.points}</TableCell>
							</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default SubjectDetailsPage;
