import React, { useState } from 'react'
import '../stylesheets/ProfesionalEdit.css'
import image from '../images/image.jpg'
import { MdAddAPhoto } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import axios from 'axios';


const ProfEdit = () => {
  // Formulario utilizado para editar datos a un usuario existente
  // https://render-api-a6du.onrender.com/user/professional
  const [formData, setFormData] = useState({
    // id: localStorage.getItem('id'),
    id: 1,
    first_name: '',
    last_name: '',
    email: '',
    description: '',
    city: '',
    province: '',
    cbu: '',
    bank: '',
    photo: null,
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData); // Temporal; solo para probar
  };

  // Función para manejar cambios en la imagen
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   // Agregar campo de "foto" al objeto `formData`
  //   reader.onloadend = () => {
  //     setFormData({...formData, image: reader.result}); // Reemplaza la imagen por defecto con la subida
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    console.log(formDataToSend);
    try {
      const response = await axios.post('http://127.0.0.1:5000/editar-profesional/' + formData.id, formDataToSend);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  // Esta variable se debe llenar con los turnos registrados en la base de datos utilizando un useEffect
  const [additionalRows, setAdditionalRows] = useState([
    {
      day: 'martes',
      date: '05-03-2024',
      time: '15:00',
      category: 'Boxeo',
      price: '5000',
      capacity: '15',
    },
  ]);

  // Variable para agregar turnos
  const [newRow, setNewRow] = useState({
    day: '',
    date: '',
    time: '',
    category: 'Boxeo',
    price: '',
    capacity: '',
  });

  // Función para agregar turnos
  const addRow = () => {
    setAdditionalRows((prevState) => [...prevState, { ...newRow }]);
    setNewRow({ day: '', date: '', time: '', price: '', capacity: '' }); // Limpia el formulario
  };

  // Función para manejar cambios en los turnos
  const handleRowChange = (event) => {
    setNewRow({ ...newRow, [event.target.name]: event.target.value });
    console.log(newRow); // Temporal; solo para probar
  }

  return (
    <div className="todo">
      <form onSubmit={handleSubmit}>
        <div className="cuerpoEdit">
          <div>
            <div className="info-1">
              <p className='tituloInfo'>Información personal</p>
              <div>
                <div className="imagen-subir">
                  <img className="fotoSubir" src={formData.photo ? URL.createObjectURL(formData.photo) : image} alt="Imagen de perfil" />
                  <input id="file-upload" type="file" className="imagen-subir-input" onChange={handleImageUpload} accept="image/*" />
                </div>
                <div className="fila">
                  <input className="editP" type="text" placeholder="Nombre" required name="first_name" value={formData.first_name} onChange={handleChange} />
                  <input className="editP" type="text" placeholder="Apellido" required name="last_name" value={formData.last_name} onChange={handleChange} />
                </div>
                <div className="fila">
                  <input className="editP" type="email" name="email" id="email" required placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="fila">
                  <input className="editP" type="number" placeholder="CBU" required name="cbu" value={formData.cbu} onChange={handleChange} />
                  <input className="editP" type="text" placeholder="Banco" required name="bank" value={formData.alias} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="info-2">
              <p className='tituloInfo'>Informacion profesional</p>
              <div>
                <textarea name="description" id="descripcion" placeholder="Descripción" value={formData.description} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="contenedor-guardar">
          <input className="guardar hover" type="submit" name="guardar" value="Guardar" />
        </div>
      </form>
      <p className='h2NvosTurnos'>Agendá nuevos turnos</p>
      {additionalRows.map((row, index) => (
        <div className='turnoAgendar' key={index}>
          <input className="editP2" readOnly={true} value={row.day} />
          <input className="editP2" readOnly={true} value={row.date} />
          <input className="editP2" readOnly={true} value={row.time} />
          <input className="editP2" readOnly={true} value={row.price} />
          <input className="editP2" readOnly={true} value={row.capacity} />
        </div>
      ))}
      <div className="turnoAgendar">
        <select name="day" id="dia" value={newRow.day} onChange={handleRowChange} className='editP2'>
          <option value="lunes">Lunes</option>
          <option value="martes">Martes</option>
          <option value="miercoles">Miércoles</option>
          <option value="jueves">Jueves</option>
          <option value="viernes">Viernes</option>
          <option value="sabado">Sábado</option>
        </select>
        <input className="editP2" type="date" name="date" required value={newRow.date} onChange={handleRowChange} />
        <input className="editP2" type="time" name="time" required value={newRow.time} onChange={handleRowChange} />
        <input className="editP2" type="number" min="0" name="price" required placeholder="Precio" value={newRow.price} onChange={handleRowChange} />
        <input className="editP2" type="number" min="0" name="capacity" required placeholder='Cupo' value={newRow.capacity} onChange={handleRowChange} />
        <div className="mas hover">
          <span onClick={addRow}> <FaPlus /></span>
        </div>
        <br />

      </div>
    </div>
  );
}

export default ProfEdit
