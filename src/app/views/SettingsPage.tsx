import React, { useState, useEffect } from 'react';
import { useUpdatePasswordMutation } from "../../features/auth/login";
import Avatar, { genConfig } from 'react-nice-avatar';
import avatar from "../../assets/avatar1.png"
import SideBar from '../components/SideBarComponent';
import { useFetchUserQuery } from "../../features/auth/user"
import WelcomeComponent from '../components/WelComeComponent';
import { MainUiState, setLoadingState, setShowUrlModal, setUrl } from '../../features/uistate/mainui';
import { useAppDispatch, useAppSelector } from '../hooks';
import SnackBarComponent from "../components/SnackBarComponent"
import { hideSnackBar, showSnackBar } from "../../features/snack_bar/snack_bar"
import { FaBuilding, FaCheck, FaEnvelope, FaListUl } from "react-icons/fa"
import { BsCreditCard2FrontFill, BsFillFileEarmarkPersonFill, BsFillPersonLinesFill, BsPersonBadge, BsPersonFillCheck, BsPersonWorkspace, BsXCircleFill } from "react-icons/bs"
import { FcInspection ,FcPodiumWithSpeaker} from "react-icons/fc";
import { Form } from 'react-router-dom';


const settingsPage: React.FC = () => {
  const margin_left = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.marginLeft);
  const config = genConfig();
  const { data } = useFetchUserQuery();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [updatePassword] = useUpdatePasswordMutation();
  const dispatch = useAppDispatch();
  console.log(data);

  useEffect(() => {
    if (isSuccess) {
      setOldPassword('');
      setNewPassword('');
    }
  }, [isSuccess]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePassword({ oldpassword: oldPassword, password: newPassword })
      .unwrap()
      .then(() => {
        // Password update success
        setIsSuccess(true);
        setIsError(false);
        dispatch(showSnackBar({
          bgColor:"bg-success",
          message:"Mot de passe modifié avec succès",
          icon:FaCheck
        }));
        setTimeout(()=>{
          dispatch(hideSnackBar());
          setOldPassword('');
          setNewPassword('');
        }, 3500);
      })
      .catch((error) => {
        // Password update error
        dispatch(showSnackBar({
          bgColor:"bg-danger",
          message:"Erreur Ancien mot de passe incorrect ",
          icon:BsXCircleFill
        }));
        setTimeout(()=>{
          dispatch(hideSnackBar());
        }, 3500);
        setIsSuccess(false);
        setIsError(true);
        console.log(error);
      });
  };

  return (
    <main>
      <SideBar active="Paramètres" />
      <WelcomeComponent
        page="Profil"
        title="Paramètres"
        subItem={`${data?.name}`}
        downloadLink="#"
        isDownloadable={false}
        onClickCustom={null}
      />
      <div className={`containerr ${margin_left}`}>
      <div className="table-data">
				<div className="info">
					<div className="head">
						<h3>Compte</h3>
					</div>
            <img src={avatar} className="image" alt="" /> 
            <strong>Matricule : {data?.matricule}</strong>
            crée le : {data?.created_at}
                <div className='UnderCompte'> <hr/><strong>Modifier mot de passe</strong> 
                  <form  onSubmit={handleFormSubmit}>
                    {/* <label htmlFor="oldPassword">Ancien mot de passe</label> */}
                    <input
                      type="password"
                      className="form-control"
                      id="oldPassword"
                      placeholder='Ancien mot de passe ...'
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {/* <label htmlFor="newPassword">Nouveau mot de passe </label> */}
                    <input
                      type="password"
                      className="form-control"
                      placeholder='Nouveau mot de passe ...'
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      Modifier mot de passe
                    </button>
                  </form>
                  </div>
				</div>
        <div className="order">
					<div className="head">
						<h3>Informations personelles</h3>
            <FaListUl></FaListUl>
					</div>
          <div className="info">
          <ul className="info-list">
						<li className="not-blue">
            <span><strong>Nom complet : </strong>{data?.name} </span>
						<BsFillPersonLinesFill></BsFillPersonLinesFill>
						</li>
            <li className="blue">
            <span ><strong>Role :     </strong>   <span>   {data?.role} </span></span>
						<BsPersonWorkspace></BsPersonWorkspace>
						</li>
						<li className="not-blue">
            <span><strong>Structure : </strong>{data?.structure} </span>
						<FaBuilding></FaBuilding>
						</li>
						<li className="blue">
            <span><strong>N° Structure : </strong>{data?.structure_id} </span>
						<BsCreditCard2FrontFill></BsCreditCard2FrontFill>
						</li>
            <li className="not-blue">
            <span><strong>Email : </strong>{data?.email} </span>
						<FaEnvelope></FaEnvelope>
						</li>
          </ul>
           </div>
				</div>
			</div>
    
      </div>
    </main>
  );
};

export default settingsPage;