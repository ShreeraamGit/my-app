import React from 'react';
import Logo from '../assets/logo-mobile.svg';
import SignInwithEmail from './SignInwithEmail';
import LoginWithSocial from './LoginWithSocial';
import { useForm } from 'react-hook-form';

const Auth = () => {
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
    <div className="min-w-screen min-h-screen flex md:items-center md:justify-center justify-start bg-[#f9fafc]">
      <div className="flex flex-col mt-10 md:mt-0 justify-center items-center gap-12 md:gap-20 w-full h-fit p-3">
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            className="h-[1.5rem] w-[1.5rem] md:h-[3.5rem] md:w-[3.5rem]"
            src={Logo}
            alt="Logo"
          />
          <h1 className="text-[20px] md:text-[32px] font-extrabold">
            Sign in to your account
          </h1>
        </div>
        <div className="rounded-xl bg-[#ffffff] p-5 md:p-10 w-full h-fit md:h-fit md:w-[30rem] flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <SignInwithEmail
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
            />
            <LoginWithSocial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
