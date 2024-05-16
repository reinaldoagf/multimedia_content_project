import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

test('renders Table component with correct columns and elements', () => {
  // Definir columnas y elementos para probar
  const columns = [
    { header: 'ID', td: { image: 'imageUrl', title: 'title' } },
    { header: 'Name', td: { title: 'name' } },
    { header: 'Action', td: { edit: 'Edit', delete: 'Delete' } },
  ];
  const elements = [
    { imageUrl: 'image1.jpg', title: 'Title 1', name: 'Name 1' },
    { imageUrl: 'image2.jpg', title: 'Title 2', name: 'Name 2' },
  ];

  // Renderizar el componente
  render(<Table columns={columns} elements={elements} />);

  // Verificar que las columnas estén presentes en la tabla
  const idColumnHeader = screen.getByText('ID');
  expect(idColumnHeader).toBeInTheDocument();

  const nameColumnHeader = screen.getByText('Name');
  expect(nameColumnHeader).toBeInTheDocument();

  const actionColumnHeader = screen.getByText('Action');
  expect(actionColumnHeader).toBeInTheDocument();

  // Verificar que los elementos estén presentes en la tabla
  const firstElementTitle = screen.getByText('Title 1');
  expect(firstElementTitle).toBeInTheDocument();

  const secondElementTitle = screen.getByText('Title 2');
  expect(secondElementTitle).toBeInTheDocument();
});
