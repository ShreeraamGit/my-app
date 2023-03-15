import React from 'react';

const SignInwithEmail = ({ handleSubmit, onSubmit, register }) => {
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label className="text-[16px] md:text-[20px]">Email address</label>
        <input
          type="email"
          className="border py-3 px-4 border-black rounded-lg"
          {...register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[16px] md:text-[20px]">Password</label>
        <input
          type="password"
          className="border py-3 px-4 border-black rounded-lg w-full"
          {...register('password', { required: true, maxLength: 12 })}
        />
        <button className="text-[#635FC7] font-extrabold text-[15px] md:text-[18px] text-right">
          Forgot Password
        </button>
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        name="submit"
        className="border text-[15px] md:text-[20px] font-bold py-4 px-4 text-white rounded-xl bg-[#635FC7]"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInwithEmail;
