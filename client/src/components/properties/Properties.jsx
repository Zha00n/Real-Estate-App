import React, { useEffect, useState } from 'react'
import classes from './properties.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import { AiOutlineSearch } from 'react-icons/ai'
import {FaBed, FaSquareFull} from 'react-icons/fa'
import { provinceToIdx } from '../../util/idxToProvince'
import person from '../../assets/person.jpg'

const Properties = () => {
  const [allProperties, setAllProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const[state, setState] = useState(null)
  const query = (useLocation().search).slice(1)
  const arrQuery = query.split("&")
  const navigate = useNavigate()

  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async() => {
        const data = await request(`/property/getAll`, 'GET')
        setAllProperties(data)
    }
    fetchAllProperties()

  }, [])

  // parsing query params
  useEffect(() => {
    if(arrQuery && allProperties?.length > 0 && state === null){
      let formattedQuery = {}


      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0]
        const value = option.split("=")[1]


        formattedQuery = {...formattedQuery, [key]: value}


        //if last index, assign formattedQuery to state
        if (idx === arrQuery.length - 1) {
          setState(formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }

  }, [allProperties, arrQuery])

  const handleSearch = (param = state) => {
    let options

    if(param?.nativeEvent){
      options = state
    }else {
      options = param
    }
    

    const filteredProperties = allProperties.filter((property) => {
      const priceRange = arrPriceRanges[options.priceRange]
      const minPrice = Number(priceRange.split('-')[0])
      const maxPrice = Number(priceRange.split('-')[1])
      const province = provinceToIdx(property.province)
     
           
      if(
        property.type === options.type
        && province === Number(options.province)
        && property.price >= minPrice && property.price <= maxPrice
      ){
        return property
      }
    })

    const queryStr = `type=${options.type}&province=${options.province}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, {replace: true})
    setFilteredProperties(filteredProperties)
  }


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
        <select value={state?.type} name="type" onChange={handleState}>
            <option style={{color:'black'}} disabled>Select type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select value={state?.priceRange} name="priceRange" onChange={handleState}>
            <option style={{color:'black'}} disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select>
          <select value={state?.province} name="province" onChange={handleState}>
              <option style={{color:'black'}} disabled>Select Province</option>
              <option value="0">Central Province</option>
              <option value="1">Eastern Province</option>
              <option value="2">North Central Province</option>
              <option value="3">Northern Province</option>
              <option value="4">Sabaragamuwa Province</option>
              <option value="5">Southern Province</option>
              <option value="6">Uva Province</option>
              <option value="7">Western Province</option>
            </select>
            <button className={classes.searchBtn}>
              <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
            </button>
        </div>
        {filteredProperties?.length > 0 ?(
          <>
            <div className={classes.titles}>
                <h5>Selected properties</h5>
                <h2>Property you may like</h2>
            </div>
            <div className={classes.properties}>
          {filteredProperties?.map((property) => (
            <div className={classes.property} key={property._id} >
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
            
          </> 
          ) : <h2 className={classes.noProperty}>We have no properties with the specified options.</h2>}
      </div>
    </div>
  )
}

export default Properties