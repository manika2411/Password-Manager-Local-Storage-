import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        try {
            if (passwords && passwords !== "undefined") {
                setpasswordArray(JSON.parse(passwords));
            }
        } catch (error) {
            console.error("Invalid JSON in localStorage", error);
            localStorage.removeItem("passwords");
        }
    }, []);

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = () => {
        if(form.site.length>3 &&  form.username.length>3 && form.password.length>3)
        {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setform({ site: "", username: "", password: "" })
        toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    else
    {
        toast('Error: Password not saved!')
    }
    }
    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify([passwordArray.filter(item => item.id !== id)]))
            toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        }
    }
    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
                <div className="p-3 md:mycontainer min-h-[88.2vh]">
                    <h1 className='text-4xl text-center font-bold'>
                        <div className="logo font-bold text-black text-2xl">
                            <span className="text-green-500">&lt;</span>
                            Pass
                            <span className='text-green-500'>OP/&gt;</span>
                        </div>
                    </h1>
                    <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>
                    <div className="text-white flex flex-col p-4 gap-8 items-center">
                        <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full px-4 py-1 text-black' type="text" name='site' id='site' />
                        <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1 text-black' type="text" name='username' id='username' />
                            <div className="relative">
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1 text-black' type="password" name='password' id='password' />
                                <span className='absolute right-[3px] text-black top-[4px] cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} className='p-1' width={25} src="icons/eye.png" alt="eye" />
                                </span>
                            </div>
                        </div>
                        <button onClick={savePassword} className='flex justify-center items-center text-black bg-green-500 hover:bg-green-400 rounded-full px-8 py-2 w-fit gap-2 border border-green-900'>
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover">
                            </lord-icon> Save
                        </button>
                    </div>
                    <div className="passwords">
                        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No Passwords to show</div>}
                        {passwordArray.length != 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                                <thead className='bg-green-800 text-white'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={item.id}>
                                            <td className='text-center py-2 border border-white'>
                                                <div className='flex items-center justify-center'>
                                                    <a target='blank' href={item.site}>{item.site}</a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center py-2 border border-white'>
                                                <div className='flex items-center justify-center'>
                                                    <a target='blank' href="{item.site}"><span>{item.username}</span></a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center py-2 border border-white'>
                                                <div className='flex items-center justify-center'>
                                                    <a target='blank' href="{item.site}"><span>{item.password}</span></a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='justify-center text-center py-2 border border-white'>
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager