import React from 'react'
import StudentView from '../components/StudentView'
import CompanyView from '../components/CompanyView'


const Home = ({ user }) => {
  return (
    <div>
      HOME
      {user.rol == "Company" ? <CompanyView user={user.email} /> : <StudentView />}
      
    </div>
  )
}


export default Home;
