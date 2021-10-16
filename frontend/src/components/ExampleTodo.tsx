import React from 'react'

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
}

type Props = {
  todo: Itodo
  addTodo: (id: string) => void;
};

const ExampleTodo: React.FC<Props> = ({
  todo,
  addTodo,
}) =>{

  return(
    <div className="dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center grid-cols-1 bg-gray-200">
      <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg w-full">
        <div className="max-w-xl px-6 py-12 lg:max-w-5xl w-full flex flex-col justify-between"></div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
          {todo.title}
          <p className="font-light text-base"> { todo.date }</p>
        </h2>
        <div className="flex flex-row justify-around">
          <div className="mt-8">
            <button
              className="w-36 px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700"
              onClick={() => addTodo(todo.id)}
            >
              Add todo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExampleTodo;