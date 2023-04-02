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
import DropDownMenu from '../components/HideSideBar';
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
  const { darkMode } = useContext(DarkLightModeContext);

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
            <div className="flex flex-col justify-center items-center gap-3">
              <DarkLightModeSwitch />
              <DropDownMenu menuItems={['profile', 'settings']} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MobileBoardModal;
