"use client"
import axios from "axios";

const url = 'http://127.0.0.1:8000';

export const putService = async(formData:any) => {
    const payload = {
        id: formData._id,
        update_data:{
            ...formData
        }
    }
    delete payload.update_data._id;
    try{
        const res = await axios.put(`${url}/forms/form-update`, payload,
            {
               headers: {
                'Content-Type': 'application/json'
             }
            }
        );
       return res ? res : [];

    }
    catch(e){
        throw e;
    }

}