import './AdminPage.css';
import { nanoid } from "nanoid";
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { Fragment, useState } from 'react';
import data from '../mockData/mockAdminUsertableData.json'
import roomData from '../mockData/mockAdminPageRoomsData.json'
import requestData from '../mockData/mockAdminPageRequestData.json'
import { table } from 'console';

function AdminPage() {
	// PEOPLE TABLE DATA
	const [tableData, setTableData] = useState(data);
	const [addNewFlag, setAddNewFlag] = useState(true);

	const [editId, setEditId] = useState<string | null>(null);
	const [editFormData, setEditFormData] = useState({
		login: "",
		name: "",
		password: "",
		email: "",
	});
	// PEOPLE TABLE DATA

	// ROOMS TABLE DATA	
	const [roomTableData, setRoomTableData] = useState(roomData);
	const [addNewRoomFlag, setAddNewRoomFlag] = useState(true);

	const [editRoomId, setEditRoomId] = useState<string | null>(null);
	const [editRoomFormData, setEditRoomFormData] = useState({
		name: "",
		seats: ""
	});
	// ROOMS TABLE DATA

	// REQ TABLE DATA
	const [requestTableData, setRequestTableData] = useState(requestData);
	// REQ TABLE DATA


	// ROOMS TABLE LOGIC
	const onRoomEditButton = (event:any, roomTableData:any) => {
		event.preventDefault();
		if (addNewRoomFlag) {
			console.log(roomTableData.id)
			setEditRoomId(roomTableData.id);
			
			const rowValue = {
				name:roomTableData.name,
				seats:roomTableData.seats
			}

			setEditRoomFormData(rowValue);
		}
	}

	const onAddRoomButton = (event:any) => {
		event.preventDefault();
		setAddNewRoomFlag(false);
		
		if (addNewRoomFlag) {

			const newRow = {
				id: nanoid(),
				name: "",
				seats: ""
			}

			const formData = {
				name: "",
				seats: ""
			}

			const newData = [...roomTableData, newRow];

			console.log(newRow);
			console.log(newData);
			setEditRoomFormData(formData);
			setRoomTableData(newData);
			setEditRoomId(newRow.id);
		}
	}

	const onRoomDeleteButton = (event:any, tableRowData:any) => {
		event.preventDefault();
		
		if (addNewRoomFlag) {
			const dataToSend = {
				id: tableRowData.id
			}

			const roomTableDataCopy = [...roomTableData];
			const index = roomTableData.findIndex((td:any) => td.id === tableRowData.id);
			
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

			setRoomTableData(roomTableDataCopy);
		}
	}

	const onRoomSaveButton = (event:any) => {
		event.preventDefault();

		const dataToSend = {
			id: editRoomId as any,
			name: editRoomFormData.name,
			seats: editRoomFormData.seats
		}

		const tableDataCopy = [...roomTableData];
		const index = roomTableData.findIndex((td:any) => td.id === editRoomId);

		if (editRoomId != "" && dataToSend.name != "" && dataToSend.seats != "") {
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

		setRoomTableData(tableDataCopy);
		setAddNewRoomFlag(true);
		setEditRoomId(null);
	}

	const handleRoomEditFormChange = (event:any) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newRoomFormData = { ...editRoomFormData };
		newRoomFormData[fieldName as keyof typeof editRoomFormData] = fieldValue;
		
		setEditRoomFormData(newRoomFormData);
	}
	// ROOMS TABLE LOGIC

	// PEOPLE TABLE LOGIC
	const onEditButton = (event:any, tableData:any) => {
		event.preventDefault();
		if (addNewFlag) {
			setEditId(tableData.id);
			
			const rowValue = {
				login:tableData.login,
				name:tableData.name,
				password:"",
				email:tableData.email
			}

			setEditFormData(rowValue);
		}
	}

	const onAddButton = (event:any) => {
		event.preventDefault();
		setAddNewFlag(false);
		
		if (addNewFlag) {

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

			const newData = [...tableData, newRow];

			console.log(newRow);
			console.log(newData);
			setEditFormData(formData);
			setTableData(newData);
			setEditId(newRow.id);
		}
	}

	const onDeleteButton = (event:any, tableRowData:any) => {
		event.preventDefault();
		
		if (addNewFlag) {
			const dataToSend = {
				id: tableRowData.id
			}

			const tableDataCopy = [...tableData];
			const index = tableData.findIndex((td:any) => td.id === tableRowData.id);
			
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

			setTableData(tableDataCopy);
		}
	}

	const onSaveButton = (event:any) => {
		event.preventDefault();

		const dataToSend = {
			id: editId as any,
			login: editFormData.login,
			name: editFormData.name,
			password: editFormData.password,
			email: editFormData.email
		}

		const tableDataCopy = [...tableData];
		const index = tableData.findIndex((td:any) => td.id === editId);

		if (editId != "" && dataToSend.login != "" && dataToSend.name != "" && dataToSend.email != "") {
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

		setTableData(tableDataCopy);
		setAddNewFlag(true);
		setEditId(null);
	}

	const handleEditFormChange = (event:any) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName as keyof typeof editFormData] = fieldValue;
		
		setEditFormData(newFormData);
	}
	// PEOPLE TABLE LOGIC

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
		<PageHeader homePage='/'></PageHeader>
		<div id="adminPageMainContent">
			<div>
				<h1>Prehlad uzivatelov</h1>
				<form>
					<Table sx={{ boxShadow: 2}}	>
						<colgroup>
							<col style={{width:'20%'}}/>
							<col style={{width:'20%'}}/>
							<col style={{width:'20%'}}/>
							<col style={{width:'20%'}}/>
							<col style={{width:'20%'}}/>
						</colgroup>
						<TableHead>
							<TableRow>
								<TableCell>Login</TableCell>
								<TableCell>Meno</TableCell>
								<TableCell>Heslo</TableCell>
								<TableCell>E-mail</TableCell>
								<TableCell onClick={onAddButton} style={{display:'flex', justifyContent:'center'}}><Button ><i style={{fontSize:20}} className='fa fa-plus-square'></i></Button></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableData.map((td:any) => (
								<Fragment>
									{
									editId != td.id ?
										<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
											<TableCell sx={{ borderBottom: '0'}}>{td.login}</TableCell>
											<TableCell sx={{ borderBottom: '0'}}>{td.name}</TableCell>
											<TableCell sx={{ borderBottom: '0'}}>••••</TableCell>
											<TableCell sx={{ borderBottom: '0'}}>{td.email}</TableCell>
											<TableCell sx={{ borderBottom: '0'}} style={{display:'flex'}}>
												<Button onClick={(event) => onEditButton(event, td)}><i className='far fa-edit'></i></Button>
												<Button onClick={(event) => onDeleteButton(event, td)}><i className='fas fa-eraser'></i></Button>
											</TableCell>
										</TableRow>
									: 
										<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
											<TableCell>
												<TextField value={editFormData.login} name='login' size="small" placeholder='' id="standard-basic" label="Login" variant="standard" onChange={handleEditFormChange}/>
											</TableCell>
											<TableCell>
												<TextField value={editFormData.name} name='name' size="small" id="standard-basic" label="Meno" variant="standard" onChange={handleEditFormChange}/>
											</TableCell>
											<TableCell>
												<TextField type="password" value={editFormData.password} name='password' size="small" id="standard-basic" label="Heslo" variant="standard" onChange={handleEditFormChange}/>
											</TableCell>
											<TableCell>
												<TextField value={editFormData.email} name='email' size="small" id="standard-basic" label="E-mail" variant="standard" onChange={handleEditFormChange}/>
											</TableCell>
											<TableCell  sx={{ borderBottom: '0'}} style={{display:'flex', justifyContent: 'center'}}>
												<Button onClick={onSaveButton}>Ulozit</Button>
											</TableCell>
										</TableRow>
									}
								</Fragment>
							))}
						</TableBody>
					</Table>
				</form>
			</div>

			<div>
				<h1>Sprava miestnosti</h1>
				<form>
					<Table sx={{ boxShadow: 2}}	>
						<colgroup>
							<col style={{width:'40%'}}/>
							<col style={{width:'40%'}}/>
							<col style={{width:'20%'}}/>
						</colgroup>
						<TableHead>
							<TableRow>
								<TableCell>Miestnost</TableCell>
								<TableCell>Pocet miest</TableCell>
								<TableCell onClick={onAddRoomButton} style={{display:'flex', justifyContent:'center'}}><Button ><i style={{fontSize:20}} className='fa fa-plus-square'></i></Button></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{roomTableData.map((td:any) => (
								<Fragment>
									{
									editRoomId != td.id ?
										<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
											<TableCell sx={{ borderBottom: '0'}}>{td.name}</TableCell>
											<TableCell sx={{ borderBottom: '0'}}>{td.seats}</TableCell>
											<TableCell sx={{ borderBottom: '0'}} style={{display:'flex'}}>
												<Button onClick={(event) => onRoomEditButton(event, td)}><i className='far fa-edit'></i></Button>
												<Button onClick={(event) => onRoomDeleteButton(event, td)}><i className='fas fa-eraser'></i></Button>
											</TableCell>
										</TableRow>
									: 
										<TableRow key={td.id} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
											<TableCell>
												<TextField value={editRoomFormData.name} name='name' size="small" placeholder='' id="standard-basic" label="Nazov" variant="standard" onChange={handleRoomEditFormChange}/>
											</TableCell>
											<TableCell>
												<TextField value={editRoomFormData.seats} name='seats' size="small" id="standard-basic" label="Pocet miest" variant="standard" onChange={handleRoomEditFormChange}/>
											</TableCell>
											<TableCell  sx={{ borderBottom: '0'}} style={{display:'flex', justifyContent: 'center'}}>
												<Button onClick={onRoomSaveButton}>Ulozit</Button>
											</TableCell>
										</TableRow>
									}
								</Fragment>
							))}
						</TableBody>
					</Table>
				</form>
			</div>
			
			<div>
				<h1>Ziadosti o kurz	</h1>
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
	);
}

export default AdminPage;
