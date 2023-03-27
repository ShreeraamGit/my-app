import React, { useContext } from 'react';
import SideMenu from '../components/SideMenu.jsx';
import Header from '../components/Header';
import TasksBox from '../components/TasksBox';
import { SnackBarContext } from '../context/customizedSnakabrContext.js';
import { ClickEventContext } from '../context/clickEventContext.js';
import CustomizedSnackbars from '../components/CustomizedSnackBar.jsx';

const Home = () => {
  const { snackbarOpen } = useContext(SnackBarContext);
  const { event } = useContext(ClickEventContext);

  const message =
    event === 'Delete Board'
      ? 'Board Deleted Succesfully'
      : event === 'Create Task'
      ? 'Tasks and Subtasks Created Succesfully'
      : event === 'Create New Board'
      ? 'Board Created Succesfully'
      : 'Tasks and Subtasks Updated Succesfully';

  return (
    <div className="relative">
      <section className="flex">
        <SideMenu />
        <div className="max-h-screen w-screen overflow-hidden">
          <Header />
          <TasksBox />
        </div>
        {snackbarOpen ? <CustomizedSnackbars message={message} /> : null}
      </section>
    </div>
  );
};

export default Home;
