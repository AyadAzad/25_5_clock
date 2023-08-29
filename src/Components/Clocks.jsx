import React from 'react'
import Clock from './Clock'
const Clocks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 gap-4 justify-center p-4">
    <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
      <Clock className="bg-f7f7f7 hover:z-50" color="bg-red-600"
      textColor='text-white' />
    </div>
    <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
      <Clock className="bg-f7f7f7 hover:z-10" color="bg-green-500" />
    </div>
    <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
      <Clock className="bg-f7f7f7 hover:z-10" color="bg-blue-500"
      textColor="text-white" />
    </div>
    <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
      <Clock className="bg-f7f7f7 hover:z-10" color="bg-yellow-500" />
    </div>
  </div>
  )
}

export default Clocks