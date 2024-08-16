import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import PopularProperties from './components/popularProperties/PopularProperties';
import Newsletter from './components/newsletter/Newsletter';
import FeaturedProperties from './components/featuredProperties/FeaturedProperties';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Properties from './components/properties/Properties';
import PropertyDetail from './components/propertyDetail/PropertyDetail';
import Gero from './components/gero/Gero';
import About from './components/pages/about/About';
import Contact from './components/pages/contact/Contact';
import AllProperties from './components/allProperties/AllProperties';
import 'bootstrap/dist/css/bootstrap.css';






function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={
        <>
          <Navbar />
          <Gero />
          <PopularProperties />
          <FeaturedProperties />
          <Newsletter />
          <Footer />
        </>


        } />
        

        <Route path='/properties' element={
        <>
        <Navbar />
        <Properties />
        <Footer />
        </>} />

        <Route path='/propertyDetail/:id' element={
          <>
          <Navbar />
          <PropertyDetail />
          <Footer />
          </>
        } />


        <Route path='/about' element={
          <>
          <Navbar/>
          <About/>
          <Footer/>
          
          </>
        } />


        <Route path='/contact' element={
          <>
          <Navbar/>
          <Contact/>
          <Newsletter />
          <Footer/>
          
          </>
        } />


        <Route path='featured' element={
        <>
          <Navbar />
          <AllProperties/>
          <Footer />
        </>
        } />

        



        <Route path='/signup' Component={Signup} />
        <Route path='/signin' Component={Signin} />
        

        

        
      </Routes>
    </div>
  );
}

export default App;
