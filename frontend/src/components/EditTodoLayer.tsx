import React, {useLayoutEffect, useState} from 'react'

import axios from 'axios'
import { useFormik  } from 'formik'
import * as Yup from 'yup'
import API_URL from '../API_URL';
import Cookies from 'universal-cookie/es6';

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
}

interface ItodoList{
  todoList: Itodo[];
  user_id: string;
  date: string;
}

type Props = {
  id: string,
  todoList: Itodo[],
  calendarTodoLists: ItodoList[],
  indexCalendarTodo: number,
  toggleEditTodoLayer: (id: string) => void
};

const ExampleTodo: React.FC<Props> = ({
  id,
  todoList,
  calendarTodoLists,
  indexCalendarTodo,
  toggleEditTodoLayer
}) =>{
  const cookies = new Cookies();

  const user = cookies.get('user') ? cookies.get('user') : false;
  const jwt = cookies.get('jwt') ? cookies.get('jwt') : false;

  const[minDateValue,setMinDateValue] = useState<string>('')

  const todoIndex = todoList.findIndex(todo => todo.id === id);

  useLayoutEffect(() =>{
    var today: any = new Date();
    var hh: string = String(today.getHours());
    var min: string = String(today.getMinutes() + 1);

    if(Number(min) < 10){
      min = `0${min}`
    }
    if(min === '60'){
      hh = String(parseInt(hh) + 1);
      min = '00';
    }

    const time = `${hh}:${min}`;
    setMinDateValue(time);
  }, [])

  const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
    initialValues: {
      body: todoList[todoIndex].body,
      title: todoList[todoIndex].title,
      date: todoList[todoIndex].date,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, 'title must be shorted than 15')
        .min(4, 'title must be longer than 6 characters')
        .required('Required'),
      body: Yup.string()
        .max(2000, 'body must be shortet than 20 char')
        .min(4, 'body must be longer than 6 characters')
        .required('Required'),
    }),
    onSubmit: async ({title, body, date}) =>{
      const newTodo: Itodo = {
        title,
        body,
        date,
        id
      }

      const newTodos = todoList;
      newTodos[todoIndex] = newTodo;

      const newTodoLists: ItodoList[] = calendarTodoLists;
      newTodoLists[indexCalendarTodo].todoList = newTodos;

      await axios
      .put(`${API_URL}/user-todo-lists/${user.todoList_id}`,
      { todoLists: newTodoLists },
      { headers: { Authorization: `Bearer ${jwt}` } })

      values.body = '';
      values.title = '';
      values.date = minDateValue;
      toggleEditTodoLayer('')
    }
  })

  return(
    <div className="h-screen flex flex-col justify-center">
      <form
        className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        {/* <div className=" mt-4 ml-4 w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4 flex-shrink-0"> */}
          {/* <IIIcon classes={{root: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"}}>
          </IIIcon> */}
        {/* </div> */}
        <div className="items-center md:flex">
          <div className="w-full mr-2">
            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Title
            </label>
            <input
              name="title"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="text"
              value={values.title}
              onChange={handleChange}
            />
          </div>

          <div className="w-full mt-4 md:ml-2 md:mt-0">
            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Time</label>
            <input
              type="time"
              id="date"
              name="date"
              min={minDateValue}
              value={values.date}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Body</label>
          <textarea
            name="body"
            id="body"
            className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            value={values.body}
            onChange={handleChange}
          >
          </textarea>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="cursor-pointer px-4 py-2 w-1/3 xl:w-1/4 mx-4 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            onClick={() => toggleEditTodoLayer('')}
          >
            Back
          </button>
          <input
            className="cursor-pointer px-4 py-2 w-1/3 xl:w-1/4 mx-4 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            value="Edit to do"
            type="submit"
          />

        </div>
      </form>
      <div className="top-3/4 absolute">
        {touched.title && errors.title ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-black p-4 w-96" role="alert">
            <p className="font-bold">Title error</p>
            <p>{ errors.title }</p>
          </div>
        ): null}
        {touched.body && errors.body ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-black p-4 w-96 mt-2" role="alert">
            <p className="font-bold">Body error</p>
            <p>{ errors.body }</p>
          </div>
        ): null}
      </div>
    </div>
  )
}

export default ExampleTodo;