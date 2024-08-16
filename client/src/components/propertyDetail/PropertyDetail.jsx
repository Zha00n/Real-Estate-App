import React, { useEffect, useRef, useState } from 'react'
import classes from './propertyDetail.module.css'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import emailjs from '@emailjs/browser'
import person from '../../assets/person.jpg'

const PropertyDetail = () => {
  const {user} = useSelector((state) => state.auth)
  const [propertyDetail, setPropertyDetail] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const {id} = useParams()
  const formRef = useRef()

  const serviceId = process.env.REACT_APP_SERVICE_ID
  const templateId = process.env.REACT_APP_TEMPLATE_ID
  const publicKey = process.env.REACT_APP_PUBLIC_KEY
  




  useEffect(() => {
    const fetchDetails = async() => {
      try {
        const data = await request(`/property/find/${id}`, 'GET')
        setPropertyDetail(data)

        
      } catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [id])

  const handleCloseForm = () => {
    setShowForm(false)
    setTitle("")
    setDesc("")
  }

  const handleContactOwner = async(e) => {
      e.preventDefault()

      //send email logic

      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => console.log(result))
      .catch((err) => console.log(err))


  }

  console.log(user)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${propertyDetail?.img}`}/>
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Tittle: {`${propertyDetail?.title}`}
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndContinent}>
              <div>Type: <span>{`${propertyDetail?.type}`}</span> </div>
              <div>Province: <span>{`${propertyDetail?.province}`}</span> </div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: </span>{`${propertyDetail?.price}`} LKR</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                Owner: {propertyDetail?.currentOwner?.profileImg
                  ? (
                    <img src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}`} className={classes.owner} />
                  ) : (
                    <img src={person} className={classes.owner} />)
                }</span>
            </div>
            <div className={classes.moreDetails}>
              <span>{propertyDetail?.beds} <FaBed className={classes.icon}/></span>
              <span>{propertyDetail?.sqmeters} <FaSquareFull className={classes.icon}/></span>
            </div>

          </div>
              <p className={classes.desc}>
                Desc: <span>{`${propertyDetail?.desc}`}</span>
              </p>
              <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
                Contact Owner
              </button>
        </div> 
      </div>
      {
        showForm &&
        <div className={classes.contactForm} onClick={handleCloseForm}>
          <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>Send Email To Owner</h2>
            <form onSubmit={handleContactOwner} ref={formRef}>
              <input value={user?.email} type="text" placeholder='My email' name="from_email" />
              <input value={user?.username} type="text" placeholder='My username' name="from_username" />
              <input value={propertyDetail?.currentOwner?.email} type="email" placeholder='Owner email' name="to_email" />
              <input type="text" placeholder='Tittle' name="from_tittle" />
              <input value={desc} type="text" placeholder='Desc' name="message" onChange={(e) => setDesc(e.target.value)} />
              <button>Send</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>
        </div>
      }
    </div>
  )
}

export default PropertyDetail