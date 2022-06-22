import React, { useEffect, useState } from 'react';
import Bell from '../../Assets/Svg/bell.svg';
import Group from '../../Assets/Svg/friends.svg';
import Message from '../../Assets/Svg/message.svg';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Config/Firebase';
import { setCurrentUser, setToken } from '../../Store/Users/UserSlice';
import { signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {

    const [open, setOpen] = useState(false)
    const [openMessages, setOpenMessages] = useState(false)
    const [openNotifications, setOpenNotifications] = useState(false)
    const [currentUser, setCurrentUser] = useState([])
    const state = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch()

    const toggleProfile = () => setOpen(open => !open)
    const toggleMessages = () => setOpenMessages(openMessages => !openMessages)
    const toggleNotifications = () => setOpenNotifications(openNotifications => !openNotifications)

    useEffect(() => {
        setCurrentUser(state.map(v => v))
    }, [state])

    const logout = async () => {
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
                    <img onClick={toggleNotifications} style={{ width: "24px" }} src={Bell}></img>
                    <div className='dropdown'>
                        <img onClick={toggleMessages} style={{ width: "24px" }} src={Message}></img>
                        <div className='message-content'>
                            <p>Messgaes</p>
                        </div>
                    </div>
                    <div className='dropdown'>
                        <img className='user-image' onClick={toggleProfile} src={currentUser[0]?.profileImage}></img>
                        <div className='profile-content'>
                            <p>Profile</p>
                            <p><Link to={`/profile/${currentUser[0]?.uid}`}>Settings</Link></p>
                            <p onClick={() => logout()}>Logout</p>
                        </div>
                    </div>
                    <p className='username'>{currentUser[0]?.firstName + " " + currentUser[0]?.lastName}</p>
                </div>
            </div>
            <Outlet />
        </div >
    )
}

export default Navbar;