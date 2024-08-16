import React from 'react'
import classes from './signin.module.css'
import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { request } from '../../util/fetchAPI'
import { login } from '../../redux/authSlice'


const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const handleLogin =async(e) => {
      e.preventDefault()


      try {
        const options = {
          'Content-Type' : 'application/json'
        }

        const data = await request('/auth/login', "POST", options, {email, password})
        dispatch(login(data))
        navigate("/")


      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='email...' onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='password...' onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Sign in</button>
          <p>Don't have an accoun? <Link to='/signup'>Sign up</Link></p>

        </form>
      </div>
    </div>
  )
}

export default Signin