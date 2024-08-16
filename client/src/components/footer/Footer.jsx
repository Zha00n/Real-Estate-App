import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
          HomeHive is a modern real estate app service dedicated to simplifying the home-buying and selling experience. 
          With an emphasis on user-centric design and innovative features, HomeHive seeks to transform the real estate industry. 
          The platform offers a comprehensive property search, personalized user profiles, and virtual tours for in-depth property exploration.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +94 728 789 456</span>
           <span>Email:  homehive@gmail.com</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Address: No.123 Kandy, Sri Lanka</span>
          <span></span>
          <span></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer