import logo from './logo.svg';
import './LogoutButton.css';
import { Link } from 'react-router-dom';

type Props = {
}

function LogoutButton({}: Props) {
  return (
    <Link to="/home">ODHLASIT ☕</Link>
  );
}

export default LogoutButton;
