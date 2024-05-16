import React from 'react'

export default function MainContentHeader({ title }) {
  return (
    <>        
        <div className="flex flex-col items-start justify-between pb-4 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
            <h1 className="text-2xl font-semibold whitespace-nowrap text-gray-900">{title}</h1>
        </div>
    </>
  )
}
