import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import { AddTaskModalContext } from '../context/addTaskModal';
import { TiDelete } from 'react-icons/ti';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overFlow: 'hidden',
};

export default function BasicAddTaskModal() {
  const [subTasks, setSubtasks] = useState([1, 2]);
  const { addTaskModalopen, handleAddTaskModalClose } =
    useContext(AddTaskModalContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

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
          <div className="flex flex-col gap-5">
            <h1 className="">Add New Task</h1>
            <div className="">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-4">
                  <label>Title</label>
                  <input
                    className="border py-4 px-4 border-black rounded-lg"
                    type="text"
                    placeholder="e.g. Take Coffee Break"
                    {...register('title', { required: true, maxLength: 25 })}
                  />
                </div>
                <div className="flex flex-col gap-4 ">
                  <label>Description</label>
                  <input
                    className="border h-[6rem] placeholder:-translate-y-4 placeholder:whitespace-pre-wrap py-4 px-4 border-black rounded-lg"
                    type="text"
                    placeholder="e.g. Taking Break is good.This 15 minutes bareak will help you to reacharge the batteries little."
                    {...register('title', { required: true, maxLength: 100 })}
                  />
                </div>
                <div className="flex flex-col gap-4 ">
                  <label>Subtasks</label>
                  {subTasks.map((items, index) =>
                    index !== 0 ? (
                      <div key={index} className="flex items-center gap-5">
                        <input
                          className="border py-4 px-4 border-black rounded-lg w-full"
                          type="text"
                          placeholder="e.g. Make Cofee"
                          {...register(`columns.${index}.columnName`, {
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
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
