import React from 'react'
import Gofit from '../images/gofit.png'
import Promo1 from '../images/promo1.png'
import Promo2 from '../images/promo2.png'
import Promo3 from '../images/promo3.png'
import Promo4 from '../images/promo4.jpg'
import Searchbar from '../components/Searchbar.jsx'
import '../stylesheets/Home.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <div className="promos">
        <ul>
          <li>
            <img src={ Promo1 } alt="Promo 1" />
          </li>
          <li>
            <img src={ Promo2 } alt="Promo 2" />
          </li>
          <li>
            <img src={ Promo3 } alt="Promo 3" />
          </li>
          <li>
            <img src={ Promo4 } alt="Promo 4" />
          </li>
        </ul>
      </div>
      <div className="infos">
        <img src={ Gofit } alt="" />
        <div className="texto">        
          <p className="negrita">¿Tenés un espacio vacío entre dos actividades?</p>
          <p>Aprovecha tu tiempo y reservá un turno con el especialista más cercano con nuestra app de turnos, está diseñada para hacer tu vida más fácil y
            eficiente.</p>
          <p>Reserva tu turno en cualquier lugar donde te encuentres. ¡Es rápido, conveniente y sin estrés!</p> 
          <p>¿Qué más puedes hacer con nuestra app de turnos?</p>
            <ul>
              <li><span className="negrita">Flexibilidad Total:</span> Elige el día y la hora que mejor se adapten a tu agenda.</li>
              <li><span className="negrita">Notificaciones en Tiempo Real:</span> Recibe recordatorios y actualizaciones automáticas sobre tus citas.</li>
              <li><span className="negrita">Reservas para Toda la Familia:</span> Gestiona los turnos de tus seres queridos en una sola plataforma.</li> 
              <li><span className="negrita">Interfaz Intuitiva:</span> Navega sin esfuerzo por nuestra aplicación con una interfaz fácil de usar.</li>
            </ul>
          <p className="negrita">¡No pierdas más tiempo valioso esperando!</p>
          <p>Descarga nuestra app de turnos hoy mismo y experimenta la conveniencia en tus manos.</p>
          <p>¡Tu tiempo es importante, úsalo sabiamente con nuestra aplicación!</p>
        </div>
      </div>
      <br />
      <br />
      <Searchbar/>
      <br />
      <br />
      <div id="contenedor-registrar">
        <Link style={{ textDecoration: 'none' }} to={'/nuevo-profesional'}><input type="submit" name="registro_profesional" value="Publica tus clases" className="registroHome hover" /></Link>
        <Link style={{ textDecoration: 'none' }} to={'/nuevo-usuario'}><input type="submit" name="registro_usuario" value="Reserva tu turno" className="registroHome hover" /></Link>  
      </div>
    </div>
  )
}

export default HomePage