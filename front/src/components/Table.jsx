import React from 'react'
import { Button } from 'flowbite-react'
import useUserStore from '../store/userStore'
import useOperationStore from '../store/operationStore'

export default function Table({ columns, elements }) {
    const { user } = useUserStore((state) => ({
      user: state.user,
    }));

    const {
        setElement,
        setOperation
    } = useOperationStore((state) => ({
        setElement: state.setElement,
        setOperation: state.setOperation
    }));

    return (
        <>
            <table className="min-w-full overflow-x-scroll divide-y divide-gray-800 bg-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-gray-200 divide-y divide-gray-800">
                    {elements.map((element, index) => (
                        <tr key={index} className="transition-all hover:bg-gray-100 hover:shadow-lg cursor-pointer">
                            {columns.map((column, index) => (
                                <td key={index} className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {element[column.td.image] && (
                                            <div className="flex-shrink-0 w-10 h-10">
                                                <img className="w-10 h-10 rounded-full" src={element[column.td.image]} alt="" />
                                            </div>
                                        )}
                                        {(element[column.td.title] || element[column.td.description]) && (
                                            <div className="ml-4">
                                                {element[column.td.title] && (
                                                    <div className="text-sm font-medium text-gray-900 capitalize">{element[column.td.title]}</div>
                                                )}
                                                {element[column.td.description] && (
                                                    <div className="text-sm text-gray-500">{element[column.td.description]}</div>
                                                )}
                                            </div>
                                        )}
                                        {((user?.user?.rol?.key === "admin" || user?.user?.rol?.key === "creator") && column.td.edit) && (
                                            <div className="">
                                                <Button color="dark" onClick={() => {
                                                    setElement(element)
                                                    setOperation('edit')
                                                }} className="">
                                                    <i className="fa fa-edit mr-2"></i> {column.td.edit} 
                                                </Button>
                                            </div>
                                        )}
                                        {(user?.user?.rol?.key === "admin" && column.td.delete) && (
                                            <div className="ml-4">
                                                <Button color="dark" onClick={() => {
                                                    setElement(element)
                                                    setOperation('delete')
                                                }} className="">
                                                    <i className="fa fa-trash mr-2"></i> {column.td.delete} 
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
