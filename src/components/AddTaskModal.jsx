import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import { AddTaskModalContext } from '../context/addTaskModal';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { UsersContext } from '../context/usersContext';
import { AddDataContext } from '../context/addDataContext';
import { ColumnsContext } from '../context/columnContext';
import { TiDelete } from 'react-icons/ti';
import { CgDanger } from 'react-icons/cg';
import { DarkLightModeContext } from '../context/darkLightMode';
import { SnackBarContext } from '../context/customizedSnakabrContext';
import { ClickEventContext } from '../context/clickEventContext';

export default function BasicAddTaskModal() {
  const { setEvent } = useContext(ClickEventContext);
  const { handleClickSnackBar } = useContext(SnackBarContext);
  const { title } = useContext(TasksManagementContext);
  const { columns } = useContext(ColumnsContext);
  const { addTasks } = useContext(AddDataContext);
  const { users } = useContext(UsersContext);
  const { darkMode } = useContext(DarkLightModeContext);

  const [subTasks, setSubtasks] = useState([1]);
  const { addTaskModalopen, handleAddTaskModalClose, handleAddTaskCompletion } =
    useContext(AddTaskModalContext);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data, e) => {
    try {
      setEvent(e.target.innerText);
      if (title) {
        addTasks(columns, users, data, title);
        const timer = setTimeout(function () {
          handleAddTaskCompletion();
          clearTimeout(timer);
        }, 1000);
      }
      reset();
      handleClickSnackBar();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const createColumn = () => {
    setSubtasks((prevState) => [
      ...prevState,
      prevState[prevState.length - 1] + 1,
    ]);
  };

  const removeColumn = (index) => {
    let newColumnFields = [...subTasks];
    newColumnFields.splice(index, 1);
    setSubtasks(newColumnFields);
  };

  return (
    <div>
      <Modal
        open={addTaskModalopen}
        onClose={handleAddTaskModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: [350, 370],
            bgcolor: darkMode ? '#2B2C37' : 'background.paper',
            boxShadow: 0,
            p: 2.5,
            overFlow: 'hidden',
            borderRadius: 3,
          }}
        >
          {title ? (
            <div className="flex flex-col gap-2">
              <h1
                className={`text-[15px] font-bold ${
                  darkMode ? 'text-white' : 'text-[#000112]'
                }`}
              >
                Add New Task
              </h1>
              <div className="">
                <form
                  className="flex flex-col gap-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-3">
                    <label
                      className={`text-[12px] font-bold ${
                        darkMode ? 'text-white' : 'text-[#000112]'
                      }`}
                    >
                      Title
                    </label>
                    <input
                      className={`placeholder:text-[12px] border py-2 text-[12px] px-2 rounded-lg ${
                        darkMode
                          ? 'bg-[#2B2C37] border-white'
                          : 'bg-white border-black'
                      }`}
                      type="text"
                      placeholder="e.g. Take Coffee Break"
                      {...register('title', { required: true, maxLength: 25 })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className={`text-[12px] font-bold ${
                        darkMode ? 'text-white' : 'text-[#000112]'
                      }`}
                    >
                      Description
                    </label>
                    <input
                      className={`${
                        darkMode
                          ? 'bg-[#2B2C37] border-white'
                          : 'bg-white border-black'
                      } border placeholder:text-[12px] text-[12px] h-[6rem] break-all overflow-y-auto resize-none: placeholder:-translate-y-8 placeholder:whitespace-pre-wrap py-4 px-4 rounded-lg`}
                      type="text"
                      placeholder="e.g. Taking Break is good.This 15 minutes bareak will help you to reacharge the batteries little."
                      {...register('Description', {
                        required: true,
                        maxLength: 500,
                      })}
                    />
                  </div>
                  <div className="flex flex-col gap-2 max-h-[190px] overflow-y-auto">
                    <label
                      className={`text-[12px] font-bold ${
                        darkMode ? 'text-white' : 'text-[#000112]'
                      }`}
                    >
                      Subtasks
                    </label>
                    {subTasks.map((items, index) =>
                      index !== 0 ? (
                        <div key={index} className="flex items-center gap-5">
                          <input
                            className={`border text-[12px] placeholder:text-[12px] py-1 px-2 border-black rounded-lg w-full ${
                              darkMode
                                ? 'bg-[#2B2C37] border-white'
                                : 'bg-white border-black'
                            }`}
                            type="text"
                            placeholder="e.g. Make Cofee"
                            {...register(`subtasks.${index}.title`, {
                              required: true,
                            })}
                          />
                          <TiDelete
                            onClick={() => removeColumn(index)}
                            className={`h-[2rem] w-[2rem] cursor-pointer ${
                              darkMode ? 'text-white' : 'text-[#000112]'
                            } `}
                          />
                        </div>
                      ) : null,
                    )}
                    <button
                      onClick={() => createColumn()}
                      type="createColumn"
                      className="border text-[13px] text-[#635FC7] font-bold py-1 px-2 rounded-full bg-[#F4F7FD]"
                    >
                      + Add New Subtasks
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className={`text-[12px] font-bold ${
                        darkMode ? 'text-white' : 'text-[#000112]'
                      }`}
                    >
                      Status
                    </label>
                    <select
                      className={`border py-1 px-2 rounded-lg w-full text-[12px] ${
                        darkMode
                          ? 'bg-[#2B2C37] border-white text-white'
                          : 'bg-white border-black text-black'
                      }`}
                      {...register('status')}
                    >
                      {columns.map((items, index) => (
                        <option key={index} className="" value={items.colName}>
                          {items.colName.charAt(0).toUpperCase() +
                            items.colName.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
                <div className="flex flex-col mt-5 gap-8">
                  <button
                    onClick={handleSubmit(onSubmit)}
                    name="submit"
                    defaultValue={'Create New Board'}
                    className="text-[13px] font-bold py-1 px-2 text-white rounded-full bg-[#635FC7]"
                    type="submit"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-7">
              <CgDanger
                className={`h-[3rem] w-[3rem] text-[12px] font-bold ${
                  darkMode ? 'text-white' : 'text-[#000112]'
                }`}
              />
              <h1
                className={`text-center text-xl md:text-3xl text-[12px] font-bold ${
                  darkMode ? 'text-white' : 'text-[#000112]'
                }`}
              >
                Please select a board
              </h1>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

/*const getTasksLists = await getTasks(
                        users,
                        items.boardName,
                        columns,
                      );
                      setTasksLists(getTasksLists);*/
