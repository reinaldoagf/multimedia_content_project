import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import { Button, Modal } from 'flowbite-react'
import { Container, Button as FAButton } from 'react-floating-action-button'
import { post } from '../services/rest.service.ts'
import Cookies from 'js-cookie'
import Card from '../components/Card'
import MainContentHeader from '../components/MainContentHeader'
import useUserStore from '../store/userStore'
import useContentStore from '../store/contentStore'
import useThemeTypeStore from '../store/themeTypeStore'
import useThemeStore from '../store/themeStore'
import useContentCategoryStore from '../store/contentCategoryStore'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content() {
  const navigate = useNavigate();

  const { themeTypes, getThemeTypes } = useThemeTypeStore((state) => ({
    themeTypes: state.themeTypes,
    getThemeTypes: state.getThemeTypes,
  }));

  const {
    themes,
    getThemes
  } = useThemeStore((state) => ({
    themes: state.themes,
    getThemes: state.getThemes
  }));

  const { contentCategories, getContentCategories } = useContentCategoryStore(
    (state) => ({
      contentCategories: state.contentCategories,
      getContentCategories: state.getContentCategories,
    })
  );

  const { content, getContent } = useContentStore((state) => ({
    content: state.content,
    getContent: state.getContent,
  }));

  const [tabSelected, setTabSelected] = useState('Por Tipos')
  const [search, setSearch] = useState('')

  const [typeSelected, setTypeSelected] = useState('')
  const [themeSelected, setThemeSelected] = useState('')
  const [categorySelected, setCategorySelected] = useState('')
  const [decodeToken, setDecodeToken] = useState('')

  const [tabs, setTabs] = useState({
    "Por Tipos": [],
    "Por Temática": [],
    "Por Categoría": [],
  });

  /* formulario */
  const [openFormModal, setOpenFormModal] = useState(false)
  const [title, setTitle] = useState('')
  const [theme, setTheme] = useState('')
  const [urlVideo, setUrlVideo] = useState('')
  const [fileType, setFileType] = useState(null)
  const [file, setFile] = useState(null);
  /* formulario */

  const handleTabSelected = (event) => {
    setTabSelected(event.target.innerHTML)
    setTypeSelected('')
    setThemeSelected('')
    setCategorySelected('')
    setTabs({
      ...tabs,
      "Por Tipos": [...content],
      "Por Temática": [...content],
      "Por Categoría": [...content]
    })
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setTabs({
      ...tabs,
      "Por Tipos": event.target?.value ? [...tabs["Por Tipos"].filter(e => {
        if (e.title.toLowerCase().includes((event.target.value.toLowerCase()))) return e
      })] : [...content],
      "Por Temática": event.target?.value ? [...tabs["Por Temática"].filter(e => {
        if (e.title.toLowerCase().includes((event.target.value.toLowerCase()))) return e
      })] : [...content],
      "Por Categoría": event.target?.value ? [...tabs["Por Categoría"].filter(e => {
        if (e.title.toLowerCase().includes((event.target.value.toLowerCase()))) return e
      })] : [...content],
    })
  };

  const handleTypeChange = (event) => {
    setTypeSelected(event.target.value);
    setTabs({
      ...tabs,
      "Por Tipos": event.target?.value ? [...content.filter(e => {
        if (e.theme?.type?.name === event.target.value) return e
      })] : [...content],
      "Por Temática": [...content],
      "Por Categoría": [...content]
    })
  };

  const handleThemeChange = (event) => {
    setThemeSelected(event.target.value);
    setTabs({
      ...tabs,
      "Por Tipos": [...content],
      "Por Temática": event.target?.value ? [...content.filter(e => {
        if (e.theme?.name === event.target.value) return e
      })] : [...content],
      "Por Categoría": [...content]
    })
  };

  const handleCategoryChange = (event) => {
    setCategorySelected(event.target.value);
    setTabs({
      ...tabs,
      "Por Tipos": [...content],
      "Por Temática": [...content],
      "Por Categoría": event.target?.value ? [...content.filter(e => {
        if (e.theme?.category?.name === event.target.value) return e
      })] : [...content],
    })
  };
  /* formulario */

  const setDefaultValues = async () => {
    setOpenFormModal(false);
    setTitle('');
    setTheme('');
    setUrlVideo('');
    setFileType(null);
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(decodeToken?.user) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("theme", theme);
      formData.append("url_video", urlVideo);
      formData.append("file", file);
      formData.append("user", decodeToken.user._id);

      try {
        // Realizar la solicitud de inicio de sesión utilizando Axios
        const { data } = await post(`/content`, formData);
        
        if (data.data) {
          getContent(`/content`);
          setDefaultValues();
        }
      } catch (error) {
        console.error("Error al enviar la imagen:", error);
      }
    } else {
      console.log("no user in sesion")
    }    
  };
  /* formulario */

  useEffect(() => {
    setTabs({
      ...tabs,
      "Por Tipos": [...content],
      "Por Temática": [...content],
      "Por Categoría": [...content]
    })
  }, [content]);

  useEffect(() => {
    getThemeTypes(`/theme-types`);
    getContent(`/content`);
    getThemes(`/themes`);
    getContentCategories(`/content-categories`);

    setDecodeToken(JSON.parse(Cookies.get('decodedToken')))

    return () => {
      console.log("Content unmounted");
    };
  }, []);

  return (
    <>
      <main className="flex-1 max-h-full p-5 overflow-hidden bg-gray-200 rounded-md">
        {/* <!-- Main content header --> */}
        <MainContentHeader title={"Biblioteca de Contenido"} />
        {/* content library */}

        <div className="w-full mt-6">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {Object.keys(tabs).map((tab, index) => (
                <Tab
                  key={index}
                  onClick={handleTabSelected}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-gray-200 text-blue-700 shadow"
                        : "text-blue-100 hover:bg-gray-200 hover:text-gray-900"
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(tabs).map((elements, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    "rounded-xl",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <div className="w-full">
                    <div className="flex">
                      <div className=''>
                        {
                          tabSelected === 'Por Tipos' && (
                            <select
                              id="type"
                              className="capitalize bg-gray-200  text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              value={typeSelected}
                              onChange={handleTypeChange}>
                              <option value={''} className="capitalize">Selecciona un tipo</option>

                              {themeTypes.map((element, index) => (
                                <option key={index} value={element.name} className="capitalize">{element.name}</option>
                              ))}

                            </select>
                          )
                        }
                        {
                          tabSelected === 'Por Temática' && (
                            <select
                              id="theme"
                              className="capitalize bg-gray-200  text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              value={themeSelected}
                              onChange={handleThemeChange}>
                              <option value={''} className="capitalize">Selecciona un Temática</option>

                              {themes.map((element, index) => (
                                <option key={index} value={element.name} className="capitalize">{element.name}</option>
                              ))}

                            </select>
                          )
                        }
                        {
                          tabSelected === 'Por Categoría' && (
                            <select
                              id="category"
                              className="capitalize bg-gray-200  text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              value={categorySelected}
                              onChange={handleCategoryChange}>
                              <option value={''} className="capitalize">Selecciona una Categoría</option>

                              {contentCategories.map((element, index) => (
                                <option key={index} value={element.name} className="capitalize">{element.name}</option>
                              ))}

                            </select>
                          )
                        }


                      </div>
                      <div className="relative w-full">
                        <input
                          type="search"
                          id="search-dropdown"
                          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 placeholder-gray-400"
                          placeholder="Buscar por nombre de contenido..."
                          required
                          value={search}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                  {!!elements.length && (<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
                    {elements.map((element, index) => (
                      <Card
                        key={index}
                        element={element}
                      />
                    ))}
                  </div>
                  )}
                  {!elements.length && (
                    <div className="flex justify-center mt-2">
                      <span className="font-bold text-gray-900">Sin elementos</span>
                    </div>
                  )}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

        <Container className="!right-4 !bottom-4 !z-50">
          {
            (decodeToken?.user?.rol?.key === "admin" || decodeToken?.user?.rol?.key === "creator") && (
              <FAButton
                styles={{ backgroundColor: "#e5e7eb", color: "#000" }}
                className="fab-item btn btn-link btn-lg"
                tooltip="Crear Nueva"
                icon="fas fa-plus"
                rotate={true}
                onClick={() => {
                  setDefaultValues();
                  setOpenFormModal(true);
                }}
              />
            ) 
          }
          {
            (!decodeToken) && (
              <FAButton
                styles={{ backgroundColor: "#e5e7eb", color: "#000" }}
                className="fab-item btn btn-link btn-lg"
                tooltip="Iniciar Sesión"
                icon="fas fa-user"
                rotate={true}
                onClick={() => {
                  navigate("/login");
                }}
              />
            )
          }
        </Container>

        {/* formulario */}
        <Modal
          show={openFormModal}
          onClose={() => {
            setDefaultValues();
            setOpenFormModal(false);
          }}
        >
          <form onSubmit={handleSubmit}>
            <Modal.Header className=''>
              Información del Contenido
            </Modal.Header>
            <Modal.Body>
              <>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >{`Título`}</label>
                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder={`Título`}
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="theme"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >{`Temática`}</label>
                    <select
                      id="theme"
                      className="capitalize text-sm rounded-lg block w-full p-2.5"
                      value={theme}
                      onChange={(event) => {
                        setTheme(event.target.value)
                        setFileType(event.target?.value ? themes.find(e => {
                          return e._id === event.target.value
                        }).type : null)
                      }}>
                      <option value={''} className="capitalize">Selecciona un Temática</option>

                      {themes.map((element, index) => (
                        <option key={index} value={element._id} className="capitalize">{element.name}</option>
                      ))}

                    </select>
                  </div>
                  {
                    (fileType?.name === "images" || fileType?.name === "text") && (
                      <div className="col-span-2">
                        <label
                          htmlFor="file"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >{`Subir Archivo`}</label>
                        <input
                          type="file"
                          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                          onChange={handleFileChange}
                        />
                      </div>
                    )
                  }
                  {
                    fileType?.name === "videos" && (
                      <div className="col-span-2">
                        <label
                          htmlFor="video_url"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >{`Url del Vídeo de youtube`}</label>
                        <input
                          value={urlVideo}
                          onChange={(event) => setUrlVideo(event.target.value)}
                          type="text"
                          name="video_url"
                          id="video_url"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder={`Url del Vídeo de youtube`}
                        />
                      </div>
                    )
                  }

                </div>
              </>
            </Modal.Body>
            <Modal.Footer>
              <div className="flex justify-between w-full">
                <Button
                  color="gray"
                  onClick={() => {
                    setDefaultValues();
                  }}
                  className=''
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="capitalize text-gray-900 inline-flex items-center bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Guardar
                </Button>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </main>
    </>
  );
}
