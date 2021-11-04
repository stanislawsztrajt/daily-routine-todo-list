import React, {useState, useLayoutEffect, useEffect} from 'react';
import { useFormik  } from 'formik'
import * as Yup from 'yup'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie';

import EditTodoLayer from '../components/EditTodoLayer';
import DeleteTodoLayer from '../components/DeleteTodoLayer';
import ExampleTodo from '../components/ExampleTodo';
import { useParams } from 'react-router-dom';
import AddTodoForm from '../components/AddTodoForm';
import Todos from '../components/Todos';
import Icons from '../components/Icons';

import API_URL from '../API_URL';

// 1. Rozciąganie szyi 60 sekund 2:10
// 2. Wzmacnianie szyi 10 powtórzeń 2:41
// 3. Rozciąganie klatki piersiowej 60 sekund 3:29
// 4. Krążenie przy ściany 10 powtórzeń 4:25
// 5. Przenoszenie kija 10 powtórzeń 4:53
// 6. Rozciąganie kapturów 60 sekund 4:02
// 7. Unoszenie przy ścianie 10 powtórzeń 5:15
// 8. Odwrotne rozpietki 10 powtórzeń 6:10
// 9. Wiosłowanie z zatrzymaniem 6:59 10 powtórzeń
// 10. Unoszenie w opadzie 1 p powtórzeń 7:21

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
  icon: any;
  isEnded: boolean;
  // icon: object|string;
}

interface Iicon{
  icon: object|string;
  selected: boolean;
  id: string;
}


interface ItodoList{
  todoList: Itodo[];
  user_id: string;
  date: string;
}

interface Props {
  calendarDate: string;
}

const CalendarToDo:React.FC = () =>{
  const calendarDate: string|number = useParams<Props>().calendarDate;
  const [calendarTodoLists, setCalendarTodoLists] = useState<ItodoList[]>([])

  const history: object = useHistory();
  const cookies: any = new Cookies();
  const user: any = cookies.get('user') ? cookies.get('user') : false;
  const jwt: string = cookies.get('jwt') ? cookies.get('jwt') : false;

  const[indexCalendarTodo, setIndexCalendarTodo] = useState(0);


  const[todoList,setTodoList] = useState<Itodo[]>([]);

  const[minDateValue,setMinDateValue] = useState<string>('');
  const[todayIs,setTodayIs] = useState<string>('');

  const[isShowEditTodoLayer,setIsShowEditTodoLayer] = useState<boolean>(false);
  const[idEditTodo, setIdEditTodo] = useState<string>('');

  const[isShowDeleteTodoLayer,setIsShowDeleteTodoLayer] = useState<boolean>(false);
  const[idDeleteTodo, setIdDeleteTodo] = useState<string>('');

  const[todoIcons, setTodoIcons]  = useState<Iicon[]>(
    [
      {
        icon: <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        className="w-6 h-6" viewBox="0 0 24 24"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>,
        selected: true,
        id: String(Math.random())
      },
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>,
        selected: false,
        id: String(Math.random())
      },
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>,
        selected: false,
        id: String(Math.random())
      },
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>,
        selected: false,
        id: String(Math.random())
      },
    ]
  )

  const exampleTodos: Itodo[] = [
    {
      title: 'wyprowadzic psa',
      body: 'wyprowadzic mojego pieska ze smycza ktora jest na ławce',
      date: `${todayIs}T12:00`,
      id: String(Math.random()),
      isEnded: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    },
    {
      title: 'wyprowadzic kota',
      body: 'wyprowadzic mojego kota ze smycza ktora jest na podlodze',
      date: `${todayIs}T14:00`,
      id: String(Math.random()),
      isEnded: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    }
  ];

  useLayoutEffect(() =>{
    console.log(Date.parse(calendarDate))
    var today: any = new Date();
    var yy: string = String(today.getYear());
    var mm: string = String(today.getMonth());
    var dd: string = String(today.getDate());
    var hh: string = String(today.getHours());
    var min: string = String(today.getMinutes() + 2);
    if(Number(min) < 10){
      min = `0${min}`
    }
    if(min === '60'){
      hh = String(parseInt(hh) + 2);
      min = '00';
    }
    else if(min === '61'){
      hh = String(parseInt(hh) + 2);
      min = '00';
    }


    today = `${hh}:${min}`;
    setTodayIs(`${yy}:${mm}:${dd}T${today}`)
    setMinDateValue(today);
    console.log(String(`${yy}:${mm}:${dd}T00:00 `))

    const fetchTodos = async () => {
      await axios
      .get(`${API_URL}/user-todo-lists/${user.todoList_id}`,
      { headers: { Authorization: `Bearer ${jwt}` } })
      .then(res => {
        const index = res.data.todoLists.findIndex((todoList: any) => Date.parse(`${yy}:${mm}:${dd}T${todoList.date}`) === Date.parse(calendarDate))
        setCalendarTodoLists([...res.data.todoLists])
        setIndexCalendarTodo(index)
        res.data.todoLists[index].todoList.sort(function(a: Itodo ,b: Itodo){
          return Date.parse(`${yy}:${mm}:${dd}T${a.date}`) - Date.parse(`${yy}:${mm}:${dd}T${b.date}`);
        })
        setTodoList([...res.data.todoLists[index].todoList]);
      })
      .catch(err => console.log(err))
    }
    fetchTodos()
  }, [])

  useEffect(() =>{
    if(Date.parse(calendarDate) != today){
      var today: any = new Date();
      var yy: string = String(today.getYear());
      var mm: string = String(today.getMonth());
      var dd: string = String(today.getDate());
      var hh: string = String(today.getHours());
      var min: string = String(today.getMinutes() + 2);
      if(Number(min) < 10){
        min = `0${min}`
      }
      if(min === '60'){
        hh = String(parseInt(hh) + 2);
        min = '00';
      }
      else if(min === '61'){
        hh = String(parseInt(hh) + 2);
        min = '00';
      }
      today = `${hh}:${min}`;
      setTodayIs(`${yy}:${mm}:${dd}T${today}`)
      setMinDateValue(today);
    }

    todoList.forEach(todo =>{
      if(!todo.isEnded){
        if(Date.parse(`${todayIs}T${todo.date}`) <= Date.parse(Date())){
          const newTodos = todoList;
          const index = newTodos.findIndex(todoIndex => todoIndex.id === todo.id)
          newTodos[index].isEnded = true;
          setTodoList([...newTodos])

          const newTodoLists: ItodoList[] = calendarTodoLists;
          newTodoLists[indexCalendarTodo].todoList = newTodos;
          new Notification(`${todo.title}`, {
            body: todo.body,
          });
          const putTodoList = async () =>{
            await axios.put(`${API_URL}/user-todo-lists/${user.todoList_id}`,
            { todoLists: newTodoLists },
            { headers: { Authorization: `Bearer ${jwt}` } })
          }
          putTodoList()
        }
      }
    })
    const interval = setInterval(() =>{
      todoList.forEach(async todo =>{
        if(!todo.isEnded){
          if(Date.parse(`${todayIs}T${todo.date}`) <= Date.parse(Date())){
            const newTodos = todoList;
            const index = newTodos.findIndex(todoIndex => todoIndex.id === todo.id)
            newTodos[index].isEnded = true;
            setTodoList([...newTodos])

            const newTodoLists: ItodoList[] = calendarTodoLists;
            newTodoLists[indexCalendarTodo].todoList = newTodos;
            new Notification(`${todo.title}`, {
              body: todo.body,
            });
            const putTodoList = async () =>{
              await axios.put(`${API_URL}/user-todo-lists/${user.todoList_id}`,
              { todoLists: newTodoLists },
              { headers: { Authorization: `Bearer ${jwt}` } })
            }
            putTodoList()
          }
        }
      })
    },60000)
    return () =>{
      clearInterval(interval)
    }
  }, [todoList])

  const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
    initialValues: {
      body: '',
      title: '',
      date: minDateValue,
    },
    validationSchema: Yup.object({
      body: Yup.string()
        .max(750, 'title must be shortet than 750 char')
        .min(4, 'title must be longer than 4 characters')
        .required('Required'),
      title: Yup.string()
        .max(120, 'body must be shorted than 120')
        .min(4, 'body must be longer than 4 characters')
        .required('Required'),

    }),
    onSubmit: ({title, body, date}) =>{
      const HTMLicons = [
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ]
      const iconIndex: number = todoIcons.findIndex(el => el.selected === true)
      const icon: object = HTMLicons[iconIndex];
      const newTodo: Itodo = {
        title,
        body,
        date,
        icon: '',
        isEnded: false,
        id: String(Math.random()),
      }

      setTodoList((prevState: Itodo[]) =>[...prevState,newTodo]);

      const newTodos: Itodo[] = todoList;
      newTodos.push(newTodo)

      const newTodoLists: ItodoList[] = calendarTodoLists;
      newTodoLists[indexCalendarTodo].todoList = newTodos;

      const saveNewTodos = async () => {
        await axios
        .put(`${API_URL}/user-todo-lists/${user.todoList_id}`,
        { todoLists: newTodoLists },
        { headers: { Authorization: `Bearer ${jwt}` } })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
      saveNewTodos()

      values.body = '';
      values.title = '';
      values.date = minDateValue;
      handleSubmit()

      console.log(values)
    }
  })

  const toggleTodoIsEnded = (id: string) =>{
    const index = todoList.findIndex(todo => todo.id === id)
    if(Date.parse(todoList[index].date) <= Date.parse(Date())) return

    const newTodos = todoList;
    newTodos[index].isEnded = !newTodos[index].isEnded;
    setTodoList([...newTodos]);

    const newTodoLists: ItodoList[] = calendarTodoLists;
    newTodoLists[indexCalendarTodo].todoList = newTodos;

    const putNewTodos = async () =>{
      await axios
      .put(`${API_URL}/user-todo-lists/${user.todoList_id}`,
      { todoLists: newTodoLists },
      { headers: { Authorization: `Bearer ${jwt}` } })
    }
    putNewTodos()
  }

  const toggleEditTodoLayer = (id: string) => {
    setIsShowEditTodoLayer(!isShowEditTodoLayer);
    setIdEditTodo(id);
  }

  const toggleDeleteTodoLayer = (id: string) =>{
    setIsShowDeleteTodoLayer(!isShowDeleteTodoLayer);
    setIdDeleteTodo(id);
  }

  const deleteTodo = (id: string) =>{
    const indexTodo: number = todoList.findIndex(el => el.id === id);
    todoList.splice(indexTodo,1);
    setTodoList([...todoList]);

    const newTodos = todoList;
    newTodos.splice(indexTodo, 1)

    const newTodoLists: ItodoList[] = calendarTodoLists;
    newTodoLists[indexCalendarTodo].todoList = newTodos;

    const putNewTodos = async () =>{
      await axios
      .put(`${API_URL}/user-todo-lists/${user.todoList_id}`,
      { todoLists: newTodoLists },
      { headers: { Authorization: `Bearer ${jwt}` } })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
    toggleDeleteTodoLayer('')
    putNewTodos()
  }

  const selectIcon = (id: string) =>{
    const indexLastSelected: number = todoIcons.findIndex(icon => icon.selected === true);
    const indexSelected: number = todoIcons.findIndex(icon => icon.id === id);

    let newTodoIcons: Iicon[] = todoIcons;

    newTodoIcons[indexLastSelected].selected = false;
    newTodoIcons[indexSelected].selected = true;

    setTodoIcons([...newTodoIcons])
  }

  // const addExampleTodo = (id: string) =>{
  //   const indexTodo: number = exampleTodos.findIndex(el => el.id === id);
  //   const newTodo = exampleTodos[indexTodo]

  //   setTodoList((prevState: Itodo[]) =>[...prevState,newTodo]);


  //   const newTodos: Itodo[] = todoList;
  //   newTodos.push(newTodo)

  //   const saveNewTodos = async () => {
  //     await axios
  //     .put(`${API_URL}/users/${user.todoList_id}`,
  //     { todoLists: newTodos },
  //     { headers: { Authorization: `Bearer ${jwt}` } })
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  //   }
  //   saveNewTodos()
  // }

  const todos = todoList.map((todo: Itodo) =>{
    return (
      <Todos
        toggleTodoIsEnded={() => toggleTodoIsEnded(todo.id)}
        toggleEditTodoLayer={() => toggleEditTodoLayer(todo.id)}
        toggleDeleteTodoLayer={() => toggleDeleteTodoLayer(todo.id)}
        todo={todo}
        key={todo.id}
      />
    )
  })

  const todoIconsMap = todoIcons.map(icon => {
    return(
      <Icons
        icon={icon}
        selectIcon={selectIcon}
        key={icon.id}
      />
    )
  })

  // const exampleTodosMap = exampleTodos.map(todo =>{
  //   return (
  //     <ExampleTodo
  //       key={todo.id}
  //       todo={todo}
  //       addTodo={addExampleTodo}
  //     />
  //   )
  // })

  return(
    <div className="p-2">
      <h1 className='text-center font-semibold text-4xl mt-2'>{calendarDate}</h1>
      { isShowEditTodoLayer ?
        <EditTodoLayer
          id={idEditTodo}
          todoList={todoList}
          calendarTodoLists={calendarTodoLists}
          indexCalendarTodo={indexCalendarTodo}
          toggleEditTodoLayer={() => toggleEditTodoLayer(idEditTodo)}
        />
      : null}
      { isShowDeleteTodoLayer ?
        <DeleteTodoLayer
          id={idDeleteTodo}
          toggleDeleteTodoLayer={() => toggleDeleteTodoLayer(idDeleteTodo)}
          deleteTodo={() => deleteTodo(idDeleteTodo)}
        />
      : null}


      { (!isShowDeleteTodoLayer && !isShowEditTodoLayer) ?
        <div>
          <div className=" mt-12">
            {/* {exampleTodosMap} */}
            <div className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
              {todoIconsMap}
              <AddTodoForm
                values={values}
                minDateValue={minDateValue}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
              />
            </div>
          </div>
          { todoList.length > 0  ?
            <div className="bg-white dark:bg-gray-800 grid grid-cols-1 xl:grid-cols-3 mt-10">
              { todos }
            </div>
          :null }

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
      : null }
    </div>
  )
}

export default CalendarToDo;