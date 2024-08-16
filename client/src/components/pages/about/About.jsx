import React from 'react'
import classes from './about.module.css';
import slideabout1 from '../../../assets/slideabout1.jpg'
import about2 from '../../../assets/about2.jpg'

const about = () => {
  return (

    <div className={classes.container}>
      <div className={classes.wrapper}>
      
        <div className={classes.text}>
          <h2>Welcome to HomeHive</h2>
          <div className={classes.about}>
            <img className={classes.image} src={slideabout1} alt=""/>
          <p>
            " HomeHive is a modern real estate service dedicated to simplifying the home-buying and selling experience. With an emphasis on user-centric design and innovative features, HomeHive seeks to transform the real estate industry. The platform offers a comprehensive property search, personalized user profiles, and virtual tours for in-depth property exploration. Users can engage directly with real estate agents, receive real-time market insights, and benefit from secure transaction processes. HomeHive's mission is to provide transparency, efficiency, and enjoyment throughout the real estate journey, fostering a future where technology empowers individuals in their property endeavors
          <br/>
          <br/>
            HomeHive envisions a real estate landscape accessible to all, guided by innovation, integrity, and customer satisfaction. The platform aspires to be a trusted partner for users, offering not just property listings but a seamless and enjoyable experience. With a commitment to transparency and personalized service, HomeHive aims to redefine the way individuals engage with real estate, making it a seamless and empowering process for buyers and sellers alike. For the most accurate and current information about HomeHive, users are encouraged to visit the official website or contact customer support directly. "

          </p>

          </div>
        </div>
      </div>
    </div>

  )
}

export default about