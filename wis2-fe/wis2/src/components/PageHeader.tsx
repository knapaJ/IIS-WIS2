import logo from './logo.svg';
import './PageHeader.css';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

type Props = {
  homePage:string
  useLogout:boolean
}

function PageHeader({homePage, useLogout}: Props) {
  return (
    <div id="header">
      <div id="headerLogo">
        <a href={homePage}>
          <p id="wisName">Wis</p>i.m
        </a>
        <div id="headerImage"></div>
      </div>
      
      {
      useLogout ?
        <div id="headerLogOut">
          <LogoutButton></LogoutButton>
        </div> 
        :
        <div></div>
      }
		</div>
  );
}

export default PageHeader;
