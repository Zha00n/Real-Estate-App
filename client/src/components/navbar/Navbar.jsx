import React, { useState } from 'react'
import classes from './navbar.module.css'
import {Link, useNavigate} from 'react-router-dom'
import {BsHouseDoor} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { logout } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
  const [photo, setPhoto] =useState("")
  const [state, setState] = useState({})
  const [showForm, setShowForm] = useState(false)
  const {user, token} = useSelector((state) => state.auth)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }


  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }


  const handleCloseForm = () =>{
    setShowForm(false)
    setPhoto(null)
    setState({})
  } 

  const handleListProperty = async(e) => {
      e.preventDefault()

      let filename = null
      if(photo){
        const formData = new FormData()
        filename = crypto.randomUUID() + photo.name
        formData.append("filename", filename)
        formData.append("image", photo)

        await request(`/upload/image`, "POST", {}, formData, true)

      }else{
         return
      }
          
      try {
        const options = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
        

          const data = await request(`/property`, 'POST', options, {...state, img: filename})
          console.log(data)
          handleCloseForm()
      } catch (error) {
        console.error(error)
      }
  }

  return (
    <div className={classes.container}>
          <div onClick={scrollToTop} className={classes.wrapper}>
            <Link to='/' className={classes.left}>
            <BsHouseDoor /> Home Hive 
            </Link>
            <ul className={classes.center}>
              <Link className={classes.center} to='/'> <li className={classes.listItem}>Home</li> </Link>
              <Link className={classes.center} to='/featured'> <li className={classes.listItem}>Properties</li> </Link>
              <Link className={classes.center} to='/about'> <li className={classes.listItem}>About</li> </Link>
              <Link className={classes.center} to='/contact'> <li className={classes.listItem}>Contacts</li> </Link>
            </ul>
            <div className={classes.right}>
              {!user ? 
              <>
                  <Link to='/signup'>Sign up</Link>
                  <Link to='/signin'>Sign in</Link>
              </>
              : 
              <>
                <span>Hello {user.username}</span>
                <span onClick={handleLogout} className={classes.logoutBtn}>Logout</span>
                <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
              </>
              }
            </div>
          </div>

          {
              showForm && (
                <div className={classes.listPropertyForm} onClick={handleCloseForm} >
                    <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                      <h2>List Property</h2>
                      <form onSubmit= {handleListProperty}> 
                        <input type="text" placeholder='Title...' name='title' onChange={handleState}/>
                        <select value={state?.type} required name='type' onChange={handleState}>
                          <option disabled>Select Type</option>
                          <option value='beach'>Beach</option>
                          <option value='village'>Village</option>
                          <option value='mountain'>Mountan</option>
                        </select>
                        <input type="text" placeholder='Desc...' name='desc' onChange={handleState}/>
                        <select value={state?.province} name="province" onChange={handleState}>
                                <option disabled>Select Province</option>
                                <option value="Central Province">Central Province</option>
                                <option value="Eastern Province">Eastern Province</option>
                                <option value="North Central Province">North Central Province</option>
                                <option value="Northern Province">Northern Province</option>
                                <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                                <option value="Southern Province">Southern Province</option>
                                <option value="Uva Province">Uva Province</option>
                                <option value="Western Province">Western Province</option>
                        </select>
                        <input type="number" placeholder='Price...' name='price' onChange={handleState}/>
                        <input type="number" placeholder='Sq. meters...' name='sqmeters' onChange={handleState}/>
                        <input type="number" placeholder='Beds...' name='beds' step={1} min={2} onChange={handleState}/>

                        <div style={{display:'flex', alignItems:'center', gap: '12px', width: '50%'}}>
                            <label htmlFor='photo'>Property Picture <AiOutlineFileImage/></label>
                            <input 
                                type="file" 
                                id="photo" 
                                style={{display: 'none'}} 
                                onChange={(e) => setPhoto(e.target.files[0])}
                              />
                              {photo && <p>{photo.name}</p>}
                        </div>
                        <button>List Property</button>
                      </form>
                      <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>

                    </div>
                </div>
              )
          }

          {
            <div className={classes.mobileNav}>
              {showMobileNav &&
              <div className={classes.navigation}>
                  <Link to='/' className={classes.left}>
                      Home Hive <BsHouseDoor />
                  </Link>
                  <AiOutlineClose onClick={() => setShowMobileNav(false)} className={classes.mobileCloseIcon}/>
                  <ul className={classes.center}>
                    <li className={classes.listItem}>Home</li>
                    <li className={classes.listItem}>About</li>
                    <li className={classes.listItem}>Featured</li>
                    <li className={classes.listItem}>Contacts</li>
                  </ul>
                  <div className={classes.right}>
                    {!user ? 
                    <>
                        <Link to='/signup'>Sign up</Link>
                        <Link to='/signin'>Sign in</Link>
                    </>
                    : 
                    <>
                      <span>Hello {user.username}</span>
                      <span onClick={handleLogout} className={classes.logoutBtn}>Logout</span>
                      <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
                    </>
                    }
            </div>
            {
              showForm && !showMobileNav && (
                <div className={classes.listPropertyForm} onClick={handleCloseForm} >
                    <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                      <h2>List Property</h2>
                      <form onSubmit= {handleListProperty}> 
                        <input type="text" placeholder='Title...' name='title' onChange={handleState}/>
                        <select value={state?.type} required name='type' onChange={handleState}>
                          <option disabled>Select Type</option>
                          <option value='beach'>Beach</option>
                          <option value='village'>Village</option>
                          <option value='mountain'>Mountan</option>
                        </select>
                        <input type="text" placeholder='Desc...' name='desc' onChange={handleState}/>
                        <select value={state?.province} name="province" onChange={handleState}>
                                <option disabled>Select Province</option>
                                <option value="Central Province">Central Province</option>
                                <option value="Eastern Province">Eastern Province</option>
                                <option value="North Central Province">North Central Province</option>
                                <option value="Northern Province">Northern Province</option>
                                <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                                <option value="Southern Province">Southern Province</option>
                                <option value="Uva Province">Uva Province</option>
                                <option value="Western Province">Western Province</option>
                        </select>
                        <input type="number" placeholder='Price...' name='price' onChange={handleState}/>
                        <input type="number" placeholder='Sq. meters...' name='sqmeters' onChange={handleState}/>
                        <input type="number" placeholder='Beds...' name='beds' step={1} min={2} onChange={handleState}/>

                        <div style={{display:'flex', alignItems:'center', gap: '12px', width: '50%'}}>
                            <label htmlFor='photo'>Property Picture <AiOutlineFileImage/></label>
                            <input 
                                type="file" 
                                id="photo" 
                                style={{display: 'none'}} 
                                onChange={(e) => setPhoto(e.target.files[0])}
                              />
                              {photo && <p>{photo.name}</p>}
                        </div>
                        <button>List Property</button>
                      </form>
                      <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/>

                    </div>
                </div>
              )
            }
              </div> 
              }
              {!showMobileNav && <GiHamburgerMenu onClick={() => setShowMobileNav(prev => !prev)} className={classes.hamburgerIcon}/> }
            </div>
          }

     </div>
  )
}

export default Navbar