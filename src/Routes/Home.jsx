import React from 'react';
import SideMenu from '../components/SideMenu.jsx';
import Header from '../components/Header';
import TasksBox from '../components/TasksBox';

const Home = () => {
  return (
    <div className="relative">
      <section className="flex">
        <SideMenu />
        <div className="max-h-screen w-screen overflow-hidden">
          <Header />
          <TasksBox />
        </div>
      </section>
    </div>
  );
};

export default Home;
