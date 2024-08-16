import React, { useEffect, useState } from 'react'
import classes from './featuredProperties.module.css'
import { request } from '../../util/fetchAPI'
import img from '../../assets/estate3.jpg'
import person from '../../assets/person.jpg'
import{Link} from 'react-router-dom'
import {FaBed, FaSquareFull} from 'react-icons/fa'

const FeaturedProperties = () => {
  const[featuredProperties, setFeaturedProperties] = useState([])



  useEffect(() => {
    const fetchFeatured = async() => {
      try {
        const data = await request('/property/find/featured', 'GET')
      
        setFeaturedProperties(data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchFeatured()
  }, [])


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Properties you may like</h5>
          <h2>Our Features Properties</h2>
        </div>
        <div className={classes.featuredProperties}>
          {featuredProperties?.map((property) => (
            <div className={classes.featuredProperty} key={property._id} >
              <Link className={classes.imgContainer} to={`/propertyDetail/${property._id}`} >
                <img src={`http://localhost:5000/images/${property.img}`} alt="" />
              </Link> 
              <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price}>{property?.price} LKR</span>
                  <img src={person} className={classes.owner}/>
                </div>
                <div className={classes.moreDetails}>
                  <span>{property?.beds} beds <FaBed className={classes.icon}/></span>
                  <span>{property?.sqmeters} square meters <FaSquareFull className={classes.icon}/></span>
                </div>
                <div className={classes.desc}>
                {property?.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default FeaturedProperties

