import React from 'react';

const SignInwithEmail = ({ handleSubmit, onSubmit, register }) => {
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] md:text-[15px]">Email Address</label>
        <input
          type="email"
          placeholder="e.g someone@gmail.com"
          className="border py-2 px-3 border-black rounded-lg"
          {...register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] md:text-[15px]">Password</label>
        <input
          type="password"
          placeholder=""
          className="border py-2 px-3 border-black rounded-lg w-full"
          {...register('password', { required: true, maxLength: 12 })}
        />
        <button className="text-[#635FC7] font-extrabold text-[12px] md:text-[12px] text-right">
          Forgot Password
        </button>
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        name="submit"
        className="border text-[12px] md:text-[15px] font-bold py-2 px-4 text-white rounded-xl bg-[#635FC7]"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInwithEmail;
