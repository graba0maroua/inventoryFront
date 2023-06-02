import { useEffect, useState } from "react";
import SideBar from "../../components/SideBarComponent";
import WelcomeComponent from "../../components/WelComeComponent";
import ChartComponent from "../Chart";
import PieChart from "../PieChartUnite";
import PieChartCentre from "../PieChartCentre";
import { useAppSelector } from "../../hooks";

const  DashboardChefCentre = () => {
  const [page, setPage] = useState('Dashboard');
    const [status, setStatus] = useState(true);
    const role = useAppSelector((state) => state.auth.role);

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
    
            // setPage(item.innerText);
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
          isDownloadable={false} 
          onClickCustom={null}
          />
          <main>
        <ul className="box-info">
          <li>
            <i className='bx bx-list-ol'></i>
            <span className="text">
                  <h3>14281</h3>
                  <p>Total Inventaire</p>
                  </span>
          </li>
          <li>
            <i className='bx bx-trending-up'></i>
            <span className="text">
              <h3>2089</h3>
              <p>Inventaire Scannés</p>
            </span>
          </li>
          <li>
            <i className='bx bx-trending-down'></i>
            <span className="text">
              <h3>12192</h3>
              <p>Inventaire Non Scannés</p>
            </span>
          </li>
        </ul>
      </main>
        <div className="table-container  margin_left card me-5 p-3 shadow">
  <ChartComponent/>
    </div>
    <div className="table-container  margin_left card me-5 p-3 shadow">
       <PieChartCentre/>
        </div>
      </div>
    );
}
export default DashboardChefCentre