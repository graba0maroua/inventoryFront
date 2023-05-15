import { useState } from "react"
import { FormGroup } from "react-bootstrap"
import { Form } from "react-router-dom"
import { loginParams, useLoginMutation } from "../../features/auth/login"
import { useAppDispatch } from "../hooks"
import { AuthState, setCredentials } from "../../features/auth/auth-slice"

function LoginPage() {

    const [loginp,setLoginparams] = useState(new loginParams("",""))
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();

    return (<div>
            <FormGroup>
                <label htmlFor="">Email address </label>
                <input className="form-control"
                onChange={e => setLoginparams(loginp => ({...loginp, matricule: e.target.value }))} />
            </FormGroup>
            <FormGroup>
                <label htmlFor="">Password </label>
                <input className="form-control"
                onChange={e => setLoginparams(loginp => ({...loginp, password: e.target.value }))} />
            </FormGroup>
            <button className="btn btn-success" onClick={async () => {
          
            
                const  {id,name,token,role}   = await login(loginp).unwrap();
                alert("logged in");
                dispatch(setCredentials(new AuthState(true,token,name,id,role)));
         
        
       }}>
                Se connecter
            </button>
    </div>)
} 

export default LoginPage