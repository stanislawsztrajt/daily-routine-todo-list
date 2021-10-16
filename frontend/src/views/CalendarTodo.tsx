import stringify from 'json-stringify-safe';
import { type } from 'os';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import API_URL from '../API_URL';
import { getUserData } from '../requestes/getUserData';

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

interface Props {
  calendarDate: string;
}

const CalendarTodo:React.FC = () =>{
  const calendarDate = useParams<Props>().calendarDate;
  const cookies = new Cookies();

  // getUserData(cookies.get('jwt'), cookies.get('user').id)

  return(
    <div>
      testestestsetsetset
      {calendarDate}
    </div>
  )
}

export default CalendarTodo;