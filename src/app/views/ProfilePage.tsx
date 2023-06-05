import React, { useState, useEffect } from 'react';
import { useUpdatePasswordMutation } from "../../features/auth/login";
import Avatar, { genConfig } from 'react-nice-avatar';
import SideBar from '../components/SideBarComponent';
import { useFetchUserQuery } from "../../features/auth/user"
import WelcomeComponent from '../components/WelComeComponent';
import { MainUiState, setLoadingState, setShowUrlModal, setUrl } from '../../features/uistate/mainui';
import { useAppDispatch, useAppSelector } from '../hooks';
import SnackBarComponent from "../components/SnackBarComponent"
import { hideSnackBar, showSnackBar } from "../../features/snack_bar/snack_bar"
import { FaCheck } from "react-icons/fa"
import { BsXCircleFill } from "react-icons/bs"

const UserProfilePage: React.FC = () => {
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
      <SideBar active="settings" />
      <WelcomeComponent
        page="Profil"
        title="Settings"
        subItem="Informations"
        downloadLink="#"
        isDownloadable={false}
        onClickCustom={null}
      />
      <div className={`containerr ${margin_left}`}>
        <div className="card shadow">
        <SnackBarComponent />
          <div className="card-body">
            <div className="card-text">
              <div className="row">
                <div className="col-lg-4">
                  <Avatar style={{ width: '8rem', height: '8rem' }} {...config} />
                  <main className="Span">
                    <p className="profile-infoTop">
                      <strong>{data?.name}</strong>
                    </p>
                    <p className="pro profile-infoTop">
                      <strong>{data?.role}</strong>
                    </p>
                  </main>
                </div>
                <div className="col-lg-6 mb-4">
                  <p className="profile-info">
                    <strong>Matricule : </strong> {data?.matricule}
                  </p>
                  <p className="profile-info">
                    <strong>Email : </strong> {data?.email}
                  </p>
                  <p className="profile-info">
                    <strong>Structure :</strong> {data?.structure}
                  </p>
                  <p className="profile-info">
                    <strong>Structure ID : </strong> {data?.structure_id}
                  </p>
                  <hr />
                  Modifier mot de passe
                  <form className="form-group" onSubmit={handleFormSubmit}>
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary">
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;