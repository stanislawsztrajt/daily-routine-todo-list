import axios from 'axios';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import Cookies from 'universal-cookie';
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

interface Props {
  calendarDate: string;
}

const Home:React.FC = () =>{
  const cookies = new Cookies();
  const user = cookies.get('user') ? cookies.get('user') : false;
  const jwt = cookies.get('jwt') ? cookies.get('jwt') : false;

  useEffect(() => {
    const fetchToDoList = async () =>{
      await axios
      .get(`${API_URL}/user-to-do-lists/${user.id}`,
      { headers: { Authorization: `Bearer ${jwt}` } })
      .then(res => console.log(res))
    }
  }, [])

  return(
    <div>
      Home
    </div>
  )
}

export default Home;