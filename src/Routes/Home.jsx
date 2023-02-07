import React, { useContext } from 'react';
import { ModalContext } from '../context/modalContext.js';
import { AddTaskModalContext } from '../context/addTaskModal.js';
import { EditTaskContext } from '../context/editTaskContext.js';
import SideMenu from '../components/SideMenu.jsx';
import Header from '../components/Header';
import TasksBox from '../components/TasksBox';
import Modal from '../components/Modal';
import BasicAddTaskModal from '../components/AddTaskModal';
import EditTask from '../components/EditTask';

const Home = () => {
  const { open } = useContext(ModalContext);
  const { addTaskModalopen } = useContext(AddTaskModalContext);
  const { editTaskOpen } = useContext(EditTaskContext);

  return (
    <div className="relative">
      <section className="flex">
        <SideMenu />
        <div className="max-h-screen w-screen overflow-hidden">
          <Header />
          <TasksBox />
        </div>
      </section>
      {open ? <Modal /> : null}
      {addTaskModalopen ? <BasicAddTaskModal /> : null}
      {editTaskOpen ? '' : null}
    </div>
  );
};

export default Home;

/*bg-${
        darkMode ? '[#3E3F4E]' : 'white'
      } text-${darkMode ? 'white' : 'gray-900'}*/
