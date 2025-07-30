import axios from "axios";

const url = 'http://127.0.0.1:8000';

export const postData = async(formData: any) => {
    try{
        const res = await axios.post(`${url}/forms/add-form`, formData,
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