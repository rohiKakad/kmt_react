"use client";

import { useState } from "react";
import { Login } from "../services/authService";
import Toast from "./Toast";
import { useRouter } from "next/navigation";
import Loader from "./commonLoadder";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{message:string; type: 'success' | 'error' } | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res:any = await Login(email, password);
      if(res?.status === 200){
        localStorage.setItem('Jwt-token', res.data.access_token);
         router.push("/forms");
          setToast({message: 'Login Successful', type:'success'});
      }
      setLoading(false);
    } catch (er:unknown) {
        setLoading(false);
        if(er instanceof Error){
            setToast({message: 'Failed to login', type:'error'});
        }
    }
  };

  return (
    <div>
      <form
        action="form"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-wide">
          Welcome Back 👋
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        ></input>
        <div>
          { loading ? <Loader /> :
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
}
        </div>
        {
            toast && (
                <Toast message={toast.message} type={toast.type} onClose={() =>setToast(null)}></Toast>
            )
        }
      </form>

      <div className="w-full mt-3 flex flex-col sm:flex-row gap-3">
        <div className="w-50">
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-5 rounded-md shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold"
          >
            Sign In
          </button>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto bg-white text-blue-600 py-2 px-5 rounded-md border border-blue-600 shadow-sm hover:bg-blue-50 transition-all duration-300 font-semibold"
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
}
