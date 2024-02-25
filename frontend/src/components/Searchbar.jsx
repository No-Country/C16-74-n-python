import React from 'react'
import '../stylesheets/Searchbar.css'
import { Link } from 'react-router-dom'

const Searchbar = () => {
  return (
    <div className="searchbar">
      <h2 className="h2">Buscar</h2>
      <div className='inputsBuscador'>
        <div>  
          <input type="text" name="barrio" placeholder="Barrio" />
        </div>
        <div>
          <input type="text" name="provincia" placeholder="Provincia/Estado" />
        </div>
        <div>
          <select name="disciplina">
            <option value="">Todas las disciplinas</option>
            <option value="Boxeo">Boxeo</option>
            <option value="Zumba">Zumba</option>
            <option value="Crossfit">Crossfit</option>
            <option value="Gap">Gap</option>
            <option value="Pilates">Pilates</option>
          </select>
        </div>
      <div>
        <Link style={{textDecoration: 'none'}} to={'/search'}><input className='buscar hover' type="submit" name="buscar" value="Buscar" /></Link>
      </div>
    </div>
  </div>
  )
}

export default Searchbar