import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className="text-green-500">&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Created With <img className='w-7 m-2' src="icons/heart.png" alt="" /> by ManikaSingla
            </div>
        </div>
    )
}

export default Footer
