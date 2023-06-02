import { useState } from "react"
import { loginParams, useFetchInitialRegisterDataQuery, useLoginMutation ,useRegisterMutation} from "../../features/auth/login"
import { useAppDispatch } from "../hooks"
import { AuthState, setCredentials } from "../../features/auth/auth-slice"
import imgL from "../../assets/log2.svg"
import "./../../App.css"
import { FormSelect } from "react-bootstrap"
import { roles } from "../constantes/constantes"
import SnackBarComponent from "../components/SnackBarComponent"
import { hideSnackBar, showSnackBar } from "../../features/snack_bar/snack_bar"
import { FaCheck } from "react-icons/fa"
import { BsXCircleFill } from "react-icons/bs"
function LoginPage() {
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

  const [role,setRole] = useState(roles[0])
  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
          <SnackBarComponent />

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
            <h2 className="title">Crée un compte</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Full name"
                onChange={(e) =>
                  setRegisterParams((params) => ({
                    ...params,
                    name: e.target.value,
                  }))
                }
              />
            </div>
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
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
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
  onClick={async (e) => {
    e.preventDefault();
    try {
      const response = await register(registerParams).unwrap();
      alert("user registered succesefully ");
    } catch (error) {
      // Handle error if registration fails
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  }}
/>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Nouveau ici?</h3>
            <p>
            Si vous n'avez pas encore de compte, vous pouvez vous inscrire dès maintenant. 
            </p>
            <button className="bttn transparent" id="sign-up-btn" onClick={handleModeSwitch}>
            s'inscrire
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
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
          {/* <img src={inv} className="image" alt="" />  */}
        </div>
      </div>
      </div>
  );
}

export default LoginPage;