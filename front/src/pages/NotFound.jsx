// NotFound.js

import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="flex flex-col bg-gray-50 items-center justify-center h-screen bg-gray-200">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">404 - Not Found</h1>
                <p className="text-gray-900">Lo sentimos, la página que estás buscando no existe.</p>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                    <Link to="/login" className="text-blue-500 hover:underline ml-2">Login</Link>
                    <Link to="/signup" className="text-blue-500 hover:underline ml-2">Crear Cuenta</Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;