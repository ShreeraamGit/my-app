import * as React from 'react';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TaskListModalOpenContext } from '../context/editTaskListModalContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import { ColumnsContext } from '../context/columnContext';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { UsersContext } from '../context/usersContext';
import { AddDataContext } from '../context/addDataContext';
import { AddTaskModalContext } from '../context/addTaskModal';
import { SnackBarContext } from '../context/customizedSnakabrContext';
import { ClickEventContext } from '../context/clickEventContext';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';

export default function EditTaskListModal({ task, lastCol }) {
  const { setEvent } = useContext(ClickEventContext);
  const { handleClickSnackBar } = useContext(SnackBarContext);
  const { handleUpdateTaskCompletion } = useContext(AddTaskModalContext);
  const { updateTasks } = useContext(AddDataContext);
  const { title } = useContext(TasksManagementContext);
  const { users } = useContext(UsersContext);
  const { columns } = useContext(ColumnsContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { taskListModalOpen, handleTaskListModalClose } = useContext(
    TaskListModalOpenContext,
  );

  const { control } = useForm({
    defaultValues: {
      checkbox: false,
      status: '',
    },
  });

  const [checkboxValue, setCheckboxValue] = useState(
    task.subTasks.map((items) => items.isCompleted),
  );
  const [selectValue, setSelectValue] = useState(task.colToAdd);

  const handleCheckboxChange = (index) => {
    setCheckboxValue((prevValues) =>
      prevValues.map((value, i) => (i === index ? !value : value)),
    );
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleSubmit = () => {
    try {
      updateTasks(columns, users, task, title, checkboxValue, selectValue);
      const timer = setTimeout(function () {
        handleUpdateTaskCompletion();
        clearTimeout(timer);
      }, 1200);
      handleClickSnackBar();
      handleTaskListModalClose();
    } catch (error) {
      // handle the error here
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={taskListModalOpen}
        onClose={handleTaskListModalClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: [350, 370],
            bgcolor: darkMode ? '#2B2C37' : 'background.paper',
            boxShadow: 24,
            p: 2.5,
            borderRadius: 3,
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              <h1
                className={`text-[18px] font-bold ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                {task.taskName.slice(0, 1).toUpperCase() +
                  task.taskName.slice(1)}
              </h1>
              <p
                className={`text-[15px] ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                {task.description}
              </p>
            </div>
            <div
              className={`text-[18px] font-bold ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              <div className="flex flex-col">
                <form className="flex flex-col">
                  <span className="text-[15px] mb-3 gap-2">
                    Subtasks (
                    {`${
                      task.subTasks.filter((subtask) => subtask.isCompleted)
                        .length
                    } of ${task.subTasks.length}`}
                    )
                  </span>
                  <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto">
                    {task.subTasks.map((items, index) => (
                      <Controller
                        className=""
                        key={index}
                        name={`checkbox${index}`}
                        defaultValue={false}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <span
                            className={`${
                              darkMode
                                ? 'bg-[#3E3F4E] border-white'
                                : 'bg-white border-black'
                            } flex items-center gap-3 py-2 px-2 rounded-md`}
                          >
                            <Checkbox
                              {...field}
                              checked={checkboxValue[index]}
                              onChange={() => handleCheckboxChange(index)}
                              className="w-2 h-2"
                            />
                            <label
                              className={`font-normal text-[14px] ${
                                checkboxValue[index] ? 'line-through' : ''
                              }`}
                              htmlFor={field.name}
                            >
                              {items.title.slice(0, 1).toUpperCase() +
                                items.title.slice(1)}
                            </label>
                          </span>
                        )}
                      />
                    ))}
                  </div>
                  {lastCol ? (
                    <div className="flex flex-col gap-2 mt-3">
                      <label
                        className={`text-[15px] font-bold ${
                          darkMode ? 'text-white' : 'text-[#000112]'
                        }`}
                      >
                        Status
                      </label>
                      <select
                        className={`border py-2 px-2 rounded-lg w-full text-[12px] ${
                          darkMode
                            ? 'bg-[#2B2C37] border-white text-white'
                            : 'bg-white border-black text-black'
                        }`}
                        onChange={handleSelectChange}
                        value={selectValue}
                      >
                        {columns.map((items, index) => (
                          <option
                            key={index}
                            className=""
                            value={items.colName}
                          >
                            {items.colName.charAt(0).toUpperCase() +
                              items.colName.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </form>
                {lastCol ? (
                  <div className="flex flex-col mt-5 gap-8">
                    <button
                      onClick={(e) => {
                        setEvent(e.target.innerText);
                        handleSubmit();
                      }}
                      name="submit"
                      defaultValue={'Create New Board'}
                      className="text-[13px] font-bold py-1 px-2 text-white rounded-full bg-[#635FC7]"
                      type="submit"
                    >
                      Update Task
                    </button>
                  </div>
                ) : (
                  <div className="">
                    <h1 className="flex justify-center items-center mt-6 border text-[15px]  text-white bg-[#635FC7] rounded-md p-1">
                      Task Has been Completed.
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
