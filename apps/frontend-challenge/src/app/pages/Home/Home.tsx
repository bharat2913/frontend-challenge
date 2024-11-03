import { useEffect } from 'react'
import { Header } from '../../components/Header/Header'
import AddTodoButton from '../../components/AddTodoButton'
import NoTodo from '../../components/NoTodo'
import TodoList from '../../components/TodoList/TodoList'
import { useRecoilState } from 'recoil'
import { todoAtom } from '../../atoms/todoAtom'

export const Home = () => {
    const [todoList] = useRecoilState(todoAtom);

useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todoList));
}, [todoList]);

  return (
    <div>
        <Header />
        <div className="py-8 px-4 lg:px-[50px] flex justify-center gap-4">
            <div className="w-full max-w-[600px] ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-[500]">Tasks</h2>
                </div>

                {todoList.length < 1 ? <NoTodo  /> : <TodoList />}
                
                <AddTodoButton />
            </div>
        </div>
    </div>
)
}
