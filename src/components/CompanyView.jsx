import React from 'react'

function CompanyView({ user }) {
  return (
    <div style={{ width: "300px", margin: "0 auto 0" }}>
      <h1 style={{ color: "#FFF" }}>
        Bienvenido, {user}
      </h1>
    </div>
  )
}

export default CompanyView
