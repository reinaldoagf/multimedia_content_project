import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

test('renders Card component', async () => {
  const element = {
    // Propiedades necesarias para el componente
    // Agrega aquí las propiedades necesarias para probar el componente Card
    user: {
      username: 'admin' // Agrega un nombre de usuario para las pruebas
    },
    theme: {
      category: {
        name: 'Deportes', // Agrega el nombre de la categoría para las pruebas
        image_url: 'http://localhost:3001/uploads/compressed_file-1715753685070.jpg' // Agrega la URL de la imagen de la categoría para las pruebas
      }
    }
  };

  render(<Card element={element} />);
  
  // Espera a que el texto "Créditos:" esté presente en el componente renderizado
  const creditsText = await screen.findByText(/Créditos:/i);
  expect(creditsText).toBeInTheDocument();
});