import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie';

import API_URL from '../API_URL';


const Dashboard:React.FC = () =>{
  const cookies = new Cookies();

  const user = cookies.get('user')

  useEffect(() =>{
    console.log(user)
  }, [])

  return(
    <div>
      {user.username}
    </div>
  )
}

export default Dashboard