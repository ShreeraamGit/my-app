import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SignInUpProvider } from './context/loginContext';
import { UserProvider } from './context/usersContext';
import { TasksManagementProvider } from './context/tasksManagementContext';
import { LoaderProvider } from './context/loadingContext';
import { ModalProvider } from './context/modalContext';
import { BoardsProvider } from './context/boardsContext';
import { ColumnsProvider } from './context/columnContext';
import { AddDataProvider } from './context/addDataContext';
import { AddBoardsProvider } from './context/addBoardsContext';
import { GetDataProvider } from './context/getDataContext';
import { AddTaskModalProvider } from './context/addTaskModal';
import { DarkLightModeProvider } from './context/darkLightMode';
import { EditTaskProvider } from './context/editTaskContext';
import { MobileBoardModalProvider } from './context/mobileBoardModalContext';
import { DropDownMenuProvider } from './context/dropDownMenuContext';
import { EditTaskModalProvider } from './context/editTaskModalContetx';
import { RandomColorsProvider } from './context/createRandomColorsContext';
import { DeleteBoardProvider } from './context/deleteBoardContext';
import { SnackBarProvider } from './context/customizedSnakabrContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RandomColorsProvider>
      <DropDownMenuProvider>
        <MobileBoardModalProvider>
          <EditTaskProvider>
            <DarkLightModeProvider>
              <LoaderProvider>
                <ModalProvider>
                  <SignInUpProvider>
                    <UserProvider>
                      <TasksManagementProvider>
                        <BoardsProvider>
                          <ColumnsProvider>
                            <AddDataProvider>
                              <AddBoardsProvider>
                                <GetDataProvider>
                                  <AddTaskModalProvider>
                                    <EditTaskModalProvider>
                                      <DeleteBoardProvider>
                                        <SnackBarProvider>
                                          <App />
                                        </SnackBarProvider>
                                      </DeleteBoardProvider>
                                    </EditTaskModalProvider>
                                  </AddTaskModalProvider>
                                </GetDataProvider>
                              </AddBoardsProvider>
                            </AddDataProvider>
                          </ColumnsProvider>
                        </BoardsProvider>
                      </TasksManagementProvider>
                    </UserProvider>
                  </SignInUpProvider>
                </ModalProvider>
              </LoaderProvider>
            </DarkLightModeProvider>
          </EditTaskProvider>
        </MobileBoardModalProvider>
      </DropDownMenuProvider>
    </RandomColorsProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
