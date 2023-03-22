import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TaskListModalOpenContext } from '../context/editTaskListModalContext';
import { DarkLightModeContext } from '../context/darkLightMode';

export default function EditTaskListModal({ task }) {
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
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2.5,
    borderRadius: 3,
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
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[20px]">
              {task.taskName.slice(0, 1).toUpperCase() + task.taskName.slice(1)}
            </h1>
            <p className="">{task.description}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
