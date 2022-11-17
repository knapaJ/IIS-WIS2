import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import logo from './logo.svg';
import './SubjectDetailsPage.css';
import data from '../mockData/mockRegistrationtableData.json';

function SubjectDetailsPage() {
	const [tableData, setTableData] = useState(data);
	const {id} = useParams();
	const {subName} = useParams();

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
						Detaily predmetu {subName}
					</div>
					<Table tableData={tableData}></Table>
				</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default SubjectDetailsPage;
