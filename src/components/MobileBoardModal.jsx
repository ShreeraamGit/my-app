import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MobileBoardModalContext } from '../context/mobileBoardModalContext';
import { LoadingContext } from '../context/loadingContext';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { UsersContext } from '../context/usersContext';
import { GetDataContext } from '../context/getDataContext';
import { ColumnsContext } from '../context/columnContext';
import { ModalContext } from '../context/modalContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import DarkLightModeSwitch from './DarkLightModeSwitch';
import BoardsList from './BoardsList';
import { collection } from 'firebase/firestore';
import { db } from '../utils/firebaseClient';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const MobileBoardModal = () => {
  const { setTitle } = useContext(TasksManagementContext);
  const { setLoading } = useContext(LoadingContext);
  const { handleOpen } = useContext(ModalContext);
  const { users } = useContext(UsersContext);
  const { getData } = useContext(GetDataContext);
  const { setColumns } = useContext(ColumnsContext);
  const { darkMode, style } = useContext(DarkLightModeContext);

  const query = collection(
    db,
    'data',
    'boards',
    'users',
    `${users.uid}`,
    'boardDetails',
  );
  const [docs, loadingStatus] = useCollectionData(query);

  const { boardModalOpen, handleBoardModalClose } = useContext(
    MobileBoardModalContext,
  );

  return (
    <div className="">
      <Modal
        open={boardModalOpen}
        onClose={handleBoardModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="block md:hidden"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-10">
            <h1 className="tracking-[0.4rem] font-bold text-[#828FA3]">
              ALL BOARDS ({!loadingStatus && docs ? docs.length : 0})
            </h1>
            <BoardsList
              loadingStatus={loadingStatus}
              docs={docs}
              setLoading={setLoading}
              setTitle={setTitle}
              getData={getData}
              setColumns={setColumns}
              users={users}
              darkMode={darkMode}
              handleOpen={handleOpen}
              handleBoardModalClose={handleBoardModalClose}
            />
            <DarkLightModeSwitch />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MobileBoardModal;
