import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Link, useHistory } from "react-router-dom";

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
}

const AddToDoForm: React.FC = () =>{
  const history = useHistory();

  const [value, onChange] = useState<Date>(new Date());
  const [valueInNumber, setValueInNumber] = useState<number>(0);
  const [isUsed, setIsUsed] = useState<boolean>(false)

  useEffect(() => {
    if(isUsed){
      // setValueInNumber(Date.parse(String(value)))
      history.push(`/calendary/${value}`)
    }
    setIsUsed(true)
  }, [value])

  return(
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
      {valueInNumber}
    </div>
  )
}

export default AddToDoForm;