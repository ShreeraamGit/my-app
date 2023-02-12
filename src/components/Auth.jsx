import React, { useContext } from 'react';
import Logo from '../assets/logo-mobile.svg';
import SignInwithEmail from './SignInwithEmail';
import { SignInUpContext } from '../context/loginContext.js';
import { useForm } from 'react-hook-form';

const Auth = () => {
  const { handleLogin } = useContext(SignInUpContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="min-w-full min-h-screen flex items-center justify-center bg-[#f9fafc]">
      <div className="rounded-xl bg-white p-10 w-full h-screen md:h-fit md:w-fit flex flex-col gap-10">
        <div className="flex flex-col justify-center items-center gap-4">
          <img className="h-[3.5rem] w-[3.5rem]" src={Logo} alt="Logo" />
          <h1 className="text-[24px] md:text-[32px]">
            Sign in to your account
          </h1>
        </div>
        <div className="">
          <SignInwithEmail
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;

/*<button
        onClick={() => handleLogin()}
        className="border border-black mt-44 p-4"
      >
        Log in
      </button>*/
