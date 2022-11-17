import './UserProfile.css';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { useEffect, useState } from 'react';


function EmployeePage() {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  useEffect(() => {console.log("oldPwd:", oldPwd)}, [oldPwd])
  useEffect(() => {console.log("newPwd:", newPwd)}, [newPwd])

  const onChangeOldPwd = (event:any) => {
    event.preventDefault();
    var value = event.target.value;

    setOldPwd(value);
  }

  const onChangeNewPwd = (event:any) => {
    event.preventDefault();
    var value = event.target.value;

    setNewPwd(value);
  }

  const sendPwd = (event:any) => {
    event.preventDefault();
    console.log(oldPwd);
    console.log(newPwd);

    fetch("/setNewPwd", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content_type":"application/json",
			},
			body:JSON.stringify({oldPwd, newPwd})
			}
		)
  }

  return (<div>
    <PageHeader homePage='/home' useLogout={true}></PageHeader>
      <div id="userProfileMainContent">
      <form>
        <div className="form-group">
          <label htmlFor="oldPassword">Stare heslo</label>
          <input onChange={(event) => onChangeOldPwd(event)} type="password" className="form-control" id="oldPassword" placeholder="Old password"/>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nove heslo</label>
          <input onChange={(event) => onChangeNewPwd(event)} type="password" className="form-control" id="newPassword" placeholder="New password"/>
        </div>
        <button type="submit" onClick={sendPwd} className="btn btn-primary">Submit</button>
      </form>
  
      </div>
    <PageFooter></PageFooter>
  </div>
  );
}

export default EmployeePage;
