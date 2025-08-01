"use client";

import { useCallback, useEffect, useState } from "react";
import "./Create.css";
import Select from "react-select";
import { postData } from "../../services/postService";
import Toast from "../../component/Toast";
import Loader from "../../component/commonLoadder";

type SelectOption = {
  value: string;
  label: string;
};
type FormDataType = {
  title: string;
  desc: string;
  assetSpecialist: string[];
  assetManager: string[];
  note: string;
  isChecked: boolean;
  status: string;
  createdOn: Date;
  createdBy: string;
};

const CreateForm = () => {
  const [formData, setFormdata] = useState<FormDataType>({
    title: "",
    desc: "",
    assetSpecialist: [],
    assetManager: [],
    note: "",
    isChecked: false,
    status: "submitted",
    createdOn: new Date(),
    createdBy: "Rohidas kakad",
  });

  const [isClient, setClient] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [loadder, setLoadder] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const assetSpecialistOptions = ["Chrish", "Gayle", "Adam", "Reena","Ashwini"];
  const assetMangersOptions = ["Tejas", "Rohidas", "Akshay", "Sachin", "Nitin"];

  useEffect(() => {setClient(true)},[])

  const handelSubmit = async (e: React.FormEvent) => {
    setLoadder(true);
    e.preventDefault();
    const updated = {
      ...formData,
      status: 'submitted'
    }
    setFormdata(updated);
    if (!isValidForm) return null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res:any = postData(updated);
      setToast({ message: `${res?.message} as ${updated.status}`, type: "success" });
      setLoadder(false);
    } catch (e) {
      setToast({ message: "Failed to save form", type: "error" });
      setLoadder(true);
    }
  };

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormdata({
      ...formData,
      status:"submitted",
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMultiSelectChange = (
    selectOption: SelectOption[],
    type: string
  ) => {
    switch (type) {
      case "specialist":
        setFormdata({
          ...formData,
          assetSpecialist: selectOption.map((option) => option.value),
        });
        break;
      case "manager":
        setFormdata({
          ...formData,
          assetManager: selectOption.map((option) => option.value),
        });
        break;
    }
  };

  const handleSave = async () => {
        setLoadder(true);
    const updated = {
      ...formData,
      status: "save",
    };
    setFormdata(updated);
    if (!isValidForm) return null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await postData(updated);
      setToast({ message: `${res?.message} as ${updated.status}`, type: "success" });
      setLoadder(false);
    } catch (e) {
      setToast({ message: "Failed to store data", type: "error" });
      setLoadder(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoadder(true);
    const updated = {
      ...formData,
      status: "save-draft",
    };
    setFormdata(updated);
    if (!isValidForm) return null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await postData(updated);
      setToast({ message: `${res?.message} as ${updated.status}`, type: "success" });
      setLoadder(false);
    } catch (e) {
      setToast({ message: "Failed to store data", type: "error" });
      setLoadder(false);
    }
  };

  const validForm = useCallback(() => {
    return (
      formData.title.trim() !== "" &&
      formData.desc.trim() !== "" &&
      formData.note.trim() !== "" &&
      formData.assetManager.length > 0 &&
      formData.assetSpecialist.length > 0 &&
      formData.isChecked
    );
  }, [formData]);

  useEffect(() => {
    setIsValidForm(validForm());
    setLoadder(false);
  }, [validForm]);

  return (
    <>
    { loadder ? <Loader /> :
    <form onSubmit={handelSubmit} className="form-container">
      <div className="form-header">
        <label htmlFor="title">
          <h1>
            <strong>Form Details</strong>
          </h1>
        </label>
      </div>
      <div className="form-row">
        <div className="left-column">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="desc">Descreption:</label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChange}
            className="form-input"
          />
          <label>Asset Specialist:</label>
          { isClient && (
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={assetSpecialistOptions.map((item) => ({
                value: item,
                label: item,
              }))}
              onChange={(selected) =>
                handleMultiSelectChange(
                  selected as SelectOption[],
                  "specialist"
                )
              }
            />
          )}

          <label>Asset Managers:</label>
          { isClient && (
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={assetMangersOptions.map((item) => ({
                value: item,
                label: item,
              }))}
              onChange={(selected) =>
                handleMultiSelectChange(selected as SelectOption[], "manager")
              }
            />
          )}
        </div>
        <div className="right-column">
          <label htmlFor="note">Note:</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={() => handleChange}
          ></textarea>
          <div>
            <label htmlFor="check">Agree? </label>
            <input
              type="checkbox"
              name="isChecked"
              checked={formData.isChecked}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="button-group">
        {loadder ? (
          <Loader />
        ) : (
          <>
            <button type="button" onClick={handleSave} disabled={!isValidForm}>
              Save
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={!isValidForm}
            >
              Save as Draft
            </button>
            <button type="submit" disabled={!isValidForm}>
              Submit
            </button>
          </>
        )}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          ></Toast>
        )}
      </div>
    </form>
     } 
    </>
  );
};

export default CreateForm;
