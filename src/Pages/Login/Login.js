import React, { useEffect, useState } from 'react';
import Button from '../../Component/Button/Button';
import Input from '../../Component/Input/Input';
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../Config/Firebase';
import { setToken } from '../../Store/Users/UserSlice';
import { useDispatch } from 'react-redux';
import gsap from 'gsap';
import './Login.css';
import { doc, updateDoc } from 'firebase/firestore';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
  }, [loading])

  const handleSubmit = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        dispatch(setToken(res.user.uid))
        await updateDoc(doc(firestore, "users", res.user.uid), {
          isOnline: true,
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log("err")
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className='loader-container'>
        <div className="loader">
          <div className="square s1"></div>
          <div className="square s2"></div>
          <div className="square s3"></div>
          <div className="square s4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className='login-form-container'>
      <div className='login-form'>
        <p className='singin'>Sign in</p>
        <Input className="login-input" placeholder="Email or username" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input className="login-input" placeholder="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="login-btn" title="Sign in" onClick={handleSubmit} />
        <div className='forgot-password-container'>
          <a className='forgot-password' href='#'>Forgot your password?</a>
        </div>
        <div className='grey-line'></div>
        <p className='dont-have-account'>Don’t have a free account yet?</p>
        <Link to="/signup">
          <Button className="create-account-btn-2" title="Create your account" />
        </Link>
      </div>
    </div>
  )
}

export default Login; 