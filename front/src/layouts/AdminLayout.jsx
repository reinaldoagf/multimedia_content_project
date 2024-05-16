import React from 'react';
import Sidebar from '../components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="p-4 sm:ml-64 bg-gray-100 min-h-screen">
        {/* Contenido principal */}
        { children }
      </div>
    </div>
  );
}
