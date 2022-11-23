import './LogoutButton.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LogoutButton() {

  let navigate = useNavigate();

  const logoutUser = (event:any) => {
		event.preventDefault();
		fetch("/user/logout", {
        method:"GET",
        cache: "no-cache",
        headers:{
          "content-type":"application/json"
        }
			}
		).then((response) => {
      console.log(response);
      if (response.ok) {
        navigate("/");
      }
    })
	}

  return (
    <Button onClick={logoutUser}>ODHLASIT</Button>
  );
}

export default LogoutButton;
