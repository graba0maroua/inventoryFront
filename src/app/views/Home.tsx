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
      {/* SIDEBAR */}
      <section id="sidebar" className={status ? '' : 'hide'}>
        <a href="#" className="brand">
          <img src={inv} alt="Logo" className="logo" onClick={toggleSidebar} />
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/unite">
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Unites</span>
            </a>
          </li>
          <li>
            <a href="/centres">
              <i className="bx bxs-message-dots"></i>
              <span className="text">Centres</span>
            </a>
          </li>
          <li>
            <a href="/infrastructure/localite">
              <i className="bx bxs-group"></i>
              <span className="text">Localites</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" className="logout" onClick={async () => {
              await logout("");
              dispatch(signOut());
            }}>
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      {/* SIDEBAR */}
      <section id="content">
        {/* NAVBAR */}
        <nav className="fixed-top">
          <i className="bx bx-menu" onClick={toggleSidebar}></i>
        
    
			<form action="#">
				<div className="form-input">
					<input type="search" placeholder="Search..."/>
					<button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
				</div>
			</form>
		<a href="#" className="profile">
				<img src={profil} alt='profile'/>
			</a>
      </nav>
        {/* NAVBAR */}
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Infrastructure</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">{page}</a>
                </li>
                <li><i className='bx bx-chevron-right'></i></li>
                <li>
                  <a className="active" href="#">Table de données</a>
                </li>
              </ul>
            </div>
            
            <a href="#" className="btn-download">
					<i className='bx bxs-download' ></i>
					<span className="text">Download PDF</span>
				</a>
          
          </div>
        </main>
      </section>
    </div>
  );
}

export default Home;