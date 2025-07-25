import axios from "axios";

const URI = 'http://127.0.0.1:8000';

interface LoginResponse {
  data: object;
}

export const Login = async (email: string, password: string) => {
  try {
    const res: LoginResponse = await axios.post(`${URI}/user/login`, {
      email,
      password,
    });
    return res? res : null;
  } catch (err) {
    throw err;
  }
};
