import './styles/globalStyles.css';
import { app } from './utils/firebaseClient';
import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UsersContext } from './context/usersContext';
import Auth from './components/Auth';
import Home from './Routes/Home';

function App() {
  const { users, setUsers } = useContext(UsersContext);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUsers(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <div className="">
      <div className="">{!users ? <Auth /> : <Home />}</div>
    </div>
  );
}

export default App;
