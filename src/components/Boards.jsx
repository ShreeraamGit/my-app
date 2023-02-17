import React, { useContext, useEffect } from 'react';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { UsersContext } from '../context/usersContext';
import { ModalContext } from '../context/modalContext';
import { GetDataContext } from '../context/getDataContext';
import { ColumnsContext } from '../context/columnContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import { BoardsContext } from '../context/boardsContext';
import BoardsList from './BoardsList';

const Boards = () => {
  const { setTitle } = useContext(TasksManagementContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { handleOpen } = useContext(ModalContext);
  const { users } = useContext(UsersContext);
  const { setColumns } = useContext(ColumnsContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { getBoards, getData } = useContext(GetDataContext);
  const { boards, setBoards } = useContext(BoardsContext);

  useEffect(() => {
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
  }, [users]);

  return (
    <div className="flex flex-col gap-10">
      <h2
        className={`tracking-[0.18rem] text-[15px] font-semibold ${
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
        loadingStatus={loading}
        docs={boards}
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
