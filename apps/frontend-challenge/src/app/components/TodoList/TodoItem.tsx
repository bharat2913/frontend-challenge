import deleteIcon from './../../../assets/svgs/delete.svg';
import clsx from 'clsx';

interface TodoItemProps {
    id: string;
    isComplete: boolean;
    completedDate?: string;
    dueDate?: string;
    title: string;
    description?: string;
    expandedId: string | null;
    handleChangeTodo: (id: string) => void;
    toggleExpand: (id: string) => void;
    handleDelete: (id: string) => void;
}

export const TodoItem = ({ id, isComplete, completedDate, dueDate, title, description, expandedId, handleChangeTodo, toggleExpand, handleDelete }: TodoItemProps) => {
  return (
    <li
        className={clsx("relative border-solid border-b-[1.5px] hover:border-slate-300 p-1 py-2 flex gap-4", isComplete ? 'bg-[#d4edda] rounded-md mb-2' : 'hover:bg-[#f2f2f2]' )}
        key={id}
    >
        <div>
            <input
            type="checkbox"
            id={`checkbox-${id}`} // Unique ID for each checkbox
            className="checkbox"
            checked={isComplete}
            onChange={() => handleChangeTodo(id)} // Pass the id
            />
        </div>
        <div className="flex justify-center w-full flex-col">
            <div className='text-base font-[500]'>
                {title}
            </div>
            {description && (
                <div key={id} className='text-sm text-gray-500'>
                    {expandedId === id || description.length <= 160
                        ? description
                        : `${description.substring(0, 160)}...`}
                    {description.length > 160 && (
                        <span
                            onClick={() => toggleExpand(id)}
                            className="read-more"
                            style={{ color: 'blue', cursor: 'pointer' }}
                        >
                            {expandedId === id ? ' Show less' : ' Read more'}
                        </span>
                    )}
                </div>
            )}

            <p className="mt-2.5 block text-sm">
                {isComplete
                    ? `Completed on ${completedDate}`
                    : dueDate
                    ? `Due by: ${dueDate}`
                    : ``}
            </p>
        </div>
        <div className="">
            <button
                type="button"
                onClick={() => handleDelete(id)}
                className="btn btn-ghost btn-square btn-sm  text-red-600  hover:underline"
            >
            <img src={deleteIcon} alt="deleteIcon" />
            </button>
        </div>
    </li>
  )
}
