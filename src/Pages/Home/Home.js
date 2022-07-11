import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../Config/UserContext';
import { NavLink } from 'react-router-dom';
import { PostModal } from '../../Component/Modal/Modal';
import { useSelector } from 'react-redux';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Card from '../../Component/Card/Card';
import moment from 'moment';
import gsap from 'gsap';
import './Home.css';

const Home = () => {

  const { currentUser } = CurrentUserContext()
  const load = useSelector((state) => state)
  const [modal, setModal] = useState(false)
  const TLLoader = gsap.timeline({ repeat: -1 });
  let date = new Date()

  useEffect(() => {
    TLLoader
      .to('.loader', { rotation: 45, duration: 0.5 })
      .to('.loader .square', { rotation: 90 }, '-=0.5')
      .to('.loader .s1', { backgroundColor: '#36C5F0', duration: 0.2 })
      .to('.loader .s2', { backgroundColor: '#1EB67D', duration: 0.2 })
      .to('.loader .s4', { backgroundColor: '#E01E5A', duration: 0.2 })
      .to('.loader .s3', { backgroundColor: '#ECB22E', duration: 0.2 })
      .to('.loader .square', { borderRadius: 50, duration: 0.5 })
      .to('.loader', { rotation: 360, ease: "elastic.inOut(1, 0.3)", duration: 2.5 }, '-=0.5')
      .to('.loader .square', { borderRadius: 0, duration: 0.5 }, '-=0.5')
  }, [])

  const open = () => setModal(true)
  const close = () => setModal(false)
  let loading = false;

  return (
    <div>
      {modal &&
        <PostModal style="postModal" modal={modal} setModal={setModal} open={open} close={close}>
          <p>Create post</p>
          <div></div>
        </PostModal>
      }
      <div className='home-content-container'>
        <Sidebar className="menu-sidebar">
          <div className='sidebar-links'>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/friends">Friends</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/photos">Photos</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/videos">Videos</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/marketplace">Marketplace</NavLink>
            <NavLink className={({ isActive }) => isActive ? "activeClassName" : ""} to="/feeds" >Feeds</NavLink>
          </div>
        </Sidebar>
        <div>
          {loading ? (
            <div className='loader-container'>
              <div className="loader">
                <div className="square s1"></div>
                <div className="square s2"></div>
                <div className="square s3"></div>
                <div className="square s4"></div>
              </div>
            </div>
          ) : (
            <Card className="post-card">
              {currentUser?.map(v => {
                return (
                  <>
                    <div>
                      <img className='post-user-img' src={v.profileImage}></img>
                    </div>
                    <div onClick={open} className='open-modal'>
                      <p>What is in your mind ? {v.firstName} </p>
                    </div>
                  </>
                )
              })}
            </Card>
          )}
          {/* <Card className="post-card">
              <h1>Card</h1>
            </Card> */}
        </div>
        <Sidebar className="chat-sidebar">
          <p className='friends'>Friends</p>
        </Sidebar>
      </div>
    </div>
  )
}

export default Home;