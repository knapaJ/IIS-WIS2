import './LecturedCourses.css';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import data from '../mockData/mockLecturerClassesTable.json';
import dropDownData from '../mockData/mockDropDownData.json';
import { useEffect, useState } from 'react';
import { Pagination, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

function LecturedCourses() {
	//<DropDown onChange={onDropDownChange} dropDownData={dropDownValue}></DropDown>

	const [tableData, setTableData] = useState(data.classes);

	const [pageNumber, setPageNumber] = useState(1);
	const [maxPagesNumber, setmMaxPagesNumber] = useState(1);
	
	
	useEffect(() => {
		fetch('/getSubjectData').then(res => res.json()).then(recData => {
			setPageNumber(recData.currentPage);
			setmMaxPagesNumber(recData.totalPages);
			setTableData(recData.classes);
		});
	}, []);

	useEffect(() => {console.log("change", tableData)}, [tableData]);

	const onPaginationChange = (event:any) => {
		console.log(event)
	}

	return (
		<div>
			<PageHeader homePage='/home' useLogout={true}></PageHeader>
				<div id="lecturedCoursesMainContent">
					

				<form>
					<Table sx={{ boxShadow: 2}}	>
						<colgroup>
							<col style={{width:'20%'}}/>
							<col style={{width:'20%'}}/>
							<col style={{width:'20%'}}/>
							<col style={{width:'20%'}}/>
						</colgroup>
						<TableHead>
							<TableRow>
								<TableCell>Skratka predmetu</TableCell>
								<TableCell>Typ vyuky</TableCell>
								<TableCell>Pocet studentov</TableCell>
								<TableCell>Detaily</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableData.map((td:any) => (
								<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
									<TableCell sx={{ borderBottom: '0'}}>{td.shortcut}</TableCell>
									<TableCell sx={{ borderBottom: '0'}}>{td.lecture}</TableCell>
									<TableCell sx={{ borderBottom: '0'}}>{td.studentCount}</TableCell>
									<td><Link to={'/lecturedCourseDetail/' + td.courseId + '/' + td.id}>detail</Link></td>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>
									<Pagination count={maxPagesNumber?? 1} defaultPage={pageNumber?? 1} onChange={(event) => onPaginationChange(event)}></Pagination>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</form>

				</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default LecturedCourses;
