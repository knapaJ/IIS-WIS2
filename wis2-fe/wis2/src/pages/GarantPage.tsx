import './GarantPage.css';
import { nanoid } from "nanoid";
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { Fragment, useState } from 'react';
import courseData from '../mockData/mockCreatedCoursesData.json';
import termData from '../mockData/mockTermsTableData.json';
import requestData from '../mockData/mockAdminPageRequestData.json';
import { Popup, onPopupEvent } from '../components/Popup';

function GarantPage() {
	// PEOPLE TABLE DATA
	const [courseTableData, setCourseTableData] = useState(courseData);
	const [addNewCourseFlag, setAddNewCourseFlag] = useState(true);

	const [editCourseId, setEditCourseId] = useState<string | null>(null);
	const [editCourseFormData, setEditCourseFormData] = useState({
		shortName: "",
		name: "",
		description: "",
		studentLimit: "",
		isApproved: ""
	});
	// PEOPLE TABLE DATA

	// TERMS TABLE DATA	
	const [termTableData, setTermTableData] = useState(termData);
	const [addNewTermFlag, setAddNewTermFlag] = useState(true);

	const [editTermId, setEditTermId] = useState<string | null>(null);
	const [editTermFormData, setEditTermFormData] = useState({
		title: "",
		description: "",
		startDate: "",
		endDate: "",
		registrationStartDate: "",
		registrationEndDate: "",
		maxMark: "",
		studentLimit: "",
		isRegistrationEnabled: "",
		isOptional: ""
	});
	// TERMS TABLE DATA
	

	// REQ TABLE DATA
	const [requestTableData, setRequestTableData] = useState(requestData);
	// REQ TABLE DATA

	// POPUP OPEN/CLOSE STATES
	const [buttonCoursePopup, setButtonCoursePopup] = useState(false);
	const [buttonTermPopup, setButtonTermPopup] = useState(false);
	// POPUP OPEN/CLOSE STATES

	// ROOMS TABLE LOGIC
	const onTermEditButton = (event:any, termTableData:any) => {
		event.preventDefault();
		if (addNewTermFlag) {
			console.log(termTableData.id)
			setEditTermId(termTableData.id);
			
			const rowValue = {
				title: termTableData.title,
				description: termTableData.description,
				startDate: termTableData.startDate,
				endDate: termTableData.endDate,
				registrationStartDate: termTableData.registrationStartDate,
				registrationEndDate: termTableData.registrationEndDate,
				maxMark: termTableData.maxMark,
				studentLimit: termTableData.studentLimit,
				isRegistrationEnabled: termTableData.isRegistrationEnabled,
				isOptional: termTableData.isOptional
			}

			setEditTermFormData(rowValue);
		}
	}

	const onTermAddButton = (event:any) => {
		event.preventDefault();
		setAddNewTermFlag(false);
		
		if (addNewTermFlag) {

			const newRow = {
				id: nanoid(),
				title: "",
				description: "",
				startDate: "",
				endDate: "",
				registrationStartDate: "",
				registrationEndDate: "",
				maxMark: "",
				studentLimit: "",
				isRegistrationEnabled: "",
				isOptional: ""
			}

			const formData = {
				title: "",
				description: "",
				startDate: "",
				endDate: "",
				registrationStartDate: "",
				registrationEndDate: "",
				maxMark: "",
				studentLimit: "",
				isRegistrationEnabled: "",
				isOptional: ""
			}

			const newData = [...termTableData, newRow];

			console.log(newRow);
			console.log(newData);
			setEditTermFormData(formData);
			setTermTableData(newData);
			setEditTermId(newRow.id);
		}
	}

	const onTermDeleteButton = (event:any, tableRowData:any) => {
		event.preventDefault();
		
		if (addNewTermFlag) {
			const dataToSend = {
				id: tableRowData.id
			}

			const roomTableDataCopy = [...termTableData];
			const index = termTableData.findIndex((td:any) => td.id === tableRowData.id);
			
			roomTableDataCopy.splice(index, 1);

			fetch("/printData", {
				method:"POST",
				cache: "no-cache",
				headers:{
					"content_type":"application/json",
				},
				body:JSON.stringify(dataToSend)
				}
			).then(res => res.json()).then(recData => {
				console.log(recData);
			});

			setTermTableData(roomTableDataCopy);
		}
	}

	const onTermSaveButton = (event:any) => {
		event.preventDefault();

		const dataToSend = {
			id: editTermId as any,
			name: editTermFormData.name,
			seats: editTermFormData.seats
		}

		const tableDataCopy = [...termTableData];
		const index = termTableData.findIndex((td:any) => td.id === editTermId);

		if (editTermId != "" && dataToSend.name != "" && dataToSend.seats != "") {
			console.log(dataToSend);

			fetch("/printData", {
				method:"POST",
				cache: "no-cache",
				headers:{
					"content_type":"application/json",
				},
				body:JSON.stringify(dataToSend)
				}
			).then(res => res.json()).then(recData => {
				console.log(recData);
			});

			tableDataCopy[index] = dataToSend;
		} else {
			tableDataCopy.splice(index, 1);
		}

		setTermTableData(tableDataCopy);
		setAddNewTermFlag(true);
		setEditTermId(null);
	}

	const handleTermFormChange = (event:any) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newRoomFormData = { ...editTermFormData };
		newRoomFormData[fieldName as keyof typeof editTermFormData] = fieldValue;
		
		setEditTermFormData(newRoomFormData);
	}
	// ROOMS TABLE LOGIC

	// COURSE TABLE LOGIC
	const onCourseEditButton = (event:any, tableData:any) => {
		onPopupEvent(event);
		setButtonCoursePopup(true);
		event.preventDefault();
		if (addNewCourseFlag) {
			setEditCourseId(tableData.id);
			
			const rowValue = {
				login:tableData.login,
				name:tableData.name,
				password:"",
				email:tableData.email
			}

			setEditCourseFormData(rowValue);
		}
	}

	const onCourseAddButton = (event:any) => {
		event.preventDefault();
		setAddNewCourseFlag(false);
		
		if (addNewCourseFlag) {

			const newRow = {
				id: nanoid(),
				login: "",
				name: "",
				password: "",
				email: "",
			}

			const formData = {
				login: "",
				name: "",
				password: "",
				email: "",
			}

			const newData = [...courseTableData, newRow];

			console.log(newRow);
			console.log(newData);
			setEditCourseFormData(formData);
			setCourseTableData(newData);
			setEditCourseId(newRow.id);
		}
	}

	const onCourseDeleteButton = (event:any, tableRowData:any) => {
		event.preventDefault();
		
		if (addNewCourseFlag) {
			const dataToSend = {
				id: tableRowData.id
			}

			const tableDataCopy = [...courseTableData];
			const index = courseTableData.findIndex((td:any) => td.id === tableRowData.id);
			
			tableDataCopy.splice(index, 1);

			fetch("/printData", {
				method:"POST",
				cache: "no-cache",
				headers:{
					"content_type":"application/json",
				},
				body:JSON.stringify(dataToSend)
				}
			).then(res => res.json()).then(recData => {
				console.log(recData);
			});

			setCourseTableData(tableDataCopy);
		}
	}

	const onCourseSaveButton = (event:any) => {
		event.preventDefault();

		const dataToSend = {
			id: editCourseId as any,
			login: editCourseFormData.login,
			name: editCourseFormData.name,
			password: editCourseFormData.password,
			email: editCourseFormData.email
		}

		const tableDataCopy = [...courseTableData];
		const index = courseTableData.findIndex((td:any) => td.id === editCourseId);

		if (editCourseId != "" && dataToSend.login != "" && dataToSend.name != "" && dataToSend.email != "") {
			console.log(dataToSend);

			fetch("/printData", {
				method:"POST",
				cache: "no-cache",
				headers:{
					"content_type":"application/json",
				},
				body:JSON.stringify(dataToSend)
				}
			).then(res => res.json()).then(recData => {
				console.log(recData);
			});

			tableDataCopy[index] = dataToSend;
		} else {
			tableDataCopy.splice(index, 1);
		}

		setCourseTableData(tableDataCopy);
		setAddNewCourseFlag(true);
		setEditCourseId(null);
	}

	const handleCourseFormChange = (event:any) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...editCourseFormData };
		newFormData[fieldName as keyof typeof editCourseFormData] = fieldValue;
		
		setEditCourseFormData(newFormData);
	}
	// COURSE TABLE LOGIC

	// REQUEST TABLE LOGIC
	const onAcceptClicked = (event:any, tableData:any) => {
		const dataToSend = {
			id:tableData.id
		}
		console.log("COURSE ", tableData.courseId, "HAS BEEN ACCEPTED");

		const tableDataCopy = [...requestTableData];
		const index = requestTableData.findIndex((td:any) => td.id === tableData.id);
		
		tableDataCopy.splice(index, 1);

		fetch("/printData", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content_type":"application/json",
			},
			body:JSON.stringify(dataToSend)
			}
		).then(res => res.json()).then(recData => {
			console.log(recData);
		});

		setRequestTableData(tableDataCopy);
	}

	const onDeclineClicked = (event:any, tableData:any) => {
		const dataToSend = {
			id:tableData.id
		}
		console.log("COURSE ", tableData.courseId, "HAS BEEN DECLINED");
		
		const tableDataCopy = [...requestTableData];
		const index = requestTableData.findIndex((td:any) => td.id === tableData.id);
		
		tableDataCopy.splice(index, 1);

		fetch("/printData", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content_type":"application/json",
			},
			body:JSON.stringify(dataToSend)
			}
		).then(res => res.json()).then(recData => {
			console.log(recData);
		});

		setRequestTableData(tableDataCopy);
	}
	// REQUEST TABLE LOGIC



	return (
	<div>	
		<div className="blurable">
			<PageHeader homePage='/home' useLogout={true}></PageHeader>
			<div id="adminPageMainContent">
				<div id="courseTable">
					<h1>Kurzy</h1>
					<form>
						<Table sx={{ boxShadow: 2}}	>
							<colgroup>
								<col style={{width:'10%'}}/>
								<col style={{width:'30%'}}/>
								<col style={{width:'20%'}}/>
								<col style={{width:'20%'}}/>
								<col style={{width:'20%'}}/>
							</colgroup>
							<TableHead>
								<TableRow>
									<TableCell>Zkratka</TableCell>
									<TableCell>Nazev</TableCell>
									<TableCell>Limit studentu</TableCell>
									<TableCell>Schvaleno</TableCell>
									<TableCell onClick={onCourseAddButton} style={{display:'flex', justifyContent:'center'}}><Button ><i style={{fontSize:20}} className='fa fa-plus-square'></i></Button></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{courseTableData.map((td:any) => (
									<Fragment>
										<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
												<TableCell sx={{ borderBottom: '0'}}>{td.shortName}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.name}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.studentLimit}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.isApproved}</TableCell>
												<TableCell sx={{ borderBottom: '0'}} style={{display:'flex'}}>
													<Button onClick={(event) => onCourseEditButton(event, td)}><i className='far fa-edit'></i></Button>
													<Button onClick={(event) => onCourseDeleteButton(event, td)}><i className='fas fa-eraser'></i></Button>
												</TableCell>
											</TableRow>
									</Fragment>
								))}
							</TableBody>
						</Table>
					</form>
				</div>

				<div id="termTable">
					<h1>Sprava terminu</h1>
					<form>
						<Table sx={{ boxShadow: 2}}	>
							<colgroup>
								<col style={{width:'30%'}}/>
								<col style={{width:'15%'}}/>
								<col style={{width:'15%'}}/>
								<col style={{width:'10%'}}/>
								<col style={{width:'10%'}}/>
								<col style={{width:'20%'}}/>
							</colgroup>
							<TableHead>
								<TableRow>
									<TableCell>Nazev</TableCell>
									<TableCell>Zacatek</TableCell>
									<TableCell>Konec</TableCell>
									<TableCell>Registrace</TableCell>
									<TableCell>Volitelne</TableCell>
									<TableCell onClick={onTermAddButton} style={{display:'flex', justifyContent:'center'}}><Button ><i style={{fontSize:20}} className='fa fa-plus-square'></i></Button></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{termTableData.map((td:any) => (
									<Fragment>
										<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
												<TableCell sx={{ borderBottom: '0'}}>{td.title}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.startDate}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.endDate}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.isRegistrationEnabled}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.isOptional}</TableCell>
												<TableCell sx={{ borderBottom: '0'}} style={{display:'flex'}}>
													<Button onClick={(event) => onTermEditButton(event, td)}><i className='far fa-edit'></i></Button>
													<Button onClick={(event) => onTermDeleteButton(event, td)}><i className='fas fa-eraser'></i></Button>
												</TableCell>
											</TableRow>
									</Fragment>
								))}
							</TableBody>
						</Table>
					</form>
				</div>
				
				<div id="courseRegistrationRequests">
					<h1>Ziadosti o registrace na kurzy</h1>
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
									<TableCell>Login</TableCell>
									<TableCell>Meno</TableCell>
									<TableCell>Skr. predmetu</TableCell>
									<TableCell>Predmet</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{requestTableData.map((td:any) => (
									<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
										<TableCell sx={{ borderBottom: '0'}}>{td.userLogin}</TableCell>
										<TableCell sx={{ borderBottom: '0'}}>{td.userName}</TableCell>
										<TableCell sx={{ borderBottom: '0'}}>{td.courseId}</TableCell>
										<TableCell sx={{ borderBottom: '0'}}>{td.courseName}</TableCell>
										<TableCell sx={{ borderBottom: '0'}} style={{display:'flex'}}>
											<Button onClick={(event) => onAcceptClicked(event, td)}><i className="fa-solid fa-thumbs-up"></i></Button>
											<Button onClick={(event) => onDeclineClicked(event, td)}><i className="fa-solid fa-thumbs-down"></i></Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</form>
				</div>
			</div>
			<PageFooter></PageFooter>
		</div>
		<div id="garantPopups">
			<div id="coursePopup">
				<Popup triggered={buttonCoursePopup} setTrigger={setButtonCoursePopup}>
					<div>
						<h1>Course</h1>
						<Fragment>
							<h3 onChange={handleCourseFormChange}>{editCourseFormData.shortName}</h3>
							<h3 onChange={handleCourseFormChange}>{editCourseFormData.name}</h3>
							<h3 onChange={handleCourseFormChange}>{editCourseFormData.description}</h3>
							<h3 onChange={handleCourseFormChange}>{editCourseFormData.studentLimit}</h3>
							<h3 onChange={handleCourseFormChange}>{editCourseFormData.isApproved}</h3>
							<Button onClick={onCourseSaveButton}>Ulozit</Button>
						</Fragment>
					</div>
				</Popup>
			</div>
			<div id="termPopup">
				<Popup triggered={buttonTermPopup} setTrigger={setButtonTermPopup}>
				<div>
						<h1>Course</h1>
						<Fragment>
							<h3 onChange={handleTermFormChange}>{editTermFormData.title}</h3>
							<h3 onChange={handleTermFormChange}>{editTermFormData.startDate}</h3>
							<h3 onChange={handleTermFormChange}>{editTermFormData.endDate}</h3>
							<h3 onChange={handleTermFormChange}>{editTermFormData.isRegistrationEnabled}</h3>
							<h3 onChange={handleTermFormChange}>{editTermFormData.isOptional}</h3>
							<Button onClick={onTermSaveButton}>Ulozit</Button>
						</Fragment>
					</div>
				</Popup>
			</div>
		</div>
	</div>
	);
}

export default GarantPage;
