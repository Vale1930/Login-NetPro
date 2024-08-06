import React, { useContext } from 'react'
import { FormContext } from '../components/FormContext';
import appFirebase from '../credential';
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(appFirebase);


function StudentView() {

  const { forms } = useContext(FormContext);

  return (
    <div>
      <div className='title'>
        <h1 >NetPro</h1>
      </div>
      <div className='container-button-singOut'>
        <button className='signOut-button' onClick={() => signOut(auth)}>Cerrar sesión</button>
      </div>
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

      <div className='vacantes'>
        <div className='title2'><h3>Vacantes disponibles</h3></div>
        <div className="row">
             {forms.map((form) => (
                <div key={form.id} className="col-md-6">
                    <div className="dishes-container">
                        <h3>{form.company}</h3>
                        <p><div className='LetrasEnNegritas'><p>Vacante solicitada:</p></div> {form.name}</p>
                        <p><div className='LetrasEnNegritas'><p>Número de participantes:</p></div> {form.participants}</p>
                        <p><div className='LetrasEnNegritas'><p>Descripción:</p></div> {form.description} </p>
                        <p><div className='LetrasEnNegritas'><p>Categoría:</p></div> {form.category}</p>
                        <p><div className='LetrasEnNegritas'><p>Correo de contacto:</p></div> {form.contact}</p>
                    </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default StudentView
