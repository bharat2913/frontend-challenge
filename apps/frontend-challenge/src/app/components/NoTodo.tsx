import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoAtom } from '../atoms/todoAtom';

export function NoTodo() {
  const [todoList] = useRecoilState(todoAtom);

  const [message, setMessage] = useState('Loading..');
  const completedTodoArr = todoList.filter((el) => el.isComplete);
  const pendingTodoArr = todoList.filter((el) => !el.isComplete);

  useEffect(() => {
    if (completedTodoArr.length > 0 && pendingTodoArr.length < 1) {
      setMessage("You're all done for today");
    } else if (todoList.length < 1) {
      setMessage('It looks like you have no tasks, add a task to get started');
    }
  }, [completedTodoArr.length, pendingTodoArr.length, todoList.length]);
  return (
    <div className="border-solid border-[1.5px] border-slate-300 rounded-xl p-6 ">
      <div className="flex flex-col flex-wrap items-center justify-center">
        <div>
          <img src="https://todoist.b-cdn.net/assets/images/2d7e8bbda4f6d309a7719e0400ead068.png" alt="todoIcon" width={200} />
        </div>
        <div className="pb-8">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default NoTodo;
