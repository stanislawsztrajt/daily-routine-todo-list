import React from 'react'

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
}

type Props = {
  id: string
  toggleDeleteTodoLayer: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const DeleteTodoLayer: React.FC<Props> = ({
  id,
  toggleDeleteTodoLayer,
  deleteTodo
}) =>{

  return(
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="p-20 bg-gray-100">
        <div className="text-3xl">Are you sure you want to delete to do ?</div>
        <div className="flex flex-row justify-around mt-8">
          <div className="w-32 bg-black text-white p-5 text-center text-2xl font-bold rounded-xl hover:opacity-80 duration-150 cursor-pointer" onClick={() => deleteTodo(id)}>Yes</div>
          <div className="w-32 bg-white text-black p-5 text-center text-2xl font-bold rounded-xl hover:opacity-80 duration-150 cursor-pointer" onClick={() => toggleDeleteTodoLayer('')}>No</div>
        </div>
      </div>
    </div>
  )
}

export default DeleteTodoLayer;