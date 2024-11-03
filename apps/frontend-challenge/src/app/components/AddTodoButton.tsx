import { useState } from 'react';
import AddTodo from './AddTodo';

export function AddTodoButton() {
  const [addTask, setAddTask] = useState(false);

  return (
    <div className="flex items-center mb-4 group ">
      {!addTask && (
        <button 
          type="button" 
          onClick={() => setAddTask(true)}
          className='btn btn-ghost text-sm w-full justify-start h-auto min-h-0 py-2 hover:bg-transparent group-hover:text-[#dc4c3e] font-medium'
        >
          <span className='w-[17px] h-[17px] rounded-full flex items-center justify-center group-hover:bg-[#dc4c3e] group-hover:text-white'>
            <svg width="13" height="13"><path fill="currentColor" fillRule="evenodd" d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"></path></svg>
          </span>
          Add Task
        </button>
      )}
      {addTask && (
        <AddTodo onClose={() => setAddTask(false)} />
      )}
    </div>
  );
}

export default AddTodoButton;
