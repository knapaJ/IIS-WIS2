import { useEffect, useState } from 'react';
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import './SubjectRegistrationPage.css';
import data from '../mockData/mockCalendarData.json';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import '../App.css'

type Props = {
	apiPath:string
}

function SubjectRegistrationPage({apiPath}:Props) {
	const [calendarData, setCalendarData] = useState(data) as any;
	
	
	useEffect(() => {
	  fetch(apiPath + '/term/listupcoming').then(res => res.json()).then(recData => {
		setCalendarData(recData);
	  });
	}, []);
	
	return (
		<div>
			<PageHeader apiPath={apiPath}  homePage='/home' useLogout={true}></PageHeader>
			<div id="timeTablePage">
				<div className="timeTable">
					<FullCalendar
						initialView='timeGridWeek'
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay'
							}}
						themeSystem="Simplex"
						plugins={[dayGridPlugin, timeGridPlugin]}
						events={calendarData}
					/>
				</div>
			</div>
			<PageFooter></PageFooter>
		</div>
	);
}

export default SubjectRegistrationPage;
