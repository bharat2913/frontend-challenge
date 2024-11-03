import { atom } from 'recoil';

interface Todo {
    title: string;
    dueDate: string | undefined;
    description: string | undefined;
    isComplete: boolean;
    id: string;
    completedDate?: string; // Optional completed date
  }
  const getFromLocalStorage = (): Todo[] => {
    const existingTodo = localStorage.getItem('items');
    return existingTodo ? JSON.parse(existingTodo) : [];
  };
  
  export const todoAtom = atom<Todo[]>({
    key: 'todoListState', // Unique ID
    default: getFromLocalStorage(), // Load initial state from local storage
  });


