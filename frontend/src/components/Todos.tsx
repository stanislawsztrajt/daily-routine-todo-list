import React from 'react'

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
  isEnded: boolean;
  icon: object|string;
}

type Props = {
  todo: Itodo;
  toggleTodoIsEnded: (id: string) => void;
  toggleEditTodoLayer: (id: string) => void;
  toggleDeleteTodoLayer: (id: string) => void;
};

const ExampleTodo: React.FC<Props> = ({
  todo,
  toggleTodoIsEnded,
  toggleEditTodoLayer,
  toggleDeleteTodoLayer
}) =>{

  return(
    <div className={`dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center grid-cols-1 bg-gray-200 ${todo.isEnded ? "opacity-60" : ""}`}>
        <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg w-full">
          <div className="mt-4 ml-4 w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4 flex-shrink-0">
            { todo.icon }
          </div>
          <div className="max-w-xl -ml-2 px-6 py-12 lg:max-w-5xl w-full flex flex-col justify-between -mt-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
              { todo.title }
              <p className="font-light text-base"> { todo.date }</p>
            </h2>
            {  }

            <p className="mt-4 text-gray-600 dark:text-gray-400">{ todo.body }</p>

            <div className="flex flex-row justify-around flex-wrap">
              <div className="mt-8">
                <button
                  onClick={() => toggleTodoIsEnded(todo.id)}
                  className="w-36 px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700"
                >
                  Disable / able
                </button>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => toggleEditTodoLayer(todo.id)}
                  className="w-36 px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700"
                >
                  Edit
                </button>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => toggleDeleteTodoLayer(todo.id)}
                  className="w-36 px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ExampleTodo;