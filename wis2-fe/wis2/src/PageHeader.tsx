import logo from './logo.svg';
import './PageHeader.css';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

type Props = {
  homePage:string
}

function PageHeader({homePage}: Props) {
  return (
    <div id="header">
      <div id="headerLogo">
        <a href={homePage}>
          <p id="wisName">Wis</p>i.m
        </a>
        <div id="headerImage"></div>
      </div>
      
      <div id="headerLogOut">
        <LogoutButton></LogoutButton>
      </div>
		</div>
  );
}

export default PageHeader;
