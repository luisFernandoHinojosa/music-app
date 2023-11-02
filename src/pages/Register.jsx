import { Link, useNavigate } from "react-router-dom";
import { ContainerAuth } from "../components/layaouts/ContainerAuth";
import { axiosMusic } from "../utils/configAxios";
import { Toaster, toast } from 'react-hot-toast';

export const Register = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    toast.promise(
      axiosMusic
      .post("/api/auth/register", data)
      .then(() => {
        navigate("/login")
      })
      .catch((err) => console.log(err)),
      {
          loading: (
              <b className="font-semibold text-[#00072d]">
                  Registrando datos...
              </b>
          ),
          success: (
              <b className="font-semibold text-green-600">
                  Registro con exito!!
              </b>
          ),
          error: (
              <b className="font-semibold text-red-500">
                  Hubo un problema al registrar, intentelo de nuevo.
              </b>
          ),
      },
      {
          iconTheme: {
              primary: '#0e6ba8',
          },
      }
  );
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
            required
            
          />
        </label>

        <label>
          <span className="text-white/50 text-sm">Name user</span>
          <input
            className="bg-transparent border-b border-secondry outline-none"
            type="text"
            name="name"
            required

          />
        </label>

        <label>
          <span className="text-white/50 text-sm">Contraseña</span>
          <input
            className="bg-transparent border-b border-secondry outline-none"
            type="password"
            name="password"
            required
          />
        </label>

        <button
          className="border-2 border-green-800 rounded-full py-1 px-4 max-w-max mx-auto uppercase text-sm font-semibold shadow-lg shadow-purple-400/40 hover:tracking-widest transition-all mt-6"
          type="submit"
        >
          Crear
        </button>
        <Link className="text-center underline transition-colors hover:text-green-700" to="/login">
          O iniciar sesion
        </Link>
      </form>
      <Toaster/>
    </ContainerAuth>
  );
};
