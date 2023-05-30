import React, { useEffect, useState } from 'react';
import './../../dashboard.css';
import { Button,Dropdown, Form, Modal } from 'react-bootstrap';;
import 'boxicons/css/boxicons.min.css';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useLogoutMutation } from '../../features/auth/login';
import { signOut } from '../../features/auth/auth-slice';
import inv from "../../assets/Asset 1.svg";
import profil from "../../assets/user.png";
import { setMarginLeft } from '../../features/uistate/mainui'
import SideBar from '../components/SideBarComponent';
import WelcomeComponent from '../components/WelComeComponent';

const Home = () => {
  const [status, setStatus] = useState(true);
  const [page, setPage] = useState('Dashboard');
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();


  const toggleSidebar = () => {
    setStatus(!status);
    const newMarginLeft = status ? "260px" : "90px";
    dispatch(setMarginLeft(newMarginLeft));
  };

  useEffect(() => {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach((item) => {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        allSideMenu.forEach((i) => {
          const li = i.parentElement;
          if (li) {
            li.classList.remove('active');
          }
        });
        const li = item.parentElement;
        if (li) {
          li.classList.add('active');
        }

        setPage(item.innerText);
      });
    });

    return () => {
      allSideMenu.forEach((item) => {
        item.removeEventListener('click', function (event) {
          event.preventDefault();
        });
      });
    };
  }, []);
  return (
    <div>
      <SideBar  active='dashboard' />
        <WelcomeComponent 
        page="welcome"
        title='Dashboard' 
        subItem={'statistics'} 
        downloadLink='#'
        isDownloadable={false} />
    </div>
  );
}

export default Home;