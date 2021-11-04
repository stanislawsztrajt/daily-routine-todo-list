import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Link, useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import API_URL from '../API_URL';

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
}

const GoToCalendarTodoListDay: React.FC = () =>{
  const history = useHistory();
  const cookies = new Cookies();

  const user: any = cookies.get('user') ? cookies.get('user') : false;
  const jwt: string = cookies.get('jwt') ? cookies.get('jwt') : false;

  const [calendarValue, onChange] = useState<Date>(new Date());
  const [valueInNumber, setValueInNumber] = useState<string>();
  const [isUsed, setIsUsed] = useState<boolean>(false)

  useEffect(() => {
    if(isUsed){
        axios.get(`${API_URL}/user-todo-lists/${user.todoList_id}`,
        { headers: { Authorization: `Bearer ${jwt}` } })
        .then(async res => {
          const isTodoListExist: number = res.data.todoLists.findIndex((todoList: Itodo) => todoList.date === String(calendarValue))

          if(isTodoListExist === -1){
            await axios.get(`${API_URL}/user-todo-lists/${user.todoList_id}`,
            { headers: { Authorization: `Bearer ${jwt}` } })
            .then(async res => {
              res.data.todoLists.push({ todoList: [], date: calendarValue })
              await axios.put(`${API_URL}/user-todo-lists/${user.todoList_id}`,
              { todoLists: res.data.todoLists },
              { headers: { Authorization: `Bearer ${jwt}` } })
              .then(() => history.push(`/calendary/${calendarValue}`))
              .catch(err => console.log(err))
            })
          } else{
            history.push(`/calendary/${calendarValue}`)
          }
        })
        .catch(err => console.log(err))
    }
    setIsUsed(true)
  }, [calendarValue])

  return(
    <div>
      <Calendar
        onChange={onChange}
        value={calendarValue}
      />
      {valueInNumber}
    </div>
  )
}

export default GoToCalendarTodoListDay;