import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-around items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring ring-white'>
          <img className='w-10 p-1' src="/icons/github.svg" alt="GitHub" />
          <span className="font-bold px-2">Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
