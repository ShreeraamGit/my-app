import { createContext } from 'react';

import {
  getAuth,
  setPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  browserSessionPersistence,
  signOut,
} from 'firebase/auth';
import { app } from '../utils/firebaseClient';

export const SignInUpContext = createContext({});

export const SignInUpProvider = ({ children }) => {
  const auth = getAuth(app);

  const handleLogin = () => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log(errorCode);
        });
    });
  };

  const handleFacebookLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        console.log(errorCode);
      });
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const value = { handleLogin, handleFacebookLogin, handleSignOut };
  return (
    <SignInUpContext.Provider value={value}>
      {children}
    </SignInUpContext.Provider>
  );
};
