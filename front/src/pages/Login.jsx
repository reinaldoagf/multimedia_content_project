import React, { useState } from 'react'
import { decodeToken } from 'react-jwt'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { post } from '../services/rest.service.ts'
import useUserStore from '../store/userStore'

export default function Login() {
    const navigate = useNavigate();

    // Estados para almacenar el correo electrónico y la contraseña
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useUserStore((state) => ({
      user: state.user,
      setUser: state.setUser,
    }));

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el comportamiento de envío del formulario por defecto

        try {
        // Realizar la solicitud de inicio de sesión utilizando Axios
        const { data } = await post(`/auth/login`, { email, password });
        
        if (data.token) {
            const decodedToken = decodeToken(data.token);
        
            if (decodedToken) {
                Cookies.set('decodedToken', JSON.stringify(decodedToken), { expires: 14 })
                Cookies.set('token', data.token)

                setUser(decodedToken); // Establecer el usuario en el store
                // Redirigir al usuario a la página de inicio o a otra página después del inicio de sesión exitoso
                setTimeout(() => {
                  navigate("/");
                }, 1000);
            } 
        }
        } catch (error) {
            console.error("Error de inicio de sesión:", error);
        }
  };

  return (
    <>
      <div className="w-full h-100">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Gestor de Contenido Multimedia
        </h1>

        <h2 className="text-xl font-bold leading-tight mt-8 text-gray-900">
          Iniciar Sesión
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
            <label className="block text-gray-700 text-gray-900">Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese Contraseña"
              minLength="6"
              className="text-gray-900 w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-gray-100
focus:bg-gray-100 focus:outline-none"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-gray-900 font-semibold rounded-lg
px-4 py-3 mt-6"
          >
            Iniciar Sesión
          </button>
        </form>

        <hr className="my-6 border-gray-300 w-full" />

        <p className="mt-8 text-gray-900">
          ¿Necesitas una cuenta?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">
            Crear una Cuenta
          </Link>
        </p>
        <p className="mt-2 text-gray-900">
          ¿Quieres ver la biblioteca de Contenidos?{" "}
          <Link to="/home" className="text-blue-500 hover:text-blue-700 font-semibold">
            Inicio
          </Link>
        </p>
      </div>
    </>
  );
}
