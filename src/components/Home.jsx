import React from 'react'
import appFirebase from '../credential'
import StudentView from '../components/StudentView'
import CompanyView from '../components/CompanyView'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(appFirebase);

const Home = ({ user }) => {
  return (
    <div>
      HOME
      <button className='signOut-button' onClick={() => signOut(auth)}>Cerrar sesión</button>
      {user.rol == "Company" ? <CompanyView user={user.email} /> : <StudentView />}
    </div>
  )
}


export default Home;
