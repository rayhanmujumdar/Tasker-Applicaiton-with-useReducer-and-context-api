import { useTaskDispatch } from "../context/TaskProvider";
import tagBgColor from "../utils/tagBgColor";

export default function TaskItem({ task, onEdit }) {
  const { id, title, description, priority, tags, isFavorite } = task;
  const dispatch = useTaskDispatch();
  // handler
  const handleDeleteTask = () => {
    dispatch({
      type: "remove_task",
      payload: id,
    });
  };
  return (
    <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
      <td>
        <button
          onClick={() => dispatch({ type: "favorite_task", payload: id })}
        >
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="yellow"
              fill="yellow"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
          )}
        </button>
      </td>
      <td>{title}</td>
      <td>
        <div>{description}</div>
      </td>
      <td>
        <ul className="flex justify-center gap-1.5 flex-wrap">
          {tags.map((tag, index) => (
            <li key={index}>
              <span
                className={`inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6]`}
                style={{ backgroundColor: tagBgColor() }}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </td>
      <td className="text-center capitalize">{priority}</td>
      <td>
        <div className="flex items-center justify-center space-x-3">
          <button onClick={handleDeleteTask} className="text-red-500">
            Delete
          </button>
          <button onClick={() => onEdit(task)} className="text-blue-500">
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}
