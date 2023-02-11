import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ModalContext } from '../context/modalContext';
import { UsersContext } from '../context/usersContext';
import { useForm } from 'react-hook-form';
import { TiDelete } from 'react-icons/ti';
import { AddDataContext } from '../context/addDataContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 3,
};

export default function BasicModal() {
  const { open, handleClose } = useContext(ModalContext);
  const [inputFields, setInputFields] = useState([1]);

  const { users } = useContext(UsersContext);
  const { addBoards, addColumns } = useContext(AddDataContext);

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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-3">
            <h1 className="text-[24px] font-bold">Add New Board</h1>
            <div className="">
              <form className="flex flex-col gap-3">
                <div className="flex flex-col gap-5">
                  <label>Name</label>
                  <input
                    className="border py-4 px-4 border-black rounded-lg"
                    type="text"
                    placeholder="e.g. Web Design"
                    {...register('title', { required: true, maxLength: 15 })}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <label>Columns</label>
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
                          className="h-[2.5rem] w-[2.5rem] cursor-pointer"
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
                  className="border text-[20px] text-[#635FC7] font-bold py-4 px-4 rounded-full bg-[#F4F7FD]"
                >
                  + Add New Column
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
                  name="submit"
                  defaultValue={'Create New Board'}
                  className="border text-[20px] font-bold py-4 px-4 text-white rounded-full bg-[#635FC7]"
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
