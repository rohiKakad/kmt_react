"use client";

// import { useRouter } from "next/navigation";
import "./Form.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getData } from "../services/getService";
import { useRouter } from "next/navigation";
import Loader from "../component/commonLoadder";

interface formType {
  title: string;
  desc: string;
  assetSpecialist:string[],
  assetManager:string[],
  createdOn: string;
  createdBy: string;
  status: string;
  action?: string;
}

const Forms = () => {
  const route = useRouter();
  const [forms, setFormData] = useState<formType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const res = await getData<formType[]>("forms/get-all-forms");
        setFormData(res);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  const getColorStatus = (status:string) => {
     switch(status){
      case 'submitted':
           return "bg-green-100 text-green-800";
      case 'save':
           return "bg-orange-100 text-orange-800";
      case 'save-draft':
           return "bg-orange-200 text-orange-900";
      case 'deleted': 
           return "bg-red-100 text-red-800";
      default: return null;
     }

  }

  return (
    <div>
      <div className="end">
          <button className="submit-btn" onClick={()=> route.push('/forms/create-form')}>Create form</button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Forms Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
          <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-sm text-gray-700 uppercase tracking-wider">
                <th className="p-3 border-b font-semibold">📄 Title</th>
                <th className="p-3 border-b font-semibold">📝 Form Desc</th>
                <th className="p-3 border-b font-semibold">👥 Asset Specialist</th>
                <th className="p-3 border-b font-semibold">👤 Asset Manager</th>
                <th className="p-3 border-b font-semibold">📅 Created On</th>
                <th className="p-3 border-b font-semibold">✍️ Created By</th>
                <th className="p-3 border-b font-semibold">📌 Status</th>
                <th className="p-3 border-b font-semibold">⚙️ Action</th>
              </tr>
            </thead>
            <tbody>
              {
              loading ?  (
                  <tr>
                    <td colSpan={8} className="text-center p-4">
                      <Loader />
                    </td>
                  </tr>
                ) :
               forms &&
                forms.map((form, index) => (
                  <tr key={index}>
                    <td className="p-2 border-b">{form.title}</td>
                    <td className="p-2 border-b">{form.desc}</td>
                    <td className="p-2 border-b">{form.assetSpecialist.join(", ")}</td>
                    <td className="p-2 border-b">{form.assetManager.join(", ")}</td>
                    <td className="p-2 border-b">{form.createdOn}</td>
                    <td className="p-2 border-b">{form.createdBy}</td>
                    <td
                      className={`
                        p-2 border-b
                      `}
                    >
                      <span className={`${getColorStatus(form.status)} px-2 py-1 rounded text-sm font-medium`}>
                      {form.status}
                      </span>
                    </td>
                    <td className="p-2 border-b">
                      <div className="flex gap-4">
                        <button
                          className="text-blue-600 hover:underline"
                          aria-label={`Edit ${form.title}`}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-blue-600 hover:underline"
                          aria-label={`Delete ${form.title}`}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {
               !loading && forms.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Forms;