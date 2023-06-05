import { useEffect, useState } from "react";
import SideBar from "../../components/SideBarComponent";
import WelcomeComponent from "../../components/WelComeComponent";
import ChartComponent from "../Chart";
import PieChart from "../PieChartUnite";
import PieChartCentre from "../PieChartCentre";
import { useAppSelector } from "../../hooks";
import PieChartEquipe from "../PieChartEquipe";


const DashboardAdmin = () => {
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
          page="performance"
          title='Tableau de bord' 
          subItem={'statistics'} 
          downloadLink='#'
          isDownloadable={false} 
          onClickCustom={null}
          />
        
      </div>
    );
}

export default DashboardAdmin