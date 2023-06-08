import { useEffect, useState } from "react";
import inv from "../../assets/Asset 1.svg";
import './../../dashboard.css';
import { useLogoutMutation } from "../../features/auth/login";
import { useAppDispatch, useAppSelector } from "../hooks";
import { signOut } from "../../features/auth/auth-slice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { MainUiState, setMarginLeft, setMarginRight } from '../../features/uistate/mainui'
import profil from "../../assets/user.png";
import WelcomeComponent from "./WelComeComponent";
import Fuse from 'fuse.js';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const searchOptions = [
  { label: 'unités' },
  { label: 'Localités' },
  { label: 'Centres' },
  { label: 'Centres' },
  { label: 'statistiques' },
  { label: 'graphique diagramme progres' },
  { label: 'performance' },
  { label: "Liste d'inventaires" },
  { label: 'Tableau de bord' },
  { label: 'Paramètres' },
  { label: "Plan d'inventaires" },
  { label: "profil" },
  { label: "Localités visitées" },
  { label: "mot de passe" },
  //  search options are here
];

export default function SideBar({ active }: { active: string }) {
  const [searchValue, setSearchValue] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const fuse = new Fuse(searchOptions, {
    keys: ['label'],
    includeScore: true,
    threshold: 0.4, // Adjust the threshold value to control the search sensitivity
  });
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [status, setStatus] = useState(true);
  const margin_left = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.marginLeft);
  const role = useAppSelector((state) => state.auth.role);
  const [activeButton, setActiveButton] = useState("");
  const toggleSidebar = () => {
    setStatus(!status);

    if (margin_left === "margin_left_reduced") {
      dispatch(setMarginLeft("margin_left"));
    } else {
      dispatch(setMarginLeft("margin_left_reduced"));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const searchResults = fuse.search(searchValue);
  
    if (searchResults.length > 0) {
      const topResult = searchResults[0].item.label;
  
      switch (topResult) {
        case 'unités':
          window.location.replace('/infrastructure/unite');
          break;
        case 'Centres':
          window.location.replace('/infrastructure/centre');
          break;
        case 'Localités':
          window.location.replace('/infrastructure/localite');
          break;
        case "Plan d'inventaires":
          {role === "Chef_centre" && ( window.location.replace('/plan') )};
          break;
        case "Liste d'inventaires":
          {role === "Chef_centre" && ( window.location.replace('/inventoryList-centre') )};
          {role === "Chef_unité" && ( window.location.replace('/inventoryList-unite') )};
          {role === "Chef_équipe" && ( window.location.replace('/inventoryList-equipe') )};
           break;
        case "Localités visitées":
          {role === "Chef_équipe" && ( window.location.replace('/inventoryList-equipe') )};
        
          break;
        case 'Paramètres':
          window.location.replace('/settings');
          break;
        case 'profil':
          window.location.replace('/settings');
          break;
        case 'mot de passe':
          window.location.replace('/settings');
          break;
        case 'Tableau de bord':
          window.location.replace('/home');
          break;
        case 'performance':
          window.location.replace('/home');
          break;
        case 'graphique diagramme progres':
          window.location.replace('/home');
          break;
        case 'statistiques':
          window.location.replace('/home');
          break;
        // Add more cases based on your search options
      }
    }
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
          {margin_left === "margin_left" && (<img src={inv} alt="Logo" className="logo" onClick={toggleSidebar} />)}
        </a>
        <ul className="side-menu top">
          <li className={active === "dashboard" ? "active" : ""}>
            <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
              window.location.replace('/home')
            }}>
              <i className="bx bxs-dashboard"></i>
              {margin_left === "margin_left" && (<span className="text">Tableau de bord</span>)}
            </button>
          </li>
          {role === "Chef_centre" && (
            <li className={active === "inventoryList-centre" ? "active" : ""}>
              <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
                window.location.replace('/inventoryList-centre')
              }}>
                <i className="bx bxs-barcode"></i>
                {margin_left === "margin_left"  && (<span className="text">Liste d'inventaires</span>)}
              </button>
            </li>
          )}
         
          {role === "Chef_unité" && (
            <li className={active === "inventoryList-unite" ? "active" : ""}>
              <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
                window.location.replace('/inventoryList-unite')
              }}>
                <i className="bx bxs-barcode"></i>
                {margin_left === "margin_left" && (<span className="text">Liste d'inventaires</span>)}
              </button>
            </li>
          )}
          {role === "Chef_équipe" && (
            <li className={active === "inventoryList-equipe" ? "active" : ""}>
              <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
                window.location.replace('/inventoryList-equipe')
              }}>
                <i className="bx bxs-barcode"></i>
                {margin_left === "margin_left" && (<span className="text">Liste d'inventaires</span>)}
              </button>
            </li>
          )}
          <li className={active === "infrastructure/unite" ? "active" : ""}>
            <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
              window.location.replace('/infrastructure/unite')
            }}>
              <i className="bx bxs-business"></i>
              {margin_left === "margin_left" && (<span className="text">Unités</span>)}
            </button>
          </li>
          <li className={active === "infrastructure/centre" ? "active" : ""}>
            <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
              window.location.replace('/infrastructure/centre')
            }}>
              <i className="bx bxs-buildings"></i>
              {margin_left === "margin_left" && (<span className="text">Centres</span>)}
            </button>
          </li>
          <li className={active === "infrastructure/localite" ? "active" : ""}>
            <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
              window.location.replace('/infrastructure/localite')
            }}>
              <i className="bx bxs-building"></i>
              {margin_left === "margin_left" && (<span className="text">Localités</span>)}
            </button>
          </li>
          {role === "Chef_centre" && (
            <li className={active === "plan" ? "active" : ""}>
              <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
                window.location.replace('/plan')
              }}>
              <i className='bx bx-list-plus'></i>
                {margin_left === "margin_left"  && (<span className="text">Plan d'inventaires</span>)}
              </button>
            </li>
          )}
          <li className={active === "profil" ? "active" : ""}>
            <button className="btn btn-light w-100 ms-1 text-start icon-button" onClick={(e) => {
              window.location.replace('/settings')
            }}>
              <i className="bx bxs-cog"></i>
              {margin_left === "margin_left" && (<span className="text">Paramètres </span>)}
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
              <span className="text">Déconnexion</span>
            </a>
          </li>
        </ul>
      </section>
      <section id="content">
        {/* NAVBAR */}
        <nav className="fixed-top">
          <i className="bx bx-menu" onClick={toggleSidebar}></i>

          <form action="#"onSubmit={handleSubmit}>
            <div className="form-input">
            <input
  type="search"
  placeholder="Rechercher..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>    {/*this is  search */}
              <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
            </div>
          </form>
          <a href="#" className="profile">
            <img src={profil} alt='profile' onClick={() => setShowLogout(!showLogout)}/>
            {showLogout && (
              <button className="btn btn-light logout-button" onClick={async () => {
                await logout("");
                dispatch(signOut());
              }}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
              </button>
            )}
          </a>
        </nav>
        {/* NAVBAR */}
      </section>
    </>
  )}