import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserAsync } from '../../Store/Users/AsyncUser';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Card from '../../Component/Card/Card';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  console.log(state);
  const TLLoader = gsap.timeline({ repeat: -1 });

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

  const isLoading = false;

  useEffect(() => {
    dispatch(setCurrentUserAsync())
  }, [])

  return (
    <div>
      {isLoading ? (
        <div className='loader-container'>
          <div className="loader">
            <div className="square s1"></div>
            <div className="square s2"></div>
            <div className="square s3"></div>
            <div className="square s4"></div>
          </div>
        </div>
      ) : (
        <div className='home-content-container'>
          <Sidebar className="home-sidebar-menu">
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
            <Card className="post-card">
              <h1>Card</h1>
            </Card>
            <Card className="post-card">
              <h1>Card</h1>
            </Card>
          </div>
          <Sidebar className="chat-sidebar">
            <h1>Friends</h1>
          </Sidebar>
        </div>
      )}
    </div >
  )
}

export default Home;