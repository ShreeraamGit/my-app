import './styles/globalStyles.css';
import { app } from './utils/firebaseClient';
import { useEffect, useContext, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UsersContext } from './context/usersContext';
import Auth from './components/Auth';
import Home from './Routes/Home';
import { AddDataContext } from './context/addDataContext';

function App() {
  const { users, setUsers } = useContext(UsersContext);
  const { writeData, writeUsers } = useContext(AddDataContext);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (users) {
      writeData();
    }
  }, [users]);

  useEffect(() => {
    if (users) {
      writeUsers(users);
    }
  }, [users]);

  return (
    <div className="">
      <div className="">{!users ? <Auth /> : <Home />}</div>
    </div>
  );
}

export default App;

/*const query = collection(
    db,
    'data/0Nvrcm79gngX80LJxYNR5xyoaFD3/boardsDetail',
  );
  const [docs, laoding, error] = useCollectionData(query);

  console.log(docs);*/
