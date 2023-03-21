import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ModalContext } from '../context/modalContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import { UsersContext } from '../context/usersContext';
import { useForm } from 'react-hook-form';
import { TiDelete } from 'react-icons/ti';
import { AddDataContext } from '../context/addDataContext';

export default function BasicModal() {
  const { open, handleClose } = useContext(ModalContext);
  const [inputFields, setInputFields] = useState([1]);

  const { users } = useContext(UsersContext);
  const { addBoards, addColumns } = useContext(AddDataContext);
  const { darkMode } = useContext(DarkLightModeContext);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data, e) => {
    ///console.log(data);
    addBoards(data, users);
    addColumns(data, users);
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: [350, 370],
    bgcolor: darkMode ? '#2B2C37' : 'background.paper',
    boxShadow: 24,
    p: 2.5,
    borderRadius: 3,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
      >
        <Box sx={style}>
          <div className="flex flex-col gap-3">
            <h1
              className={`text-[15px] font-bold ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              Add New Board
            </h1>
            <div className="">
              <form className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label
                    className={`font-bold text-[12px] ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Board Name
                  </label>
                  <input
                    className={`${
                      darkMode
                        ? 'bg-[#2B2C37] border-white'
                        : 'bg-white border-black'
                    } border py-2 text-[12px] placeholder:text-[12px] px-2 rounded-lg`}
                    type="text"
                    placeholder="e.g. Web Design"
                    {...register('title', { required: true, maxLength: 15 })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className={`font-bold text-[12px] ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Board Columns
                  </label>
                  {inputFields.map((items, index) =>
                    index !== 0 ? (
                      <div key={index} className="flex items-center gap-5">
                        <input
                          className={`${
                            darkMode
                              ? 'bg-[#2B2C37] border-white'
                              : 'bg-white border-black'
                          } border placeholder:text-[12px] text-[12px]  py-2 px-2 rounded-lg w-full`}
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
              <div className="flex flex-col mt-5 gap-5">
                <button
                  onClick={() => createColumn()}
                  type="createColumn"
                  className="border text-[13px] text-[#635FC7] font-bold py-2 px-2 rounded-full bg-[#F4F7FD]"
                >
                  + Add New Column
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
                  name="submit"
                  defaultValue={'Create New Board'}
                  className="text-[13px] font-bold py-2 px-2 text-white rounded-full bg-[#635FC7]"
                  type="submit"
                >
                  Create New Board
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

/*e.preventDefault();
    var newArray = data.columns.filter(
      (value) => Object.keys(value).length !== 0,
    );

    console.log(newArray);*/
