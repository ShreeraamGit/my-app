import React, { useContext, useEffect } from 'react';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { ColumnsContext } from '../context/columnContext';
import { GetDataContext } from '../context/getDataContext';
import { UsersContext } from '../context/usersContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import { ModalContext } from '../context/modalContext';
import { AddTaskModalContext } from '../context/addTaskModal';
import { MobileBoardModalContext } from '../context/mobileBoardModalContext';
import { EditTaskModalContext } from '../context/editTaskModalContetx';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '../components/Modal';
import BasicAddTaskModal from '../components/AddTaskModal';
import MobileBoardModal from '../components/MobileBoardModal.jsx';
import EditTaskModal from './EditTaskModal';
import TaskNumberCount from './TaskNumberCount';
import { AiTwotoneCheckCircle } from 'react-icons/ai';
import { GoAlert } from 'react-icons/go';

const TasksBox = () => {
  const { title, taskLists, setTasksLists } = useContext(
    TasksManagementContext,
  );
  const { loading } = useContext(LoadingContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { columns, setColumns } = useContext(ColumnsContext);
  const { getTasks, getColumns } = useContext(GetDataContext);
  const { users } = useContext(UsersContext);
  const { open } = useContext(ModalContext);
  const { addTaskModalopen, addTaskCompletion } =
    useContext(AddTaskModalContext);
  const { boardModalOpen } = useContext(MobileBoardModalContext);
  const { openEditTaskModal } = useContext(EditTaskModalContext);

  const getColumnsLists = async () => {
    const recieveColumns = await getColumns(users, title);
    setColumns(recieveColumns);
  };

  const getTasksLists = async () => {
    const recieveTasks = await getTasks(users, title, columns);
    setTasksLists(recieveTasks);
  };

  useEffect(() => {
    if (title) {
      getColumnsLists();
    }
  }, [title]);

  useEffect(() => {
    if (title) {
      getTasksLists();
    }
  }, [title, columns]);

  useEffect(() => {
    getTasksLists();
  }, [addTaskCompletion]);

  return (
    <div
      className={`${
        darkMode ? 'bg-[#20212C]' : 'bg-[#F4F7FD]'
      } w-screen h-screen md:w-full md:h-full p-5 snap-x snap-mandatory`}
    >
      {title && loading ? (
        <div
          className={`flex flex-col md:flex-row h-full w-full justify-center items-center gap-10 md:gap-20 ${
            darkMode ? 'text-white' : 'text-black'
          }`}
        >
          <CircularProgress
            className={`${darkMode ? 'text-white' : 'text-black'}`}
          />
          <h1 className="text-xl md:text-4xl">Loading.... Please Wait....</h1>
        </div>
      ) : title && !loading ? (
        <div
          className={`h-screen w-screen md:h-[85vh] ${
            darkMode
              ? 'transparent-scrollbar'
              : 'transparent-scrollbar-light-mode'
          } md:w-full overflow-scroll snap-always snap-center flex gap-7 md:gap-14`}
        >
          {columns.map((items, index) => (
            <div
              key={index}
              className="text-white min-w-[69%] md:min-w-[25%] h-fit flex flex-col gap-5"
            >
              <div className="flex justify-start items-center gap-5">
                <AiTwotoneCheckCircle className="text-red-500" />
                <h3 className="text-[18px] tracking-[0.3rem] text-[#828FA3]">
                  {items.colName.toUpperCase()}(
                  <TaskNumberCount task={taskLists} colName={items.colName} />)
                </h3>
              </div>
              {taskLists.map((item, index) =>
                item.colToAdd === items.colName ? (
                  <button
                    key={index}
                    className={`flex shadow-xl rounded-lg cursor-pointer flex-col gap-3 p-4 ${
                      darkMode ? 'bg-[#3E3F4E]' : 'bg-white'
                    }`}
                  >
                    <h1
                      className={`font-bold text-[18px] ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.taskName}
                    </h1>
                    <span
                      className={`${darkMode ? 'text-white' : 'text-black'}`}
                    >
                      0 of {item.subTasks.length} Subtasks
                    </span>
                  </button>
                ) : null,
              )}
            </div>
          ))}
        </div>
      ) : title ? null : (
        <div className="flex justify-center items-center h-full w-full">
          <div className="flex flex-col justify-center items-center gap-5">
            <GoAlert className="w-[3rem] h-[3rem] text-violet-500" />
            <h1
              className={`text-[18px] md:text-[24px] ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              Please select a board to get started.
            </h1>
          </div>
        </div>
      )}
      {open ? <Modal /> : null}
      {addTaskModalopen ? <BasicAddTaskModal /> : null}

      {boardModalOpen ? <MobileBoardModal /> : null}
      {openEditTaskModal ? <EditTaskModal /> : null}
    </div>
  );
};

export default TasksBox;

/*  useEffect(() => {
    const getTasksLists = async () => {
      const recieveTasks = await getTasks(users, title, columns);
      setTasksLists(recieveTasks);
    };

    if (title && columns.length > 0) {
      getTasksLists();
    }
  }, [title]);*/

/*useEffect(() => {
    if (title) {
      setColumnsQuery(
        collection(
          db,
          'data',
          'boards',
          'users',
          `${users.uid}`,
          'boardDetails',
          `boardName - ${title.replace(/\s/g, '')}`,
          'columns',
        ),
      );
    } else setColumnsQuery(null);
  }, [title]);

  const [columnsList, loadingStatus, error] = useCollectionData(columnsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (title && !loadingStatus) {
      setColumns(columnsList);
    }
  }, [columnsList]);*/
