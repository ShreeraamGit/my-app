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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overFlow: 'hidden',
  borderRadius: 3,
};

export default function BasicAddTaskModal() {
  const { title } = useContext(TasksManagementContext);
  const { columns } = useContext(ColumnsContext);
  const { addTasks } = useContext(AddDataContext);
  const { users } = useContext(UsersContext);

  const [subTasks, setSubtasks] = useState([1]);
  const { addTaskModalopen, handleAddTaskModalClose } =
    useContext(AddTaskModalContext);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    addTasks(columns, users, data, title);
    console.log(data);
    reset();
  };

  console.log(title);

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
        <Box sx={style}>
          <div className="flex flex-col gap-2">
            <h1 className="text-[24px] font-bold">Add New Task</h1>
            <div className="">
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-3">
                  <label>Title</label>
                  <input
                    className="border py-2 px-2 border-black rounded-lg"
                    type="text"
                    placeholder="e.g. Take Coffee Break"
                    {...register('title', { required: true, maxLength: 25 })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Description</label>
                  <input
                    className="border h-[6rem] placeholder:-translate-y-4 placeholder:whitespace-pre-wrap py-4 px-4 border-black rounded-lg"
                    type="text"
                    placeholder="e.g. Taking Break is good.This 15 minutes bareak will help you to reacharge the batteries little."
                    {...register('Description', {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Subtasks</label>
                  {subTasks.map((items, index) =>
                    index !== 0 ? (
                      <div key={index} className="flex items-center gap-5">
                        <input
                          className="border py-2 px-2 border-black rounded-lg w-full"
                          type="text"
                          placeholder="e.g. Make Cofee"
                          {...register(`subtasks.${index}.subTasks${index}`, {
                            required: true,
                          })}
                        />
                        <TiDelete
                          onClick={() => removeColumn(index)}
                          className="h-[2.5rem] w-[2.5rem] cursor-pointer"
                        />
                      </div>
                    ) : null,
                  )}
                  <button
                    onClick={() => createColumn()}
                    type="createColumn"
                    className="border text-[20px] text-[#635FC7] font-bold py-2 px-2 rounded-full bg-[#F4F7FD]"
                  >
                    + Add New Subtasks
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <label>Status</label>
                  <select
                    className="border py-2 px-2 border-black rounded-lg w-full"
                    {...register('status')}
                  >
                    {columns.map((items, index) => (
                      <option key={index} className="" value={items.colName}>
                        {items.colName}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
              <div className="flex flex-col mt-8 gap-8">
                <button
                  onClick={handleSubmit(onSubmit)}
                  name="submit"
                  defaultValue={'Create New Board'}
                  className="border text-[20px] font-bold py-2 px-2 text-white rounded-full bg-[#635FC7]"
                  type="submit"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

/*<select {...register('status')}>
                    <option
                      className="border py-4 px-4 border-black rounded-lg w-full"
                      value={columns}
                    >
                      {columns}
                    </option>
                  </select>*/
