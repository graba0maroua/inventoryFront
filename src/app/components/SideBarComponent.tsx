import { useEffect, useState } from "react";
import inv from "../../assets/Asset 1.svg";
import './../../dashboard.css';
import { useLogoutMutation } from "../../features/auth/login";
import { useAppDispatch } from "../hooks";
import { signOut } from "../../features/auth/auth-slice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { setMarginLeft } from '../../features/uistate/mainui'
import profil from "../../assets/user.png";
import WelcomeComponent from "./WelComeComponent";

export default function SideBar({active }:{active:string}) {
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
  const [status, setStatus] = useState(true);


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
    <>
    <section id="sidebar" className={status ? '' : 'hide'}>
        <a href="#" className="brand">
          <img src={inv} alt="Logo" className="logo" onClick={toggleSidebar}/>
        </a>
        <ul className="side-menu top">
          <li className={active == "dashboard" ? "active" :""}>
          <button  className="btn btn-light w-100 ms-1 text-start"  onClick={(e)=>{
               window.location.replace('/home') 
          }}>
           
           
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
           </button>

          </li>
          <li className={active == "inventoryList-centre" ? "active" :""}>
           
          <button  className="btn btn-light w-100 ms-1 text-start"  onClick={(e)=>{
               window.location.replace('/inventoryList-centre') 

            }}>
           
            <i className="bx bxs-barcode"></i>
              <span className="text">Liste d'inventaireC </span>
            </button>
          </li>
          <li className={active == "inventoryList-unite" ? "active" :""}>
           
          <button  className="btn btn-light w-100 ms-1 text-start"  onClick={(e)=>{
               window.location.replace('/inventoryList-unite') 

            }}>
           
            <i className="bx bxs-barcode"></i>
              <span className="text">Liste d'inventaireU </span>
            </button>
          </li>
          <li className={active == "inventoryList-equipe" ? "active" :""}>
           
          <button  className="btn btn-light w-100 ms-1 text-start"  onClick={(e)=>{
               window.location.replace('/inventoryList-equipe') 

            }}>
           
            <i className="bx bxs-barcode"></i>
              <span className="text">Liste d'inventaireE</span>
            </button>
          </li>
          <li className={active == "infrastructure/unite" ? "active" :""}>
          <button  className="btn btn-light w-100 ms-1 text-start"  onClick={(e)=>{
               window.location.replace('/infrastructure/unite') 

            }}>
              <i className="bx bxs-business"></i>
              <span className="text">Unites</span>
            </button>
          </li>
          <li className={active == "infrastructure/centre" ? "active" :""}>
          <button  className="btn btn-light w-100 ms-1 text-start"  onClick={(e)=>{
             window.location.replace('/infrastructure/centre') 

            }}>
            <i className="bx bxs-buildings"></i>
            
              <span className="text">Centres</span>
            </button>
          </li>
          <li className={active == "infrastructure/localite" ? "active" :""}>
            <button  className="btn btn-light w-100 ms-1 text-start"  onClick={(e)=>{
             window.location.replace('/infrastructure/localite') 

            }}>
              <i className="bx bxs-building"></i>
              <span className="text">Localites</span>
            </button>
          </li>
          <li className={active == "settings" ? "active" :""}>
          <button  className="btn btn-light w-100 ms-1 text-start"  onClick={(e)=>{
             window.location.replace('/settings') 

            }}>
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </button>
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
      </section>
    </>)
}