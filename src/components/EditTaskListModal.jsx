import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TaskListModalOpenContext } from '../context/editTaskListModalContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import { ColumnsContext } from '../context/columnContext';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { UsersContext } from '../context/usersContext';
import { AddDataContext } from '../context/addDataContext';
import { AddTaskModalContext } from '../context/addTaskModal';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';

export default function EditTaskListModal({ task }) {
  const { handleUpdateTaskCompletion } = useContext(AddTaskModalContext);
  const { updateTasks } = useContext(AddDataContext);
  const { title } = useContext(TasksManagementContext);
  const { users } = useContext(UsersContext);
  const { columns } = useContext(ColumnsContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { taskListModalOpen, handleTaskListModalClose } = useContext(
    TaskListModalOpenContext,
  );
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: darkMode ? '#2B2C37' : 'background.paper',
    boxShadow: 24,
    p: 2.5,
    borderRadius: 3,
  };

  const { control } = useForm({
    defaultValues: {
      checkbox: false,
      status: '',
    },
  });

  //console.log(task);

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

  /*useEffect(() => {
    // Call your custom handleSubmit function here
    console.log('i run when modal open');
    handleSubmit({ checkbox: checkboxValue, status: selectValue });
  }, [checkboxValue, selectValue]);*/

  const handleSubmit = () => {
    try {
      updateTasks(columns, users, task, title, checkboxValue, selectValue);
      const timer = setTimeout(function () {
        handleUpdateTaskCompletion();
        clearTimeout(timer);
      }, 1000);
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
        <Box sx={style}>
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
                    Subtasks ({`${0} of ${task.subTasks.length}`})
                  </span>
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
                          } flex items-center py-1 px-1 rounded-md`}
                        >
                          <Checkbox
                            {...field}
                            checked={checkboxValue[index]}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <label
                            className={`font-normal text-[15px] ${
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
                    onClick={() => {
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
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

/*<Controller
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
                          } flex items-center py-1 px-1 rounded-md`}
                        >
                          <Checkbox
                            {...field}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className={`font-normal text-[15px] ${
                              checkboxValue ? 'line-through' : ''
                            }`}
                            htmlFor={field.name}
                          >
                            {items.title.slice(0, 1).toUpperCase() +
                              items.title.slice(1)}
                          </label>
                        </span>
                      )}
                    />*/

/*updateTasks(columns, users, task, title, data.checkbox, data.status);*/
