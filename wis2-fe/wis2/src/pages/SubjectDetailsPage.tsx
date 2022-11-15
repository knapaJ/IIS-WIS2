import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import Table from '../Table';
import logo from './logo.svg';
import './SubjectDetailsPage.css';
import data from '../mockData/mockRegistrationtableData.json';

function SubjectDetailsPage() {
	const [tableData, setTableData] = useState(data);
	const {id} = useParams();

	useEffect(() => {
		fetch("/getDetail", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content_type":"application/json",
			},
			body:JSON.stringify({'id':id})
			}
		).then(res => res.json()).then(recData => {
			console.log(recData);
			setTableData(recData);
		});
	}, []);

	return (
		<div>
			<PageHeader homePage='/'></PageHeader>
				<div id="mainContentSubjectDetailsPage">
					<div className="semesterTitle">
						Detaily predmetu {id}
					</div>
					<Table tableData={tableData}></Table>
				</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default SubjectDetailsPage;
