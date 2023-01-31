import React, { useContext, useEffect } from 'react';
import { TiFlowChildren } from 'react-icons/ti';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { UsersContext } from '../context/usersContext';
import { ModalContext } from '../context/modalContext';
import { collection } from 'firebase/firestore';
import { db } from '../utils/firebaseClient';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Boards = () => {
  const { setTitle } = useContext(TasksManagementContext);
  const { setLoading } = useContext(LoadingContext);
  const { handleOpen } = useContext(ModalContext);
  const { users } = useContext(UsersContext);

  const query = collection(
    db,
    'data',
    'boards',
    'users',
    `${users.uid}`,
    'boardDetails',
  );
  const [docs, loadingStatus, error] = useCollectionData(query);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="tracking-[0.18rem] text-[15px] font-semibold text-[#A8A4FF]">
        ALL BOARDS ({!loadingStatus && docs ? docs.length : 0})
      </h2>
      <div className="">
        <ul className="flex flex-col gap-6">
          {!loadingStatus && docs
            ? docs.map((items) => (
                <li key={items.boardName} className="">
                  <button
                    onClick={() => {
                      setLoading(true);
                      setTitle(items.boardName);
                      setTimeout(() => {
                        setLoading((prevState) => !prevState);
                      }, 1500);
                    }}
                    className="text-[18px] font-semibold flex items-center gap-5"
                  >
                    <TiFlowChildren className="h-[1.5rem] w-[1.5rem]" />
                    {items.boardName.slice(0, 1).toUpperCase() +
                      items.boardName.slice(1)}
                  </button>
                </li>
              ))
            : 'loading please wait......'}
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

/*const query = collection(
    db,
    'data',
    'boards',
    'users',
    `${users.uid}`,
    'boardDetails',
  );
  const [docs, loadingStatus, error] = useCollectionData(query);

  useEffect(() => {
    if (docs) {
      setBoards(docs);
    }
  }, [docs]);

  console.log(boards);*/
