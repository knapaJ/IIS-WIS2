import './GarantPage.css';
import { nanoid } from "nanoid";
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem, InputLabel} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { format } from 'date-fns';
import requestData from '../mockData/mockAdminPageRequestData.json';
import { Popup, onPopupEvent } from '../components/Popup';

function GarantPage() {
	// COURSE TABLE DATA
	const [courseTableData, setCourseTableData] = useState([{
		id: "",
		shortcut: "",
		name: "",
		description: "",
		credits: 0,
		studentLimit: 0,
		isApproved: false
	}]);
	const [addNewCourseFlag, setAddNewCourseFlag] = useState(true);

	const [editCourseId, setEditCourseId] = useState<string | null>(null);
	const [editCourseFormData, setEditCourseFormData] = useState({
		shortcut: "",
		name: "",
		credits: 0,
		description: "",
		studentLimit: 9999,
		isApproved: false
	});
	// COURSE TABLE DATA

	// TERMS TABLE DATA	
	const [termTableData, setTermTableData] = useState([{
		id: "",
		classname: "",
		description: "",
		startDate: new Date().toISOString(),
		endDate: new Date().toISOString(),
		registrationStartDate: new Date().toISOString(),
		registrationEndDate: new Date().toISOString(),
		maxMark: 0,
		studentLimit: 9999,
		students: 0,
		isRegistrationEnabled: true,
		isOptional: true
	}]);
	const [addNewTermFlag, setAddNewTermFlag] = useState(true);

	const [editTermId, setEditTermId] = useState<string | null>(null);
	const [editTermFormData, setEditTermFormData] = useState({
		classname: "",
		description: "",
		startDate: new Date().toISOString(),
		endDate: new Date().toISOString(),
		registrationStartDate: new Date().toISOString(),
		registrationEndDate: new Date().toISOString(),
		maxMark: 0,
		studentLimit: 9999,
		students: 0,
		isRegistrationEnabled: false,
		isOptional: false
	});
	// TERMS TABLE DATA

	// COURSE LECTURERS TABLE DATA

	const [addNewLecturerFlag, setAddNewLecturerFlag] = useState(false);


	const [lecturerTableData, setLecturerTableData] = useState([{
		id: "",
		login: "",
		name: "",
    	surname: ""
	}]);

	const [userTableData, setUserTableData] = useState([{
		id: "",
		login: "",
		name: "",
		surname: ""
	}]);

	const [addLecturerFormData, setAddLecturerFormData] = useState({
		id: "",
		login: ""
	});
	// COURSE LECTURERS TABLE DATA
	

	// REQEST TABLE DATA
	const [requestTableData, setRequestTableData] = useState(requestData);
	// REQEST TABLE DATA

	// POPUP OPEN/CLOSE STATES
	const [buttonCoursePopup, setButtonCoursePopup] = useState(false);
	const [buttonTermPopup, setButtonTermPopup] = useState(false);
	// POPUP OPEN/CLOSE STATES

	function fetchCourseData() {
		const url = "/course/list/garanted";
		fetch(url).then(res => res.json()).then(data => {
			setCourseTableData(data);
		});
	}

	function fetchLecturerData(courseid: string) {
		const url = "/course/list/lecturers/" + courseid;
		fetch(url).then(res => res.json()).then(data => {
			setLecturerTableData(data);
		});
	}

	function fetchUserData() {
		const url = "/user/list/all";
		fetch(url).then(res => res.json()).then(data => {
			setUserTableData(data);
		});
	}

	function fetchRegistrationData(courseid: string) {
		const url = "/user/list/all";
		fetch(url).then(res => res.json()).then(data => {
			setRequestTableData(data);
		});
	}

	function fetchTermData(courseid: string) {
		const url = "/term/teacher/list/bycourse/" + courseid;
		fetch(url).then(res => res.json()).then(data => {
			setTermTableData(data);
		});
	}

	useEffect(() => {
		fetchCourseData();
	}, [])

	// ROOMS TABLE LOGIC
	const onTermEditButton = (event:any, termTableData:any) => {
		onPopupEvent(event);
		setButtonTermPopup(true);
		event.preventDefault();
		if (addNewTermFlag) {
			console.log(termTableData.id)
			setEditTermId(termTableData.id);
			
			const rowValue = {
				classname: termTableData.classname,
				description: termTableData.description,
				startDate: termTableData.startDate,
				endDate: termTableData.endDate,
				registrationStartDate: termTableData.registrationStartDate,
				registrationEndDate: termTableData.registrationEndDate,
				maxMark: termTableData.maxMark,
				studentLimit: termTableData.studentLimit,
				students: termTableData.students,
				isRegistrationEnabled: termTableData.isRegistrationEnabled,
				isOptional: termTableData.isOptional
			}

			setEditTermFormData(rowValue);
		}
	}

	const onTermCloseButton = (event:any) => {
		if(!addNewTermFlag) {
			const tableDataCopy = [...termTableData];
			const index = termTableData.findIndex((td:any) => td.id === editTermId);

			tableDataCopy.splice(index, 1);
			setTermTableData(tableDataCopy);
			setAddNewTermFlag(true);
		}
		setEditTermId(null);
		onPopupEvent(event);
		setButtonTermPopup(false);
	}

	const onTermAddButton = (event:any) => {
		if(courseTableData.length > 0) {
			onPopupEvent(event);
			setButtonTermPopup(true);
			event.preventDefault();
			setAddNewTermFlag(false);
			
			if (addNewTermFlag) {

				const newRow = {
					id: nanoid(),
					classname: "",
					description: "",
					startDate: new Date().toISOString(),
					endDate: new Date().toISOString(),
					registrationStartDate: new Date().toISOString(),
					registrationEndDate: new Date().toISOString(),
					maxMark: 0,
					studentLimit: 9999,
					students: 0,
					isRegistrationEnabled: false,
					isOptional: false
				}

				const formData = {
					classname: "",
					description: "",
					startDate: new Date().toISOString(),
					endDate: new Date().toISOString(),
					registrationStartDate: new Date().toISOString(),
					registrationEndDate: new Date().toISOString(),
					maxMark: 0,
					studentLimit: 9999,
					students: 0,
					isRegistrationEnabled: false,
					isOptional: false
				}

				const newData = [...termTableData, newRow];

				console.log(newRow);
				console.log(newData);
				setEditTermFormData(formData);
				setTermTableData(newData);
				setEditTermId(newRow.id);
			}
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
			classname: editTermFormData.classname as any,
			description: editTermFormData.description,
			startDate: editTermFormData.startDate,
			endDate: editTermFormData.endDate,
			registrationStartDate: editTermFormData.registrationStartDate,
			registrationEndDate: editTermFormData.registrationEndDate,
			maxMark: editTermFormData.maxMark,
			studentLimit: editTermFormData.studentLimit,
			students: editTermFormData.students,
			isRegistrationEnabled: editTermFormData.isRegistrationEnabled,
			isOptional: editTermFormData.isOptional,
		}

		const tableDataCopy = [...termTableData];
		const index = termTableData.findIndex((td:any) => td.id === editTermId);

		if (editTermId != "" && dataToSend.classname != "") {
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
		onPopupEvent(event);
		setButtonTermPopup(false);
	}

	const handleTermFormChange = (event:any, fieldName:string) => {
		event.preventDefault();
		const fieldValue = event.target.value;
		if (fieldName.includes("Date"))
		{
			const newTermFormData = { ...editTermFormData, [fieldName]: new Date(fieldValue) };
			setEditTermFormData(newTermFormData);
		}
		else 
		{
			const newTermFormData = { ...editTermFormData, [fieldName]: fieldValue };
			setEditTermFormData(newTermFormData);
		}
		
	}

	// Checkboxes have their value in different parameter
	const handleTermCheckboxFormChange = (event:any, fieldName:string) => {
		event.preventDefault();

		const fieldValue = event.target.checked;
		const newTermFormData = { ...editTermFormData, [fieldName]: fieldValue };
		
		setEditTermFormData(newTermFormData);
	}
	// TERMS TABLE LOGIC

	// LECTURERS OF COURSE LOGIC
	const onLecturerAddButton = (event:any) => {
		event.preventDefault();

		const formData = {
			id: "",
			login: ""
		}

		fetchUserData()
		setAddNewLecturerFlag(true);
		setAddLecturerFormData(formData);
	}

	const onLecturerSaveButton = (event:any) => {

		event.preventDefault();

		const data = lecturerTableData.filter(
			(data) => 
				data.id === addLecturerFormData.id
			);
		
		if (data.length == 0 && addLecturerFormData.id != "") {

			const newLecturer = userTableData.filter(
				(data) => 
					data.id === addLecturerFormData.id
				)[0];

			const dataToSend = {
				id: addLecturerFormData.id,
				login: addLecturerFormData.login,
				name: newLecturer.name,
				surname: newLecturer.surname
			}
	
			const tableDataCopy = [...lecturerTableData];
			const index = lecturerTableData.length;
	
			tableDataCopy[index] = dataToSend;
			setLecturerTableData(tableDataCopy);
		}

		setAddNewLecturerFlag(false);
		setAddLecturerFormData({
			id: "",
			login: ""
		});
	}

	const onLecturerDeleteButton = (event:any, tableRowData:any) => {
		event.preventDefault();
		
		if (!addNewLecturerFlag) {
			const tableDataCopy = [...lecturerTableData];
			const index = lecturerTableData.findIndex((td:any) => td.id === tableRowData.id);
			
			tableDataCopy.splice(index, 1);

			setLecturerTableData(tableDataCopy);
		}
	}

	const handleLecturerFormChange = (event:any) => {
		event.preventDefault();

		const userid = event.target.value;
		const userlogin = userTableData.filter(
			(data) => 
				data.id === userid
			)[0].login;

		const newFormData = {
			id: userid,
			login: userlogin
		}
		
		setAddLecturerFormData(newFormData);
	}
	// LECTURERS OF COURSE LOGIC

	// COURSE TABLE LOGIC
	const onCourseEditButton = (event:any, courseTableData:any) => {
		onPopupEvent(event);
		setButtonCoursePopup(true);
		event.preventDefault();
		if (addNewCourseFlag) {
			setEditCourseId(courseTableData.id);
			
			const rowValue = {
				shortcut: courseTableData.shortcut,
				name: courseTableData.name,
				credits: courseTableData.credits,
				description: courseTableData.description,
				studentLimit: courseTableData.studentLimit,
				isApproved: courseTableData.isApproved
			}
			//fetch terms
			fetchTermData(courseTableData.id)
			fetchLecturerData(courseTableData.id)
			fetchRegistrationData(courseTableData.id)
			setLecturerTableData([]);
			setEditCourseFormData(rowValue);
		}
	}

	const onCourseCloseButton = (event:any) => {
		if(!addNewCourseFlag) {
			const tableDataCopy = [...courseTableData];
			const index = courseTableData.findIndex((td:any) => td.id === editCourseId);

			tableDataCopy.splice(index, 1);
			setCourseTableData(tableDataCopy);
			setAddNewCourseFlag(true);
		}
		setEditCourseId(null);
		onPopupEvent(event);
		setButtonCoursePopup(false);
	}

	const onCourseAddButton = (event:any) => {
		onPopupEvent(event);
		setButtonCoursePopup(true);
		event.preventDefault();
		setAddNewCourseFlag(false);
		
		if (addNewCourseFlag) {

			const newRow = {
				id: nanoid(),
				shortcut: "",
				name: "",
				credits: 0,
				description: "",
				studentLimit: 9999,
				isApproved: false
			}

			const formData = {
				shortcut: "",
				name: "",
				credits: 0,
				description: "",
				studentLimit: 9999,
				isApproved: false
			}

			const newData = [...courseTableData, newRow];

			console.log(newRow);
			console.log(newData);
			setTermTableData([]);
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
			shortcut: editCourseFormData.shortcut,
			name: editCourseFormData.name,
			credits: editCourseFormData.credits,
			description: editCourseFormData.description,
			studentLimit: editCourseFormData.studentLimit,
			isApproved: editCourseFormData.isApproved
		}

		const tableDataCopy = [...courseTableData];
		const index = courseTableData.findIndex((td:any) => td.id === editCourseId);

		if (editCourseId != "" && dataToSend.shortcut != "" && dataToSend.name != "") {
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
		onPopupEvent(event);
		setButtonCoursePopup(false);
	}

	const handleCourseFormChange = (event:any, fieldName:string) => {
		event.preventDefault();

		const fieldValue = event.target.value;

		const newFormData = { ...editCourseFormData, [fieldName]: fieldValue };
		
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
			<div id="garantPageMainContent">
				<div id="courseTable">
					<h1>Kurzy</h1>
					<form>
						<Table sx={{ boxShadow: 2}}	>
							<colgroup>
								<col style={{width:'10%'}}/>
								<col style={{width:'35%'}}/>
								<col style={{width:'20%'}}/>
								<col style={{width:'20%'}}/>
								<col style={{width:'10%'}}/>
								<col style={{width:'15%'}}/>
							</colgroup>
							<TableHead>
								<TableRow>
									<TableCell>Zkratka</TableCell>
									<TableCell>Nazev</TableCell>
									<TableCell>Pocet kreditu</TableCell>
									<TableCell>Limit studentu</TableCell>
									<TableCell>Schvaleno</TableCell>
									<TableCell onClick={onCourseAddButton} style={{display:'flex', justifyContent:'center'}}><Button ><i style={{fontSize:20}} className='fa fa-plus-square'></i></Button></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{courseTableData.map((td:any) => (
									<Fragment>
										<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
												<TableCell sx={{ borderBottom: '0'}}>{td.shortcut}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.name}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.credits}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>{td.studentLimit}</TableCell>
												<TableCell sx={{ borderBottom: '0'}}>
													<Checkbox
														disabled 
														checked={td.isApproved} 
													/>
												</TableCell>
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
				
				<div id="courseRegistrationRequests">
					<h1>Zadosti o registrace na kurzy</h1>
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
									<TableCell>Jmeno</TableCell>
									<TableCell>Zkr. predmetu</TableCell>
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
					<div className='popupScroll'>
						<h1>Kurz {editCourseFormData.shortcut}</h1>
						<Fragment>
							<div id="courseEditSpace">
								<TextField 
									value={editCourseFormData.shortcut}
									size="small" 
									placeholder='Zkratka' 
									id="standard-basic" 
									label="Zkratka" 
									variant="standard" 
									onChange={(event) => handleCourseFormChange(event, "shortcut")}
								/>
								<br/><br/>
								<TextField 
									value={editCourseFormData.name}
									size="medium" 
									placeholder='Nazev' 
									id="standard-basic" 
									label="Nazev" 
									variant="standard" 
									onChange={(event) => handleCourseFormChange(event, "name")}
								/>
								<br/><br/>
								<textarea 
									value={editCourseFormData.description}
									rows={9}
									placeholder = "Popis"
									onChange={(event) => handleCourseFormChange(event, "description")}
								/>
								<br/><br/>
								<TextField 
									value={editCourseFormData.studentLimit}
									size="small" 
									placeholder= "Limit studentu" 
									id="standard-basic" 
									label="Pocet studentu" 
									variant="standard" 
									onChange={(event) => handleCourseFormChange(event, "studentLimit")}
								/>
								<br/><br/>
								<TextField 
									value={editCourseFormData.credits}
									size="small" 
									placeholder= "Pocet kreditu" 
									id="standard-basic" 
									label="Pocet kreditu" 
									variant="standard" 
									onChange={(event) => handleCourseFormChange(event, "credits")}
								/>
								<br/><br/>
								<label>Schvaleno:</label>
								<Checkbox
									disabled 
									checked={editCourseFormData.isApproved}
								/>
								<br/>
								<Button onClick={onCourseSaveButton}>Ulozit</Button>
								<Button onClick={onCourseCloseButton}>Zarvit</Button>
							</div>
							<div id="lecturersOfCourse">
								<h2>Prednasejici</h2>
								<form>
									<Table sx={{ boxShadow: 2}}>
										<colgroup>
											<col style={{width:'30%'}}/>
											<col style={{width:'30%'}}/>
											<col style={{width:'30%'}}/>
											<col style={{width:'10%'}}/>
										</colgroup>
										<TableHead>
											<TableRow sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
												<TableCell>Login</TableCell>
												<TableCell>Jmeno</TableCell>
												<TableCell>Prijmeni</TableCell>
												<TableCell onClick={onLecturerAddButton} style={{display:'flex', justifyContent:'center'}}><Button ><i style={{fontSize:20}} className='fa fa-plus-square'></i></Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{lecturerTableData.map((td:any) => (
												<Fragment>
													{
													<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
														<TableCell sx={{ borderBottom: '0'}}>{td.login}</TableCell>
														<TableCell sx={{ borderBottom: '0'}}>{td.name}</TableCell>
														<TableCell sx={{ borderBottom: '0'}}>{td.surname}</TableCell>
														<TableCell sx={{ borderBottom: '0'}} style={{display:'flex'}}>
															<Button onClick={(event) => onLecturerDeleteButton(event, td)}><i className='fas fa-eraser'></i></Button>
														</TableCell>
													</TableRow>
													}
												</Fragment>
											))}
											{
												<Fragment>
													{
														(addNewLecturerFlag && userTableData.length > 0) ?
														<TableRow sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
															<TableCell>
																	<InputLabel id="lectureLogin">Login uzivatele</InputLabel>
																	<Select
																		labelId="lectureLogin"
																		name='login'
																		id="standard-basic"
																		value={addLecturerFormData.id}
																		label="Login uzivatele"
																		placeholder='xlogin00' 
																		onChange={(event) => handleLecturerFormChange(event)}
																	>
																		{
																		userTableData.map((td:any) => (
																			<MenuItem value={td.id}>{td.login}</MenuItem>
																		))
																		}
																	</Select>
															</TableCell>
															<TableCell  sx={{ borderBottom: '0'}} style={{textAlign: 'center'}}>
																<Button onClick={onLecturerSaveButton}>Ulozit</Button>
															</TableCell>
														</TableRow>
														:
														<></>
													}
												</Fragment>
											}
										</TableBody>
									</Table>
								</form>
							</div>
							<div id="termTable">
								<h2>Sprava terminu {editCourseFormData.shortcut}</h2>
								<form>
									<Table sx={{ boxShadow: 2}}	>
										<colgroup>
											<col style={{width:'25%'}}/>
											<col style={{width:'25%'}}/>
											<col style={{width:'25%'}}/>
											<col style={{width:'5%'}}/>
											<col style={{width:'5%'}}/>
											<col style={{width:'15%'}}/>
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
															<TableCell sx={{ borderBottom: '0'}}>{td.classname}</TableCell>
															<TableCell sx={{ borderBottom: '0'}}>{format(new Date(td.startDate), "dd/mm/yyyy")}</TableCell>
															<TableCell sx={{ borderBottom: '0'}}>{format(new Date(td.endDate), "dd/mm/yyyy")}</TableCell>
															<TableCell sx={{ borderBottom: '0'}}>
																<Checkbox
																	disabled 
																	checked={td.isRegistrationEnabled} 
																/>
															</TableCell>
															<TableCell sx={{ borderBottom: '0'}}>
																<Checkbox
																	disabled 
																	checked={td.isOptional} 
																/>
															</TableCell>
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
						</Fragment>
					</div>
				</Popup>
			</div>
			<div id="termPopup">
				<Popup triggered={buttonTermPopup} setTrigger={setButtonTermPopup}>
					<div className='popupScroll'>
						<h1>Termin {editCourseFormData.shortcut}</h1>
						<Fragment>
							<TextField 
								value={editTermFormData.classname}
								size="small" 
								placeholder='Nazev' 
								id="standard-basic" 
								label="Nazev" 
								variant="standard" 
								onChange={(event) => handleTermFormChange(event, "classname")}
							/>
							<br/><br/>
							<textarea 
								value={editTermFormData.description}
								rows={9}
								placeholder = "Popis"
								onChange={(event) => handleTermFormChange(event, "description")}
							/>
							<br/><br/>
							<InputLabel id="startdate">Zacatek</InputLabel>
							<TextField 
								value={(new Date(editTermFormData.startDate)).toISOString().substring(0, 16)}
								type="datetime-local"
								size="small" 
								placeholder='' 
								id="standard-basic" 
								variant="standard" 
								onChange={(event) => handleTermFormChange(event, "startDate")}
							/>
							<InputLabel id="enddate">Konec</InputLabel>
							<TextField 
								value={(new Date(editTermFormData.endDate)).toISOString().substring(0, 16)}
								type="datetime-local"
								size="small" 
								placeholder='' 
								id="standard-basic" 
								variant="standard" 
								onChange={(event) => handleTermFormChange(event, "endDate")}
							/>
							<br/><br/>
							<Fragment>
								{
									editTermFormData.isRegistrationEnabled? 
									<div>
										<InputLabel id="rstartdate">Zacatek registrace</InputLabel>
										<TextField 
											value={(new Date(editTermFormData.registrationStartDate)).toISOString().substring(0, 16)}
											type="datetime-local"
											size="small" 
											id="standard-basic" 
											variant="standard" 
											onChange={(event) => handleTermFormChange(event, "registrationStartDate")}
										/>
										<InputLabel id="renddate">Konec registrace</InputLabel>
										<TextField 
											value={(new Date(editTermFormData.registrationEndDate)).toISOString().substring(0, 16)}
											type="datetime-local"
											size="small" 
											id="standard-basic" 
											variant="standard" 
											onChange={(event) => handleTermFormChange(event, "registrationEndDate")}
										/>
										<br/><br/>
									</div>
									:
									<></>
								}
							</Fragment>
							<TextField
								value={editTermFormData.maxMark}
								size="small"
								placeholder='Max bodu'
								id="standard-basic"
								label="Max bodu"
								variant="standard"
								onChange={(event) => handleTermFormChange(event, "maxMark")}
							/>
							<br/><br/>
							<TextField
								value={editTermFormData.studentLimit}
								size="small"
								placeholder='Limit studentu'
								id="standard-basic"
								label="Limit studentu"
								variant="standard"
								onChange={(event) => handleTermFormChange(event, "studentLimit")}
							/>
							<br/><br/>
							<label>Registrace:</label>
							<Checkbox
								checked={editTermFormData.isRegistrationEnabled} 
								onChange={(event) => handleTermCheckboxFormChange(event, "isRegistrationEnabled")}
								inputProps={{ 'aria-label': 'Registration' }}
							/>
							<br/>
							<label>Volitelne:</label>
							<Checkbox
								checked={editTermFormData.isOptional}
								onChange={(event) => handleTermCheckboxFormChange(event, "isOptional")}
								inputProps={{ 'aria-label': 'Optional' }}
							/>
							<br/>
							<Button onClick={onTermSaveButton}>Ulozit</Button>
							<Button onClick={onTermCloseButton}>Zarvit</Button>
						</Fragment>
					</div>
				</Popup>
			</div>
		</div>
	</div>
	);
	
}

export default GarantPage;
