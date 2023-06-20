import './../../dashboard.css';
import 'boxicons/css/boxicons.min.css';
import DashboardAdmin from './Dashboards/DashboardAdmin';
import { useAppSelector } from '../hooks';
import DashboardChefUnite from './Dashboards/DashboardChefUnite';
import DashboardChefCentre from './Dashboards/DashboardChefCentre';
import DashboardChefEquipe from './Dashboards/DashboardChefEquipe';
import AdminPage from './Admin/AdminPage';

const Home = () => {
  const role = useAppSelector((state) => state.auth.role);
 console.log(role);

  return (
    <div>
     
      {role == 'Chef_unité' &&  <DashboardChefUnite />} 
       {role == 'Chef_centre' &&  <DashboardChefCentre />}
       {role == 'Chef_équipe' &&  <DashboardChefEquipe />}
      {role == 'Admin' &&  <DashboardAdmin />}
      </div>
  );
}

export default Home;