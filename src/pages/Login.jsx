import { Link, useNavigate} from "react-router-dom"
import { ContainerAuth } from "../components/layaouts/ContainerAuth"
import { loginThunk } from "../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const Login = () => {
  const dispatch = useDispatch()
  const token = useSelector((store)=>store.user.token)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    dispatch(loginThunk(data))
    
  };

  useEffect(()=>{
    if(token !== ""){
      navigate("/")
    }
  },[token])
  console.log("token", token)

  return (
   <ContainerAuth>
    <div className="hidden md:block">
        <img className="max-w-[350px]" src="/images/bannerLogin.png" alt="" />
      </div>
      <form onSubmit={handleSubmit} className="[&>label]:grid grid gap-7 [&>label]:gap-5 w-[min(100%,300px)] mx-auto items-center ">
        <h1 className="text-2xl uppercase font-semibold">Iniciar sesion</h1>

        <label>
          <span className="text-white/50 text-sm">E-mail</span>
          <input
            className="bg-transparent border-b border-secondry outline-none"
            type="email"
            required
            name="email"
          />
        </label>

        <label>
          <span className="text-white/50 text-sm">Contraseña</span>
          <input
            className="bg-transparent border-b border-secondry outline-none"
            type="password"
            required
            name="password"
          />
        </label>

        <button
          className="rounded-full py-1 px-4 max-w-max mx-auto uppercase border-2 border-green-700 text-sm font-semibold shadow-lg shadow-purple-400/40 hover:tracking-widest transition-all mt-6"
          type="submit"
        >
          Entrar
        </button>
        <Link className="text-center transition-colors underline hover:text-green-800" to="/register">
          O Crear una cuenta nueva
        </Link>
      </form>
   </ContainerAuth>
  )
}