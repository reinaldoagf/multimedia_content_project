import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { get, post } from '../services/rest.service.ts';
import useUserStore from '../store/userStore';

export default function SignUp() {
  const navigate = useNavigate();

  // Estados para almacenar el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [rols, setRols] = useState([]);

  const setUser = useUserStore((state) => state.setUser);
  
  const handleChange = (event) => {
    setRol(event.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento de envío del formulario por defecto
    if(password === confirmPassword) {
      try {
        // Realizar la solicitud de registro de cuenta utilizando Axios
        const { data } = await post(`/auth/signup`, { email, username, password, rol });
  
        if (data.token) {
          const decodedToken = decodeToken(data.token);
  
          if (decodedToken) {
            Cookies.set("decodedToken", JSON.stringify(decodedToken), {
              expires: 14,
            });
            Cookies.set("token", data.token);

            setUser(decodedToken); // Establecer el usuario en el store
            // Redirigir al usuario a la página de inicio o a otra página después del registro de cuenta exitoso
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error de registro de cuenta:", error);
      }
    } else {
      toast.error("Confirma tu contraseña correctamente");
    }
  };

  const fetchData = async () => {
      try {
        // Realizar la solicitud de registro de cuenta utilizando Axios
        const { data } = await get(`/rols`);
        setRols( data.data ? data.data : [])
      } catch (error) {
        console.error("Error de registro de cuenta:", error);
      }
  };

  useEffect(() => {
    fetchData()
  } , [])


  return (
    <>
      <div className="w-full h-100">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Gestor de Contenido Multimedia
        </h1>

        <h2 className="text-xl font-bold leading-tight mt-8 text-gray-900">
          Registrar Cuenta
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-gray-900">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="Ingrese el Correo Electrónico"
              className="text-gray-900 w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              autoFocus
              autoComplete="true"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-gray-900">
              Username
            </label>
            <input
              type="text"
              placeholder="Ingrese el Username"
              className="text-gray-900 w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              autoComplete="true"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-gray-900">Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese Contraseña"
              minLength="6"
              className="text-gray-900 w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-gray-900">Repetir Contraseña</label>
            <input
              type="password"
              placeholder="Repetir Contraseña"
              minLength="6"
              className="text-gray-900 w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          
          <div className="mt-4">
            <label htmlFor="rols" className="block mb-2 text-sm font-medium text-gray-900">Selecciona un rol</label>
            <select 
              id="rols" 
              className="capitalize bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={rol} 
              onChange={handleChange}>
              <option value={""}>Selecciona un rol</option>

              {rols.map((element, index) => (
                <option key={index} value={element._id} className="capitalize">{element.value}</option>
              ))}

            </select>
          </div>

          <button
            type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-gray-900 font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Registrar
          </button>
        </form>
        <hr className="my-6 border-gray-300 w-full" />

        <p className="mt-8 text-gray-900">
          Ya tengo mi cuenta{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </>
  );
}
