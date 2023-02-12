import React, { useContext, useEffect } from 'react';
import { TiFlowChildren } from 'react-icons/ti';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { UsersContext } from '../context/usersContext';
import { ModalContext } from '../context/modalContext';
import { GetDataContext } from '../context/getDataContext';
import { ColumnsContext } from '../context/columnContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import BoardsList from './BoardsList';
import { collection } from 'firebase/firestore';
import { db } from '../utils/firebaseClient';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Boards = () => {
  const { setTitle } = useContext(TasksManagementContext);
  const { setLoading } = useContext(LoadingContext);
  const { handleOpen } = useContext(ModalContext);
  const { users } = useContext(UsersContext);
  const { getData } = useContext(GetDataContext);
  const { setColumns } = useContext(ColumnsContext);
  const { darkMode } = useContext(DarkLightModeContext);

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
      <h2
        className={`tracking-[0.18rem] text-[15px] font-semibold ${
          darkMode ? 'text-[#E4EBFA]' : 'text-[#A8A4FF]'
        }`}
      >
        ALL BOARDS ({!loadingStatus && docs ? docs.length : 0})
      </h2>
      <BoardsList
        loadingStatus={loadingStatus}
        docs={docs}
        setLoading={setLoading}
        setTitle={setTitle}
        getData={getData}
        setColumns={setColumns}
        users={users}
        darkMode={darkMode}
        handleOpen={handleOpen}
      />
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
