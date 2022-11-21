import './LoginPage.css';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LinkButton from '../components/LinkButton';

function LoginPage() {
	const [login, setLogin] = useState("");
  	const [password, setPwd] = useState("");

	const navigate = useNavigate();
	
	const onChangeLogin = (event:any) => {
		event.preventDefault();
		var value = event.target.value;

		setLogin(value);
	}

	const onChangePwd = (event:any) => {
		event.preventDefault();
		var value = event.target.value;

		setPwd(value);
	}

  	const sendPwd = (event:any) => {
		event.preventDefault();
		console.log('pwd:', password);
		console.log('login:', login);

		fetch("/user/login", {
			method:"POST",
			cache: "no-cache",
			headers:{
				"content_type":"application/json",
			},
			body:JSON.stringify({login, password})
			}
		).then(res => res.json()).then(recData => {
			
			console.log("recData", recData);
			if (recData.status == "OK") {
				navigate("/home", {replace:true})
			} else {
				alert("Zle heslo alebo meno :(");
			}

		});
	}

  return (
	<div>
		<PageHeader homePage='/home' useLogout={false}></PageHeader>
		<div id="loginPageMainContent">
			<form>
				<div className="form-group">
					<label htmlFor="login">Login</label>
					<input onChange={(event) => onChangeLogin(event)} type="text" className="form-control" id="login" placeholder="login"/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Heslo</label>
					<input onChange={(event) => onChangePwd(event)} type="password" className="form-control" id="password" placeholder="heslo"/>
				</div>
				<button type="submit" onClick={sendPwd} className="btn btn-primary">Potvrdit</button>
			</form>
            <LinkButton linkText='Nemam ucet 😢' linkValue='/noAccount'></LinkButton>
		</div>
		<PageFooter></PageFooter>
	</div>
  );
}

export default LoginPage;
