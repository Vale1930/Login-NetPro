import { useState} from 'react'
import React, { useContext } from 'react'
import { FormContext } from '../components/FormContext';
import { saveForm, getForms, onGetForms, deleteForm, getForm, updateForm } from '../credential';
import { Modal, Button } from 'react-bootstrap';
import appFirebase from '../credential';
import { getAuth, signOut } from 'firebase/auth'


const auth = getAuth(appFirebase);

function CompanyView({ user }) {
  const { forms } = useContext(FormContext);
  const [editStatus, setEditStatus] = useState(false);
  const [formId, setFormId] = useState('');
  const [formToDelete, setFormToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    participants: '',
    description: '',
    category: '',
    contact: ''
  });

  const [error, setError] = useState('');


  const handleDelete = (id) => {
    setFormToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteForm(formToDelete).then(() => {
      setShowModal(false);
    }).catch(error => {
      console.error("Error eliminando el platillo: ", error);
    });
  };

  const handleEdit = async (id) => {
    const doc = await getForm(id);
    const form = doc.data();
    setFormData({
      name: form.name,
      company: form.company,
      participants: form.participants,
      description: form.description,
      category: form.category,
      contact: form.contact,
    });
    setEditStatus(true);
    setFormId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.participants < 1) {
      setError('El número de participantes debe ser mayor o igual a 1.');
      return;
    }
    if (!editStatus) {
      saveForm(formData.name, formData.company, formData.participants, formData.description, formData.category, formData.contact);
    } else {
      updateForm(formId, formData);
      setEditStatus(false);
    }
    setFormData({
      name: '',
      company: '',
      participants: '',
      description: '',
      category: '',
      contact: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "participants") {
      if (!/^\d*$/.test(value)) {
        setError('Solo se permiten números.');
      } else if (parseInt(value) < 1) {
        setError('El número de participantes debe ser mayor o igual a 1.');
      } else {
        setError('');
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div>
      <div className='title'>
        <h1>NetPro</h1>
      </div>
      <div className='container-button-signOut'>
        <button className='signOut-button' onClick={() => signOut(auth)}>Cerrar sesión</button>
      </div>
      <h1 style={{ color: "#FFF", textAlign: 'center' }}>
        Bienvenid@, {user}
      </h1>
      <div className='container-1'>
        <section className='intro'>
          <h2>APRENDIZAJE REMOTO CON NETPRO</h2>
          <p>Bienvenido a NetPro, la plataforma que conecta a empresas con estudiantes universitarios para resolver problemas reales.</p>
          <p>Creemos que la educación debe ser accesible para cualquier estudiante, en cualquier lugar y en cualquier momento.</p>
          <p>Lee más para conocer cómo funciona nuestro programa, la asignación de proyecto y mucho más.</p>
        </section>

        <section id='como-funciona'>
          <h2>CÓMO FUNCIONA NETPRO</h2>
          <p>En NetPro, cada estudiante tiene un camino individual y personalizado que se adapta específicamente a sus objetivos, nivel de habilidad y ritmo de estudio.</p>
          <p>Nuestros estudiantes reciben educación de calidad de maestros capacitados que están disponibles siempre a través de los canales en línea.</p>
          <p>Estamos aquí para proporcionar la experiencia de aprendizaje flexible que necesitas.</p>
        </section>

        <section id='opiniones'>
          <h2>OPINIONES DE NUESTROS ESTUDIANTES/EMPRESAS</h2>
          <p>En NetPro valoramos mucho a nuestros usuarios.</p>
          <p>Te invitamos a leer algunas reseñas exclusivas y descubrir por ti mismo cómo NetPro ayuda a empresas y estudiantes en alcanzar sus objetivos.</p>
          <p>Añade tu comentario en la página oficial de Instagram @NetProTech</p>
        </section>
      </div>

      <div className='title2'>
        <h3 >Registra tu proyecto</h3>
      </div>

      <div className="container p-4">
        <div className="row">
          <div className="col-md-6" id="data-container">
            {forms.map((form) => (
              <div key={form.id} className="dishes-container">
                <h3>{form.company}</h3>
                <p><div className='LetrasEnNegritas'><p>Vacante solicitada:</p></div> {form.name}</p>
                <p><div className='LetrasEnNegritas'><p>Número de participantes:</p></div> {form.participants}</p>
                <p><div className='LetrasEnNegritas'><p>Descripción:</p></div> {form.description} </p>
                <p><div className='LetrasEnNegritas'><p>Categoría:</p></div> {form.category}</p>
                <p><div className='LetrasEnNegritas'><p>Correo de contacto:</p></div> {form.contact}</p>
                <button
                  className='btn-eliminar btn btn-danger'
                  onClick={() => handleDelete(form.id)}
                >
                  FINALIZAR
                </button>
                <button
                  className='btn-editar btn btn-success'
                  onClick={() => handleEdit(form.id)}
                >
                  EDITAR
                </button>
              </div>
            ))}
          </div>

          <div className="col-md-6 crud-form">
            <div className="card">
              <div className="card-body">
                <h1 className="h3">Registro de proyecto</h1>
                <form id="task-form" onSubmit={handleSubmit}>
                  <label htmlFor="company">Nombre de la empresa:</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Actosoft"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                  />

                  <label htmlFor="name">Vacante solicitada:</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Becario de sistemas computacionales"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <label htmlFor="participants">No. de participantes:</label>
                  <input
                    className="form-control mb-3"
                    type="number"
                    placeholder="55"
                    id="participants"
                    name="participants"
                    required
                    value={formData.participants}
                    onChange={handleChange}
                  />

                  <div className="description-container">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                      className="form-control mb-3"
                      id="description"
                      rows="5"
                      placeholder="El estudiante debe desarrollar un software que mejore la sincronización de datos en tiempo real, optimizar el seguimiento de productos y reducir errores de inventario, utilizando tecnologías como aprendizaje automático."
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>

                    <label htmlFor="category">Categoría:</label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Estudiantes de primeros años">Estudiantes de primer año</option>
                      <option value="Estudiantes de medio trayecto">Estudiantes de medio trayecto</option>
                      <option value="Estudiantes de último año">Estudiantes de último año</option>
                      <option value="Egresados de menos de 1 año">Egresados de menos de 1 año</option>
                      <option value="Internship">Internship</option>
                    </select>

                    <div className="email">
                      <label htmlFor="contact">Correo de contacto:</label>
                      <input
                        className="form-control mb-3"
                        type="text"
                        placeholder="Actosoft@live.com"
                        id="contact"
                        name="contact"
                        required
                        value={formData.contact}
                        onChange={handleChange}
                      />
                    </div>
                    <button className="btn btn-primary btn-create" id="button-create">AGREGAR</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Finalizar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro que deseas finalizar el proyecto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompanyView
