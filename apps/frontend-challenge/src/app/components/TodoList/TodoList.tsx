import { useRecoilState } from 'recoil';
import { todoAtom } from '../../atoms/todoAtom';
import { useState } from 'react';
import arrowUp from './../../../assets/svgs/arrowUp.svg';
import arrowDown from './../../../assets/svgs/arrow-down.svg';
import arrowUpGreen from './../../../assets/svgs/arrowUp-green.svg';
import arrowDownGreen from './../../../assets/svgs/arrow-down-green.svg';
import NoTodo from '../NoTodo';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const [showAll, setShowAll] = useState(false);
  const [completedShowAll, setCompletedShowAll] = useState(false);
  const [todoList, setTodoList] = useRecoilState(todoAtom);

  const completedTodoArr = todoList.filter((el) => el.isComplete);
  const pendingTodoArr = todoList.filter((el) => !el.isComplete);
  const handleChangeTodo = (id: string) => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }; // Correctly typed options
    const textDate = currentDate.toLocaleString('en-US', options);
    setTodoList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isComplete: !item.isComplete,
            completedDate: item.isComplete ? undefined : textDate, // Set date if completing the task
          };
        }
        return item; // Return the item unchanged if the id does not match
      })
    );
  };

  const handleDelete = (id: string) => {
    setTodoList((prevList) => prevList.filter((el) => el.id !== id));
  };

  return (
    <>
      <ul>
        {(showAll ? pendingTodoArr : pendingTodoArr.slice(0, 4))
          .map((el) => (
          <TodoItem
            key={el.id} 
            id={el.id} 
            isComplete={el.isComplete} 
            completedDate={el.completedDate} 
            dueDate={el.dueDate} 
            title={el.title} 
            description={el.description} 
            expandedId={expandedId} 
            handleChangeTodo={handleChangeTodo} 
            toggleExpand={toggleExpand} 
            handleDelete={handleDelete}
          />
        ))}

        {pendingTodoArr.length > 4 && (
          <button
            type="button"
            className="btn btn-ghost h-auto min-h-0 py-2 text-green-600"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <span>
              {showAll
                ? 'Show Less'
                : `Show More (${pendingTodoArr.length - 4})`}
            </span>{' '}
            {showAll ? (
              <img src={arrowUp} alt="arrowUp" />
            ) : (
              <img src={arrowDown} alt="arrowDown" />
            )}
          </button>
        )}
      </ul>
      {(completedTodoArr.length > 0) && (pendingTodoArr.length < 1) && (
        <NoTodo />
      )}
      <ul>
        {completedTodoArr.length > 0 && (
          <div className='flex justify-end'>
            <button
              type="button"
              className="btn btn-ghost h-auto min-h-0 py-2 text-green-600"
              onClick={() => setCompletedShowAll((prev) => !prev)}
            >
              <span>
                {!completedShowAll
                  ? `Show Completed (${completedTodoArr.length})`
                  : 'Hide Completed'}
              </span>{' '}
              {completedShowAll ? (
                <img src={arrowUpGreen} alt="arrowUp" />
              ) : (
                <img src={arrowDownGreen} alt="arrowDown" />
              )}
            </button>
          </div>
        )}

        {completedShowAll && completedTodoArr.map((el) => (
          <TodoItem
            key={el.id} 
            id={el.id} 
            isComplete={el.isComplete} 
            completedDate={el.completedDate} 
            dueDate={el.dueDate} 
            title={el.title} 
            description={el.description} 
            expandedId={expandedId} 
            handleChangeTodo={handleChangeTodo} 
            toggleExpand={toggleExpand} 
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
