import React, { useContext } from 'react';
import { SignInUpContext } from '../context/loginContext';
import { BsGoogle } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';

const LoginWithSocial = () => {
  const { handleLogin } = useContext(SignInUpContext);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex justify-center items-center">
        <hr className="w-[32%] h-[0.10rem] bg-black" />
        <p className="p-2 text-[12px]">Or Continue With</p>
        <hr className="w-[32%] h-[0.10rem] bg-black" />
      </div>
      <div className="flex justify-around items-center">
        <BsGoogle
          onClick={() => handleLogin()}
          className="h-[1.8rem] w-[1.8rem] md:h-[2rem] md:w-[2rem] cursor-pointer"
        />
        <BsFacebook className=" h-[1.8rem] w-[1.8rem] md:h-[2rem] md:w-[2rem] cursor-pointer" />
        <BsTwitter className=" h-[1.8rem] w-[1.8rem] md:h-[2rem] md:w-[2rem]cursor-pointer" />
      </div>
    </div>
  );
};

export default LoginWithSocial;

/*<button
        onClick={() => handleLogin()}
        className="border border-black mt-44 p-4"
      >
        Log in
      </button>*/
