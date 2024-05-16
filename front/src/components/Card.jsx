import React from 'react';

export default function Card({ element }) {
  const { file_url, theme, title, user } = element;

  // Función para renderizar la imagen
  const renderImage = () => {
    const imageUrl = (file_url && theme?.type?.name === 'images') ? file_url : "http://biropbj.sumutprov.go.id/storage/2021/04/default.jpg";
    return <img src={imageUrl} alt={`Imagen por defecto`} className="h-full w-full object-cover" />;
  };

  // Función para renderizar el título y los créditos del usuario
  const renderTitleAndCredits = () => {
    return (
      <div className="flex flex-col justify-center w-9/12">
        {title && <h1 className="font-bold text-gray-900 group-hover:text-white">{title}</h1>}
        {user?.username && <span className="text-sm font-light text-gray-900 group-hover:text-white">Créditos: {user.username}</span>}
      </div>
    );
  };

  // Función para renderizar la imagen de la categoría
  const renderCategoryImage = () => {
    const categoryImageUrl = theme?.category?.image_url;
    const categoryName = theme?.category?.name;
    const imageUrl = categoryImageUrl ? categoryImageUrl : "http://biropbj.sumutprov.go.id/storage/2021/04/default.jpg";
    return <img src={imageUrl} alt={`Imagen ${categoryName}`} className="w-10 h-10 lg:w-14 lg:h-14 object-cover rounded-full border" />;
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden cursor-pointer w-full">
      <div className="absolute inset-0 bg-center"></div>
      <div className="group relative m-0 flex h-72 w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
        <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-15 transition duration-300 ease-in-out group-hover:opacity-100">
          {renderImage()}
        </div>
        <div className="absolute bottom-0 z-20 m-0 p-2 px-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-2  w-full">
          <div className="flex justify-between gap-2 lg:gap-4">
            {renderTitleAndCredits()}
            <div className="flex justify-end items-center w-3/12">
              {renderCategoryImage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
