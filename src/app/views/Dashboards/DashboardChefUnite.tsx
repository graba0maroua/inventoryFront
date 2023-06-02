import { useEffect, useState } from "react";
import SideBar from "../../components/SideBarComponent";
import WelcomeComponent from "../../components/WelComeComponent";
import ChartComponent from "../Chart";
import PieChartUnite from "../PieChartUnite";
import { useAppSelector } from "../../hooks";
import { useFetchProgressChartQuery } from '../../../features/Charts/PieChart';
import './../.././../dashboard.css';
import { MainUiState } from '../../../features/uistate/mainui';
const DashboardChefUnite = () => {
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
      <SideBar active='dashboard' />
      <WelcomeComponent
        page="welcome"
        title='Dashboard'
        subItem={'statistics'}
        downloadLink='#'
        isDownloadable={false}
        onClickCustom={null}
      />
      <main>
        <ul className={`box-info  ${margin_left}`} >
          <li>
            <i className='bx bx-list-ol '></i>
            {isLoading ? (
              <span className="text">
                <h3>Loading...</h3>
              </span>
            ) : isError ? (
              <span className="text">
                <h3>Error</h3>
              </span>
            ) : (
              data ? data.map((item) => (
                <span className="text" key={item.total_count}>
                  <h3>{item.total_count}</h3>
                  <p>Total Inventaire</p>
                </span>
              )) : null
            )}
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
      <div className="cards-container">
  <div className={`card-table ${margin_left} card me-2 p-2 shadow`}>
    <ChartComponent />
  </div>
  <div className="card-table card me-5 p-3 shadow">
    <PieChartUnite />
  </div>
</div>
</div>
  
  );
}

export default DashboardChefUnite;