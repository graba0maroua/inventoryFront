import { signOut } from "../../features/auth/auth-slice";
import { useLogoutMutation } from "../../features/auth/login";
import { useAppDispatch } from "../hooks"

const HomePage = () => {
    const dispatch = useAppDispatch()
    const [logout] = useLogoutMutation();
    
    return (
    <div>
    Home page
    <button className="btn btn-success" onClick={async()=>{
        logout("");
        dispatch(signOut());

    }}>
        déconnexion
    </button>
    </div>)
}

export default HomePage