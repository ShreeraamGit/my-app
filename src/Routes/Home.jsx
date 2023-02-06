import React, { useContext } from 'react';
import { SignInUpContext } from '../context/loginContext.js';
import { UsersContext } from '../context/usersContext.js';
import { ModalContext } from '../context/modalContext.js';
import { AddTaskModalContext } from '../context/addTaskModal.js';
import { DarkLightModeContext } from '../context/darkLightMode.js';
import SideMenu from '../components/SideMenu.jsx';
import Header from '../components/Header';
import TasksBox from '../components/TasksBox';
import Modal from '../components/Modal';
import BasicAddTaskModal from '../components/AddTaskModal';

const Home = () => {
  const { signOut } = useContext(SignInUpContext);
  const { users } = useContext(UsersContext);
  const { open } = useContext(ModalContext);
  const { addTaskModalopen } = useContext(AddTaskModalContext);
  const { darkMode } = useContext(DarkLightModeContext);
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
      {addTaskModalopen ? <BasicAddTaskModal /> : null}
    </div>
  );
};

export default Home;

/*bg-${
        darkMode ? '[#3E3F4E]' : 'white'
      } text-${darkMode ? 'white' : 'gray-900'}*/
