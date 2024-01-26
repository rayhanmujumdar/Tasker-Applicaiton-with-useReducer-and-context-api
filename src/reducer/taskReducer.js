export const initialTask = {
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Integration API",
      description:
        "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
      tags: ["web", "python", "api"],
      priority: "high",
      isFavorite: false,
    },
  ]
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "add_task": {
      return { tasks: [...state.tasks, action.payload] };
    }
    case "edit_task": {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
      };
    }
    case "favorite_task": {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, isFavorite: !task.isFavorite };
          }
          return task;
        }),
      };
    }
    case "remove_task": {
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }
    case "remove_all_task": {
      return {
        tasks: [],
      };
    }
    case 'search_task': {
      return {
        tasks: state.tasks.filter(task => task.title.includes(action.payload))
      }
    }
    default: {
      return state;
    }
  }
};
