import React, { useContext } from 'react';
import { SignInUpContext } from '../context/loginContext.js';

const Auth = () => {
  const { handleLogin } = useContext(SignInUpContext);

  return (
    <div className="min-w-full min-h-screen flex items-center justify-center bg-gray-200">
      <button
        onClick={() => handleLogin()}
        className="border border-black mt-44 p-4"
      >
        Log in
      </button>
    </div>
  );
};

export default Auth;
