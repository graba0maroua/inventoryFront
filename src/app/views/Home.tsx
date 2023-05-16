import React, { useEffect, useState } from 'react';
import './../../dashboard.css';
import 'boxicons/css/boxicons.min.css';
import { useAppDispatch } from '../hooks';
import { useLogoutMutation } from '../../features/auth/login';
import { signOut } from '../../features/auth/auth-slice';

const Home = () => {
  const [status, setStatus] = useState(false);
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation();
  

  const toggleSidebar = () => {
    setStatus(!status);
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
          <i className="bx bxs-smile"></i>
          <span className="text">Inventory Manager</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Liste inventaire</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Unites</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-message-dots"></i>
              <span className="text">Centres</span>
            </a>
          </li>
          <li>
            <a href="#">
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
      {/* SIDEBAR
*/}{/* CONTENT */}
  <section id="content">
    {/* NAVBAR */}
    <nav>
      <i className="bx bx-menu" onClick={toggleSidebar}></i>
      <a href="#" className="nav-link">Categories</a>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn"><i className="bx bx-search"></i></button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className="switch-mode"></label>
      <a href="#" className="notification">
        <i className="bx bxs-bell"></i>
        <span className="num">8</span>
      </a>
      <a href="#" className="profile">
        <img src="img/people.png" alt="Profile" />
      </a>
    </nav>
    {/* NAVBAR */}
    
  </section>
  {/* CONTENT */}
</div>
);
}

export default Home;