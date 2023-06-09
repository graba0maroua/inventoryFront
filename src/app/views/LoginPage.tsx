import { useState } from "react"
import { loginParams, useFetchInitialRegisterDataQuery, useLoginMutation ,useRegisterMutation} from "../../features/auth/login"
import { useAppDispatch } from "../hooks"
import { AuthState, setCredentials } from "../../features/auth/auth-slice"
import "./../../App.css"
import { FormSelect } from "react-bootstrap"
import { roles } from "../constantes/constantes"
import SnackBarComponent from "../components/SnackBarComponent"
import { hideSnackBar, showSnackBar } from "../../features/snack_bar/snack_bar"
import { FaCheck } from "react-icons/fa"
import { BsXCircleFill } from "react-icons/bs"
import { Modal, Button } from "react-bootstrap";
function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const [loginp, setLoginparams] = useState(new loginParams("", ""));
  const [registerParams, setRegisterParams] = useState({
    name: "",
    email: "",
    matricule: "",
    password: "",
    role: roles[0],
    structureType: "",
    structureId: "",
  });
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const {data,isFetching,refetch,isLoading} = useFetchInitialRegisterDataQuery({});
  const [register] = useRegisterMutation();
  const handleModeSwitch = () => {
    setIsSignUpMode(!isSignUpMode);
  };
  const handleSignUpClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await register(registerParams).unwrap();
      setShowModal(true); // Show the modal on successful registration
    } catch (error) {
      // Handle error if registration fails
      dispatch(showSnackBar({
        bgColor: "bg-danger",
        message: "Erreur champs vide ou incorrect",
        icon: BsXCircleFill
      }));
      setTimeout(() => {
        dispatch(hideSnackBar());
      }, 2500);
    }
  };
  const [role,setRole] = useState(roles[0])
  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
          <SnackBarComponent/>
            <h2 className="title">Connectez vous</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Matricule"
                onChange={(e) =>
                  setLoginparams((loginp) => ({
                    ...loginp,
                    matricule: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) =>
                  setLoginparams((loginp) => ({
                    ...loginp,
                    password: e.target.value,
                  }))
                }
              />
            </div>

            <input type="submit" value="Connexion" 
            
            className={
              ((loginp.matricule.trim().length > 4) 
              && (loginp.password.trim().length > 7)) ? 
              "bttn solid":
              "btn btn-secondary rounded-pill btn-lg"} 
              disabled={ !((loginp.matricule.trim().length > 4) 
                && (loginp.password.trim().length > 7))}
            onClick={async () => {
              try {
                const  {id,name,token,role}   = await login(loginp).unwrap();
                dispatch(setCredentials(new AuthState(true,token,name,id,role)));
                dispatch(showSnackBar({
                  bgColor:"bg-success",
                  message:"Connecté avec succès",
                  icon:FaCheck
                }))
                setTimeout(()=>{
                  dispatch(hideSnackBar())
                },2500)
              } catch (error) {
                dispatch(showSnackBar({
                  bgColor:"bg-danger",
                  message:"Erreur matricule ou mot de passe incorrect",
                  icon:BsXCircleFill
                }))
                setTimeout(()=>{
                  dispatch(hideSnackBar())
                },2500)
              }
   
  
 }} />
          </form>
          <form action="#" className="sign-up-form">
          <SnackBarComponent />
            <h2 className="title">Crée un compte</h2>
            <div className="col-12 px-5 my-2">
              <i className="fas fa-select"></i>
              <FormSelect
                className="border shadow-sm bg-light rounded"
                onChange={(e) => {
                  setRegisterParams((params) => ({
                    ...params,
                    role: e.target.value,
                  }));
                }}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </FormSelect>
            </div>
            {registerParams.role !== "Chef_unité" && (
              <div className="col-12 px-5 my-2">
                <i className="fas fa-select"></i>
                <FormSelect
                  className="border shadow-sm bg-light rounded"
                  onChange={(e) => {
                    setRegisterParams((params) => ({
                      ...params,
                      structureId: e.target.value,
                    }));
                  }}
                >
                  {!isFetching &&
                    data?.centres.map((centre) => (
                      <option key={centre.COP_LIB} value={centre.COP_LIB}>
                        {centre.COP_LIB}
                      </option>
                    ))}
                </FormSelect>
              </div>
            )}
            {registerParams.role === "Chef_unité" && (
              <div className="col-12 px-5 my-2">
                <i className="fas fa-select"></i>
                <FormSelect
                  className="border shadow-sm bg-light rounded"
                  onChange={(e) => {
                    setRegisterParams((params) => ({
                      ...params,
                      structureId: e.target.value,
                    }));
                  }}
                >
                  {!isFetching &&
                    data?.unites.map((unites) => (
                      <option key={unites.UCM_LIB} value={unites.UCM_LIB}>
                        {unites.UCM_LIB}
                      </option>
                    ))}
                </FormSelect>
              </div>
            )}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nom et prénom"
                onChange={(e) =>
                  setRegisterParams((params) => ({
                    ...params,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email "
                onChange={(e) =>
                  setRegisterParams((params) => ({
                    ...params,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Matricule"
                onChange={(e) =>
                  setRegisterParams((params) => ({
                    ...params,
                    matricule: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) =>
                  setRegisterParams((params) => ({
                    ...params,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <input
  type="submit"
  className="bttn"
  value="S'inscrire"
  onClick={handleSignUpClick}/>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Nouveau ici?</h3>
            <p>
            Si vous n'avez pas encore un compte, vous pouvez vous inscrire dès maintenant. 
            </p>
            <button className="bttn transparent" id="sign-up-btn" onClick={handleModeSwitch}>
            s'inscrire
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Vous avez déjà un compte ?</h3>
            <p>
            Si vous avez déjà créé un compte, vous pouvez vous connecter dès maintenant pour accéder à votre espace personnel.
            </p>
            <button className="bttn transparent" id="sign-in-btn" onClick={handleModeSwitch}>
             connexion
            </button>
          </div>
 
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Vous êtes inscrit avec succès</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Votre demande de compte sera traitée dans les plus brefs délais, un email vous sera envoyé dès la prise en charge de la réponse.
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Fermer
    </Button>
  </Modal.Footer>
</Modal>
      </div>
  );
}

export default LoginPage;