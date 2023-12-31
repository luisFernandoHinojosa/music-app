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
    <nav className={`fixed top-24 bg-[#121212] uppercase grid p-4 rounded-md justify-start font-semibold border border-white text-slate-300 gap-1 ${isShowAuth?"right-10":"-right-full"} transition-all`}>
      <Link className="flex gap-2 hover:text-white items-center group transition-colors" to="/playlist">
       
        <NavPlayIcon /> Mis Grabaciones
      </Link>
      <button onClick={handleLogOut} className="flex gap-2 uppercase hover:text-white items-center group transition-colors">
        
        <LogOutIcon /> Cerrar sesion
      </button>
    </nav>
  );
};
