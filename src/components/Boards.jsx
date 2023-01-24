import React, { useContext, useState } from 'react';
import { TiFlowChildren } from 'react-icons/ti';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { ModalContext } from '../context/modalContext';
import { BoardsContext } from '../context/boardsContext';

const Boards = () => {
  const { setTitle } = useContext(TasksManagementContext);
  const { setLoading } = useContext(LoadingContext);
  const { handleOpen } = useContext(ModalContext);
  const { boards } = useContext(BoardsContext);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="tracking-[0.18rem] text-[15px] font-semibold text-[#A8A4FF]">
        ALL BOARDS (3)
      </h2>
      <div className="">
        <ul className="flex flex-col gap-6">
          {boards.map((items) => (
            <li key={items.title} className="">
              <button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading((prevState) => !prevState);
                    setTitle(items.title);
                  }, 2000);
                }}
                className="text-[18px] font-semibold flex items-center gap-5"
              >
                <TiFlowChildren className="h-[1.5rem] w-[1.5rem]" />
                {items.title.slice(0, 1).toUpperCase() + items.title.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <button
          onClick={() => handleOpen()}
          className="text-[18px] font-semibold flex items-center gap-5"
        >
          <TiFlowChildren className="h-[1.5rem] w-[1.5rem] text-[#635FC7]" />
          <span className="text-[#635FC7]">+ Create New Board</span>
        </button>
      </div>
    </div>
  );
};

export default Boards;
