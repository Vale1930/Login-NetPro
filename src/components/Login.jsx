import React, { useState } from 'react'
import Image from '../assets/login.png'
import ImageUser from '../assets/netpro.jpeg'
import Swal from 'sweetalert2'
import appFirebase from '../credential'
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(appFirebase)

function Login() {

  const firestore = getFirestore(appFirebase);
  const [register, setRegister] = useState(false);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  function funcAutentication(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const rol = e.target.rol.value;

    if (register) {
      registrarUsuario(email, password, rol);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            title: "El correo o la contraseña son incorrectos",
            icon: "error"
          })
        });
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        {/*Columna más pequeña formulario*/}
        <div className='col-md-4'>
          <div className='father'>
            <div className='card card-body shadow-lg'>
              <img src={ImageUser} alt='' className='logotipo' />
              <form onSubmit={funcAutentication}>
                <input type='text' placeholder='Ingresar email' className='textBox' id='email' />
                <input type='password' placeholder='Ingresar contraseña' className='textBox' id='password' />
                <label> Rol:
                  <select id='rol'>
                    <option value="student">Estudiante</option>
                    <option value="Company">Empresa</option>
                  </select>
                </label>

                <button className='btnform'>{register ? "Registrate" : "Inicia Sesión"}</button>
              </form>
              <h4 className='text'>{register ? "Si ya tienes cuenta" : "¿No tienes una cuenta? "}
                <button className='btnswitch' onClick={() => setRegister(!register)}>{register ? "Inicia Sesión" : "Registrate"}</button></h4>
            </div>
          </div>
        </div>
        {/*Columna más grande formulario*/}
        <div className='col-md-8'>
          <img src={Image} alt="" className='size-image' />
        </div>
      </div>
    </div>
  )
}

export default Login
