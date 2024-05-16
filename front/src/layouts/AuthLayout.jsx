import React from "react";
import { Carousel } from "flowbite-react";

export default function AuthLayout({ children }) {
  const banners = [
    {
      src: "https://disruptivestudio.com/images/hero/banner_01.jpg",
    },
    {
      src: "https://disruptivestudio.com/images/hero/banner_02.jpg",
    },
    {
      src: "https://disruptivestudio.com/images/hero/banner_03.jpg",
    },
    {
      src: "https://disruptivestudio.com/images/hero/banner_04.jpg",
    },
  ];
  return (
    <section className="flex flex-col md:flex-row h-screen items-center bg-gray-200">
      <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <Carousel>
          {banners.map((element, index) => (
            <img key={index} src={element.src} loading="lazy" alt={`img-${index}`} className="h-full w-full"/>
          ))}
        </Carousel>
      </div>

      <div className="w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}
