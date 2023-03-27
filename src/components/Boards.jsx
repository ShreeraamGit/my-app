import React, { useContext, useEffect } from 'react';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { UsersContext } from '../context/usersContext';
import { ModalContext } from '../context/modalContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import { BoardsContext } from '../context/boardsContext';
import BoardsList from './BoardsList';
import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../utils/firebaseClient';

const Boards = () => {
  const { setTitle } = useContext(TasksManagementContext);
  const { setLoading } = useContext(LoadingContext);
  const { handleOpen } = useContext(ModalContext);
  const { users } = useContext(UsersContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { boards, setBoards } = useContext(BoardsContext);

  const query = collection(
    db,
    'data',
    'boards',
    'users',
    `${users.uid}`,
    'boardDetails',
  );
  const [docs, loadingStatus, error] = useCollectionData(query);

  useEffect(() => {
    setBoards(docs);
  }, [docs]);

  return (
    <div className="flex flex-col gap-7">
      <h2
        className={`tracking-[0.18rem] text-[12px] font-semibold ${
          darkMode ? 'text-[#E4EBFA]' : 'text-[#A8A4FF]'
        }`}
      >
        ALL BOARDS (
        {boards && boards.length > 0 ? (
          <span className="">{boards.length}</span>
        ) : (
          <span className="">0</span>
        )}
        )
      </h2>
      <BoardsList
        loadingStatus={loadingStatus}
        docs={boards}
        setLoading={setLoading}
        setTitle={setTitle}
        darkMode={darkMode}
        handleOpen={handleOpen}
      />
    </div>
  );
};

export default Boards;

/*useEffect(() => {
    const getBoardsList = async () => {
      setLoading(true);
      const recieveBaords = await getBoards(users);
      setBoards(recieveBaords);
      setTimeout(() => {
        setLoading((prevState) => !prevState);
      }, 1500);
    };

    if (users) {
      getBoardsList();
    }
  }, []);*/
