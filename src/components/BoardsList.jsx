import React, { Fragment } from 'react';
import { TiFlowChildren } from 'react-icons/ti';
import { CircularProgress } from '@mui/material';

const BoardsList = ({
  loadingStatus,
  docs,
  setLoading,
  setTitle,
  darkMode,
  handleOpen,
}) => {
  return (
    <Fragment>
      {' '}
      <div className="">
        <ul className="flex flex-col gap-4 hover:text-white">
          {!loadingStatus && docs ? (
            docs.map((items) => (
              <li
                key={items.boardName}
                className="rounded-r-full p-0 pr-10 hover:bg-violet-500 hover:text-white"
              >
                <button
                  onClick={async () => {
                    setLoading(true);
                    setTitle(items.boardName);
                    setTimeout(() => {
                      setLoading((prevState) => !prevState);
                    }, 1500);
                  }}
                  className={`text-[15px] text-white font-semibold flex items-center gap-5 ${
                    darkMode ? 'text-[#E4EBFA]' : 'text-black'
                  }`}
                >
                  <TiFlowChildren className="h-[1.5rem] w-[1.5rem]" />
                  {items.boardName.slice(0, 1).toUpperCase() +
                    items.boardName.slice(1)}
                </button>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center gap-5">
              <CircularProgress />
              <h1
                className={`text-center text-[18px] ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                Loading... Please Wait...
              </h1>
            </div>
          )}
        </ul>
      </div>
      <div className="">
        <button
          onClick={() => handleOpen()}
          className="text-[18px] font-semibold flex items-center gap-5"
        >
          <TiFlowChildren className="h-[1.5rem] w-[1.5rem] text-[#635FC7]" />
          <span className="text-[#635FC7] text-[15px]">+ Create New Board</span>
        </button>
      </div>
    </Fragment>
  );
};

export default BoardsList;
