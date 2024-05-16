import React from 'react'
import Cookies from 'js-cookie'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Themes from './pages/Themes'
import ContentCategories from './pages/ContentCategories'
import Content from './pages/Content'
import NotFound from './pages/NotFound'

import useUserStore from './store/userStore'

function App() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  // Función de middleware para verificar la autenticación del usuario
  const requireAuth = (Component) => {
    // Verifica si el usuario está autenticado
    // Si el usuario está autenticado, renderiza el componente
    const token = Cookies.get('token')
    if (user || token) {
      return <Component />;
    }

    // Si el usuario no está autenticado, redirige al inicio de sesión
    return <Navigate to="/home" />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Content />
              </>
            }
          />
          {/* Para rutas que requieren un layout de administrador */}
          <Route
            path="/"
            element={<AdminLayout>{requireAuth(Content)}</AdminLayout>}
          />
          <Route
            path="/admin/themes"
            element={<AdminLayout>{requireAuth(Themes)}</AdminLayout>}
          />
          <Route
            path="/admin/content-categories"
            element={
              <AdminLayout>{requireAuth(ContentCategories)}</AdminLayout>
            }
          />
          {/* Configura la ruta para la página 404 */}
          <Route path="*" element={<NotFound />} />
          {/* Otras rutas de administrador */}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
