import React from 'react'
import classes from './contact.module.css'
import { Link } from 'react-router-dom'
import slideabout1 from '../../../assets/slideabout1.jpg'

const Contact = () => {
  return (
    <div className={classes.container}>
      <img src={slideabout1} alt=""/>
    <h1>Contact Us</h1>
    <p>
      We'd love to hear from you! Feel free to reach out using the contact information below:
    </p>
    <div className={classes.info}>
      <p>Email:  homehive@gmail.com</p>
      <p>Phone:  +94 728 789 456</p>
      <p>Address: Address: No.123 Kandy, Sri Lanka</p>
     
      
    </div>
  </div>
  )
}

export default Contact