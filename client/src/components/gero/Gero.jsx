import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import classes from './gero.module.css'

const Gero = () => {
  const [type, setType] = useState("beach")
  const [province, setProvince] = useState("0")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/properties?type=${type}&province=${province}&priceRange=${priceRange}`)
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
      <h2>Find Your Dream Home...</h2>
      <h5>"Join the hive and find your perfect home with HomeHive."</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option style={{color:'black'}} disabled>Select type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option style={{color:'black'}} disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select>
          <select onChange={(e) => setProvince(e.target.value)}>
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
          <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
        </div>
      </div>
    </div>
  )
}

export default Gero