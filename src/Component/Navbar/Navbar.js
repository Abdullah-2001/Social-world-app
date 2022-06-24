import React, { useEffect, useState } from 'react';
import Bell from '../../Assets/Svg/bell.svg';
import Message from '../../Assets/Svg/message.svg';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, firestore } from '../../Config/Firebase';
import { setToken } from '../../Store/Users/UserSlice';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import './Navbar.css';

const Navbar = () => {

    const [currentUser, setCurrentUser] = useState([])
    const state = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentUser(state)
    }, [state])

    const logout = async (user) => {
        await updateDoc(doc(firestore, "users", user.uid), {
            isOnline: false,
        })
        await signOut(auth)
        dispatch(setToken(null))
        dispatch(setCurrentUser(null))
    }

    return (
        <div>
            <div className='navbar'>
                <div>
                    <p className='logo'>Social <span>World</span> </p>
                </div>
                <div className='navbar-icons'>
                    <img style={{ width: "24px" }} src={Bell}></img>
                    <div className='dropdown'>
                        <img style={{ width: "24px" }} src={Message}></img>
                        <div className='message-content'>
                            <p>Messages</p>
                        </div>
                    </div>
                    {currentUser.map((v, i) => {
                        return (
                            <>
                                <div className='dropdown'>
                                    <img className='user-image' src={v.profileImage}></img>
                                    <div className='profile-content'>
                                        <p>Settings</p>
                                        <Link to={`profile/${v.uid}`}><p>Profile</p></Link>
                                        <p onClick={() => logout(v)}>Logout</p>
                                    </div>
                                </div>
                                <p className='username'>{v.firstName + " " + v.lastName}</p>
                            </>
                        )
                    })}
                </div>
            </div>
            <Outlet />
        </div >
    )
}

export default Navbar;