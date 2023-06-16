import { useEffect, useState } from "react";
import SideBar from "../../components/SideBarComponent";
import WelcomeComponent from "../../components/WelComeComponent";
import ChartComponent from "../Chart";
import { useAppSelector } from "../../hooks";
import PieChartEquipe from "../PieChartEquipe";
import { MainUiState } from '../../../features/uistate/mainui';
import { useFetchProgressChartQuery } from '../../../features/Charts/PieChart';
const DashboardChefEquipe = () => {
    const [page, setPage] = useState('Dashboard');
    const [status, setStatus] = useState(true);
    const role = useAppSelector((state) => state.auth.role);
    const { data, isLoading, isError } = useFetchProgressChartQuery();
    const margin_left = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.marginLeft);
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
          subItem={'statistiques'} 
          downloadLink='#'
          isDownloadable={false} 
          onClickCustom={null}
          />
         <main>
          <ul className={`box-info  ${margin_left}`} >
          <li>
            <i className='bx bx-list-ol'></i>
            <span className="text">
                  <h3>{data?.total_count}</h3>
                  <p style={{  fontFamily: 'lato' ,fontWeight :600  ,}}>Nombre total d'inventaire</p>
                  </span>
          </li>
          <li>
            <i className='bx bx-trending-up'></i>
            <span className="text">
              <h3>{data?.scanned_count}</h3>
              <p style={{  fontFamily: 'lato' ,fontWeight :600  ,}}>Nombre d'inventaire Scanné</p>
            </span>
          </li>
          <li>
            <i className='bx bx-trending-down'></i>
            <span className="text">
              <h3>{data?.not_scanned_count}</h3>
              <p style={{  fontFamily: 'lato' ,fontWeight :600  ,}}>Nombre d'inventaire Non Scanné</p>
            </span>
          </li>
        </ul>
      </main>
      <div className="cards-container">
  <div className={`card-table ${margin_left} card me-2 p-2 shadow`}>
  <h3 className="card-title-lineChart">Graphique linéaire représentant l'inventaire scanné et non scanné par mois</h3>
    <ChartComponent />
  </div>
  <div className="card-table card me-5 p-3 shadow" >
  <h3 className="card-title">Diagramme circulaire représentant l'inventaire scanné par chaque membre d'équipe</h3>
    <PieChartEquipe/>
  </div>
</div>
</div>
    );
}

export default DashboardChefEquipe