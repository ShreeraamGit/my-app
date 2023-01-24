import React, { useContext } from 'react';
import { SignInUpContext } from '../context/loginContext.js';
import { UsersContext } from '../context/usersContext.js';
import { ModalContext } from '../context/modalContext.js';
import SideMenu from '../components/SideMenu.jsx';
import Header from '../components/Header';
import TasksBox from '../components/TasksBox';
import Modal from '../components/Modal';

const Home = () => {
  const { signOut } = useContext(SignInUpContext);
  const { users } = useContext(UsersContext);
  const { open } = useContext(ModalContext);
  return (
    <div className="">
      <section className="flex">
        <SideMenu />
        <div className="max-h-screen w-screen overflow-hidden">
          <Header />
          <TasksBox />
        </div>
      </section>
      {open ? <Modal /> : null}
    </div>
  );
};

export default Home;

/*<button
        onClick={() => {
          signOut();
        }}
        className="mt-20 border-2 border-black p-5 text-2xl"
      >
        Sign out
      </button>*/
