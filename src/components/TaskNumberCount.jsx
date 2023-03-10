import React from 'react';

const TaskNumberCount = ({ task, colName }) => {
  return (
    <span>
      {
        task
          .map((items) => items.colToAdd === colName)
          .filter((colItems) => colItems).length
      }
    </span>
  );
};

export default TaskNumberCount;
