import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserAsync } from '../../Store/Users/AsyncUser';
import './Home.css'

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

  const isLoading = true;

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
        <h1>Home</h1>
      )}
    </div>
  )
}

export default Home;