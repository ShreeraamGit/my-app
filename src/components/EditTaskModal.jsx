import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { EditTaskModalContext } from '../context/editTaskModalContetx';
import { DarkLightModeContext } from '../context/darkLightMode';
import { useForm } from 'react-hook-form';
import { TiDelete } from 'react-icons/ti';
import { CgDanger } from 'react-icons/cg';
import { TasksManagementContext } from '../context/tasksManagementContext';

export default function EditTaskModal() {
  const { openEditTaskModal, handleCloseEditTaskModal } =
    useContext(EditTaskModalContext);
  const [inputFields, setInputFields] = useState([1]);
  const { darkMode, style } = useContext(DarkLightModeContext);
  const { title } = useContext(TasksManagementContext);

  const preloadedValues = {
    title: title,
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: preloadedValues,
  });

  const onSubmit = (data, e) => {
    preloadedValues.title = data.title;
    console.log(data);
    reset();
  };

  const createColumn = () => {
    setInputFields((prevState) => [
      ...prevState,
      prevState[prevState.length - 1] + 1,
    ]);
  };

  const removeColumn = (index) => {
    let newColumnFields = [...inputFields];
    newColumnFields.splice(index, 1);
    setInputFields(newColumnFields);
  };

  return (
    <div>
      <Modal
        open={openEditTaskModal}
        onClose={handleCloseEditTaskModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
      >
        <Box sx={style}>
          {title ? (
            <div className="flex flex-col gap-3">
              <h1
                className={`text-[24px] font-bold ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                Edit Board
              </h1>
              <div className="">
                <form className="flex flex-col gap-3">
                  <div className="flex flex-col gap-5">
                    <label
                      className={`font-bold ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      Board Name
                    </label>
                    <input
                      className="border py-4 px-4 border-black rounded-lg"
                      type="text"
                      name="title"
                      placeholder="e.g. Web Design"
                      {...register('title', { required: true, maxLength: 15 })}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <label
                      className={`font-bold ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      Board Columns
                    </label>
                    {inputFields.map((items, index) =>
                      index !== 0 ? (
                        <div key={index} className="flex items-center gap-5">
                          <input
                            className="border py-4 px-4 border-black rounded-lg w-full"
                            type="text"
                            placeholder="e.g. Todo"
                            {...register(`columns.${index}.columnName`, {
                              required: true,
                            })}
                          />
                          <TiDelete
                            onClick={() => removeColumn(index)}
                            className={`h-[2.5rem] w-[2.5rem] cursor-pointer ${
                              darkMode ? 'text-white' : 'text-black'
                            }`}
                          />
                        </div>
                      ) : null,
                    )}
                  </div>
                </form>
                <div className="flex flex-col mt-8 gap-8">
                  <button
                    onClick={() => createColumn()}
                    type="createColumn"
                    className="border text-[20px] text-[#635FC7] font-bold py-3 px-3 rounded-full bg-[#F4F7FD]"
                  >
                    + Add New Column
                  </button>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    name="submit"
                    defaultValue={'Create New Board'}
                    className="border text-[20px] font-bold py-3 px-3 text-white rounded-full bg-[#635FC7]"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-7">
              <CgDanger className="h-[3rem] w-[3rem] " />
              <h1 className="text-center text-xl md:text-3xl">
                Please select a board to edit
              </h1>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

/* ///const { addBoards, addColumns } = useContext(AddDataContext);
const onSubmit = (data, e) => {
    ///console.log(data);
    addBoards(data, users);
    addColumns(data, users);
    reset();
  };*/

/* <div className="flex flex-col justify-center items-center gap-7">
              <CgDanger className="h-[3rem] w-[3rem] " />
              <h1 className="text-center text-xl md:text-3xl">
                Please select a board
              </h1>
            </div>*/

/*value={
                              items.colName.charAt(0).toUpperCase() +
                              items.colName.slice(1)
                            }*/
