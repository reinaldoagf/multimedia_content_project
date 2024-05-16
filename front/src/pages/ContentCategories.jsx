import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Container, Button as FAButton } from "react-floating-action-button";
import { post, put, _delete } from "../services/rest.service.ts";
import MainContentHeader from "../components/MainContentHeader";
import Table from "../components/Table";
import useUserStore from '../store/userStore'
import useContentCategoryStore from "../store/contentCategoryStore";
import useOperationStore from "../store/operationStore";

export default function ContentCategories() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { operation, element, setElement, setOperation } = useOperationStore(
    (state) => ({
      operation: state.operation,
      element: state.element,
      setElement: state.setElement,
      setOperation: state.setOperation,
    })
  );

  const { contentCategories, getContentCategories } = useContentCategoryStore(
    (state) => ({
      contentCategories: state.contentCategories,
      getContentCategories: state.getContentCategories,
    })
  );

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      if (element && operation === "edit") {
        // Realizar la solicitud de inicio de sesión utilizando Axios
        const { data } = await put(
          `/content-categories/${element._id}`,
          formData
        );

        if (data.data) {
          getContentCategories(`/content-categories`);
          setDefaultValues();
        }
      } else {
        // Realizar la solicitud de inicio de sesión utilizando Axios
        const { data } = await post(`/content-categories`, formData);

        if (data.data) {
          getContentCategories(`/content-categories`);
          setDefaultValues();
        }
      }
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Realizar la solicitud de inicio de sesión utilizando Axios
      const { data } = await _delete(`/content-categories/${element._id}`);
      getContentCategories(`/content-categories`);
      setDefaultValues();
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
    }
  };

  const setDefaultValues = async () => {
    setOpenFormModal(false);
    setOpenConfirmModal(false);
    setName("");
    setImage(null);
    setElement(null);
    setOperation(null);
  };

  useEffect(() => {
    if (operation && element) {
      switch (operation) {
        case "edit":
          setName(element.name ? element.name : "");
          setImage(element.image_url ? element.image_url : null);
          setOpenFormModal(true);
          break;
        case "delete":
          setOpenConfirmModal(true);
          break;
        default:
          break;
      }
    }
  }, [operation, element]);

  useEffect(() => {
    getContentCategories(`/content-categories`);

    return () => {
      console.log("ContentCategories unmounted");
    };
  }, []);

  return (
    <>
      <main className="flex-1 max-h-full p-5 overflow-hidden">
        {/* <!-- Main content header --> */}
        <MainContentHeader title={"Categorías de Contenido"} />

        {/* <!-- Table see (https://tailwindui.com/components/application-ui/lists/tables) --> */}
        <h3 className="mt-4 text-xl text-gray-900">Categorías</h3>
        <div className="flex flex-col mt-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                <Table
                  columns={(user?.user?.rol?.key === "admin" || user?.user?.rol?.key === "creator") ? [
                    {
                      header: "Nombre",
                      td: {
                        image: "image_url",
                        title: "name",
                        description: "name",
                      },
                    },
                    {
                      header: "Acciones",
                      td: {
                        edit: "Editar",
                        delete: "Eliminar",
                      },
                    },
                  ] : [
                    {
                      header: "Nombre",
                      td: {
                        image: "image_url",
                        title: "name",
                        description: "name",
                      },
                    },
                  ]}
                  elements={contentCategories}
                />
              </div>
            </div>
          </div>
        </div>

        {(user?.user?.rol?.key === "admin" || user?.user?.rol?.key === "creator") && (
          <Container className="!right-4 !bottom-4 !z-50">
            <FAButton
              styles={{ backgroundColor: "#111827", color: "#fff" }}
              className="fab-item btn btn-link btn-lg"
              tooltip="Crear Nueva"
              icon="fas fa-plus"
              rotate={true}
              onClick={() => {
                setDefaultValues();
                /* setStaff(null) */
                setOpenFormModal(true);
              }}
            />
          </Container>
        )}


        {/* formulario */}
        <Modal
          show={openFormModal}
          onClose={() => {
            setDefaultValues();
            setOpenFormModal(false);
          }}
        >
          <form onSubmit={handleSubmit}>
            <Modal.Header className="">
              Información de la Categoría
            </Modal.Header>
            <Modal.Body>
              <>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >{`Nombre`}</label>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder={`Nombre`}
                    />
                  </div>
                </div>
                {image && (
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >{`Imagen`}</label>
                      <div class="rounded-lg max-h-96">
                        <img
                          class="object-cover max-h-96 h-full w-full rounded-lg"
                          src={image}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >{`Subir Imagen`}</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
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
                  className=""
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

        {/* confirmar operacion */}
        <Modal
          show={openConfirmModal}
          size="md"
          onClose={() => {
            setDefaultValues();
          }}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Confirmar Operación
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="gray"
                  onClick={() => {
                    setDefaultValues();
                  }}
                >
                  No, cancelar
                </Button>
                <Button color="failure" onClick={() => handleDelete()}>
                  {"Sí, Eliminar"}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </main>
    </>
  );
}
