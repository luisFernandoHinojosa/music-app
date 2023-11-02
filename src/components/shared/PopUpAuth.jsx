import { Link, useParams } from "react-router-dom";
import { LogOutIcon, NavPlayIcon } from "../../icons/Svgs";
import { logOut } from "../../store/slices/user.slice";
import { useDispatch } from "react-redux";

export const PopUpAuth = ({isShowAuth}) => {

  const { id } = useParams();
  
const dispatch = useDispatch()
  const handleLogOut =()=>{
    dispatch(logOut())
  }
  return (
    <nav className={`fixed top-24 bg-primary-light uppercase grid p-4 rounded-md justify-start font-semibold border border-secondry gap-1 ${isShowAuth?"right-10":"-right-full"} transition-all`}>
      <Link className="flex gap-2 hover:text-[#3E14B5] items-center group transition-colors" to="/playlist">
       
        <NavPlayIcon /> Mis Grabaciones
      </Link>
      <button onClick={handleLogOut} className="flex gap-2 uppercase hover:text-indigo-800 items-center group transition-colors">
        
        <LogOutIcon /> Cerrar sesion
      </button>
    </nav>
  );
};
