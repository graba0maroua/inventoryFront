import { useEffect, useState } from "react";
import SideBar from "../../components/SideBarComponent";
import WelcomeComponent from "../../components/WelComeComponent";
import ChartComponent from "../Chart";
import PieChart from "../PieChartUnite";
import PieChartCentre from "../PieChartCentre";
import { useAppSelector } from "../../hooks";
import PieChartEquipe from "../PieChartEquipe";
import PlanPage from "../PlanInventaire/PlanPage";
import AdminPage from "../Admin/AdminPage";


const DashboardAdmin = () => {
   
    return (
        
        <div>
        <AdminPage></AdminPage>
      </div>
    );
}

export default DashboardAdmin