import axios from "axios"
import API_URL from "../API_URL"

export const getUserData = async (id: string, jwt: string) =>{
  await axios.get(`${API_URL}/users/${id}`)
}