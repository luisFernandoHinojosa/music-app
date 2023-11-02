import { Link, useNavigate } from "react-router-dom";
import { ContainerAuth } from "../components/layaouts/ContainerAuth";
import { axiosMusic } from "../utils/configAxios";

export const Register = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    axiosMusic
      .post("/api/auth/register", data)
      .then(() => {
        alert("Usuario registrado correctamente"); 
        navigate("/login")
      })
      .catch((err) => console.log(err));
  };

  return (
    <ContainerAuth>
      <div className="hidden md:block">
        <img className="max-w-[350px] rounded-3xl" src="/images/bannerRegister.png" alt="" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="[&>label]:grid grid gap-7 [&>label]:gap-5 w-[min(100%,300px)] mx-auto items-center"
      >
        <h1 className="text-2xl uppercase font-semibold">Cuenta nueva</h1>

        <label>
          <span className="text-white/50 text-sm">E-mail</span>
          <input
            className="bg-transparent border-b border-secondry outline-none"
            type="email"
            name="email"
          />
        </label>

        <label>
          <span className="text-white/50 text-sm">Name user</span>
          <input
            className="bg-transparent border-b border-secondry outline-none"
            type="text"
            name="name"
          />
        </label>

        <label>
          <span className="text-white/50 text-sm">Contraseña</span>
          <input
            className="bg-transparent border-b border-secondry outline-none"
            type="password"
            name="password"
          />
        </label>

        <button
          className="bg-primary-light rounded-full py-1 px-4 max-w-max mx-auto uppercase text-sm font-semibold shadow-lg shadow-purple-400/40 hover:tracking-widest transition-all mt-6"
          type="submit"
        >
          Crear
        </button>
        <Link className="text-center underline" to="/login">
          O iniciar sesion
        </Link>
      </form>
    </ContainerAuth>
  );
};