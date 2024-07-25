import { useState } from 'react'

//Importando los modulos de firebase
import appFirebase from '../src/credential'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from "firebase/firestore"


//importar nuestros componentes
import Login from '../src/components/Login'
import Home from '../src/components/Home'

import './App.css'


const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);


function App() {

  const [user, setUser] = useState(null);

  async function getRol(uid) {

    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef)
    const infoFinal = docuCifrada.data().rol
    return infoFinal
  }

  function setUserWithFirebaseAndRol(firebaseUser) {
    getRol(firebaseUser.uid).then((rol) => {
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        rol: rol,
      };
      setUser(userData);
    });

  }

  //onAuthStateChanged es para conocer el estado de la autenticación
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {

      if (!user) {
        setUserWithFirebaseAndRol(firebaseUser);
      }
    } else {
      setUser(null);
    }
  })

  return (
    <div>
      {user ? <Home user={user} /> : <Login />}
    </div>
  )
}

export default App
