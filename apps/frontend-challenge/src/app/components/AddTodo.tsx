import { useRecoilState } from 'recoil';
import { todoAtom } from '../atoms/todoAtom';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';

export function AddTodo({ onClose }: { onClose: () => void }) {

  const [_, setTodoList] = useRecoilState(todoAtom);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
    },
    onSubmit: (values) => {
      
      handleAddTodoItem({
        title: values.title,
        description: values.description,
        dueDate: values.dueDate
      });
    },
  })


  const handleAddTodoItem = ({ title, description, dueDate }: 
    { title: string; description: string; dueDate: string }
  )=> {
    const newTodoItem = {
      title: title,
      dueDate: dueDate ? dueDate : undefined,
      description: description ? description : undefined,
      isComplete: false,
      id: uuidv4(),
    };

    //  Update the todo list
    setTodoList((prevTodoList) => {
      const updatedList = [...prevTodoList]; // Copy the previous list
      updatedList.unshift(newTodoItem); // Add the new item to the beginning of the list
      return updatedList; // Return the updated list
    });
    formik.resetForm();
  };


  return (
    <form onSubmit={formik.handleSubmit} className="w-full border rounded p-3">
      <div>
        <div className="">
          <input
            id="title"
            name="title"
            type="text"
            autoFocus
            placeholder='Task Name'
            value={formik.values.title}
            onChange={formik.handleChange}
            className="input w-full font-semibold h-auto !outline-none border-0 bg-transparent text-base px-0"
          />
        </div>
        <div className="">
          <input
            name="description"
            id="description"
            placeholder='Task Description'
            value={formik.values.description}
            onChange={formik.handleChange}
            className="input w-full h-auto !outline-none border-0 bg-transparent text-sm px-0"
          ></input>
        </div>
        <div className="">
          <input
            type="date"
            name="dueDate"
            value={formik.values.dueDate ? new Date(formik.values.dueDate).toISOString().split('T')[0] : ''}
            onChange={(e) => formik.setFieldValue('dueDate', e.target.value ? new Date(e.target.value).toISOString().split('T')[0] : null)}
            id="dueDate"
            className="input h-auto !outline-none border-0 bg-transparent text-sm px-0"
          />
        </div>
      </div>
      <div className='flex justify-end items-center gap-4'>
        <button
          type="button"
          className="btn h-auto min-h-0 py-2 bg-gray-200 font-medium border-0"
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="submit" className="btn h-auto min-h-0 py-2  border-0 bg-[#dc4c3e] disabled:bg-[#dc4c3e] disabled:bg-opacity-50 !text-white font-medium"
          disabled={!formik.values.title}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default AddTodo;
