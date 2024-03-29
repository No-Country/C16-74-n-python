import React from 'react'
import Header from '../components/footer-header/Header.jsx'
import Footer from '../components/footer-header/Footer.jsx'
import PerfilP from '../components/PerfilP.jsx'
import Saludo from '../components/Saludo.jsx'
import SidebarUser from '../components/SidebarUser.jsx'
import '../stylesheets/PerfilProf.css'

const PerfilProf = () => {
  return (
    <div>
      <Header />
          <div className="main">
            <div className='side-novedadesp'>
              {localStorage.getItem('token') ? <SidebarUser /> : null}
              <PerfilP />
            </div>
          </div>
      <Footer />
    </div>
  )
}

export default PerfilProf