import { useState } from "react"
import { loginParams, useFetchInitialRegisterDataQuery, useLoginMutation } from "../../features/auth/login"
import { useAppDispatch } from "../hooks"
import { AuthState, setCredentials } from "../../features/auth/auth-slice"
import imgL from "../../assets/log2.svg"
import "./../../App.css"
import { FormSelect } from "react-bootstrap"
import { roles } from "../constantes/constantes"

function LoginPage() {
  const [loginp, setLoginparams] = useState(new loginParams("", ""));
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const {data,isFetching,refetch,isLoading} = useFetchInitialRegisterDataQuery({});
  const handleModeSwitch = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const [role,setRole] = useState(roles[0])
  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
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
            <input type="submit" value="Connexion" className="btn solid" onClick={async () => {
          
            
          const  {id,name,token,role}   = await login(loginp).unwrap();
          alert("logged in");
          dispatch(setCredentials(new AuthState(true,token,name,id,role)));
   
  
 }} />
            {/* ma3reftch i handle inputs kima login */}
            
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Crée un compte</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Full name" />
            </div>
            <div className="input-field col-12 px-5 my-2 " >
              <i className="fas fa-select"></i>
              <FormSelect className="border shadow-sm " onChange={(e)=>{
                  setRole(e.target.value)
              }}>
                {
                  roles.map((role)=>{
                    return (<option key={role} value={role} > {role}  </option>)
                  })
                }
              </FormSelect>
            </div>
            {role != "Chef_unité" && <div className="col-12 px-5 my-2" >
              <i className="fas fa-select"></i>
              <FormSelect className="border shadow-sm">
                { !isFetching && 
                  data?.centres.map((centre)=>{
                    return (<option key={centre.COP_ID} value={centre.COP_ID} > {centre.COP_LIB}  </option>)
                  })
                }
              </FormSelect>
            </div>}
            {role == "Chef_unité" &&  <div className="col-12 px-5 my-2" >
              <i className="fas fa-select"></i>
              <FormSelect className="border shadow-sm">
                { !isFetching && 
                  data?.unites.map((unites)=>{
                    return (<option key={unites.UCM_ID} value={unites.UCM_ID} > {unites.UCM_LIB}  </option>)
                  })
                }
              </FormSelect>
            </div>}
            
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Matricule" />
            </div>
    
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" value="s'inscrire" />
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
            <button className="btn transparent" id="sign-up-btn" onClick={handleModeSwitch}>
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
            <button className="btn transparent" id="sign-in-btn" onClick={handleModeSwitch}>
             connexion
            </button>
          </div>
          <img src={imgL} className="image" alt="" /> 
        </div>
      </div>
      </div>
  );
}

export default LoginPage;