"use client"

import axios from "axios";

const url = 'http://127.0.0.1:8000';

export const getData = async<T>(typeofData:string): Promise<T> => {
    try{
    const res = await axios.get(`${url}/${typeofData}`);
    return res.data;
    }
    catch(e){
        throw e;
    }
}