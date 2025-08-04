"use client";

import { useCallback, useEffect, useState } from "react";
import "./Create.css";
import Select from "react-select";
import { postData } from "../../services/postService";
import Toast from "../../component/Toast";
import Loader from "../../component/commonLoadder";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";
import { putService } from "@/app/services/putService";

type SelectOption = {
  value: string;
  label: string;
};
type FormDataType = {
  _id:"",
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
    _id:"",
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
  const route = useRouter();
  const [isClient, setClient] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [loadder, setLoadder] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const assetSpecialistOptions = [
    "Chrish",
    "Gayle",
    "Adam",
    "Reena",
    "Ashwini",
  ];
  const assetMangersOptions = ["Tejas", "Rohidas", "Akshay", "Sachin", "Nitin"];
  const selectedRow = useSelector(
    (state: RootState) => state.formRowData.selectedRow
  ) as FormDataType | null;
  const [selectedRowItem , setSelectedRowItem ] = useState(selectedRow);

  useEffect(() => {
    setLoadder(true);
    setClient(true);
    if (selectedRow !== null) {
      console.log("_id", selectedRow._id);
      setFormdata(selectedRow);
      setLoadder(false);
    }
  }, [selectedRow]);

  const handelSubmit = async (e: React.FormEvent, type?:string) => {
    setLoadder(true);
    e.preventDefault();
    let setStausString = 'submitted';
    switch(type){
      case 'save': setStausString = 'save';break;
      case 'save-draft' : setStausString = 'save-draft';break;
      default : break;
    }
    const updated = {
      ...formData,
      status: setStausString,
    };
    setFormdata(updated);
    if (!isValidForm) return null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = postData(updated);
      setToast({
        message: `${res?.message} as ${updated.status}`,
        type: "success",
      });
      route.push('/forms');
      setLoadder(false);
    } catch (e) {
      setToast({ message: "Failed to save form", type: "error" });
      setLoadder(true);
    }
  };

  const updateFormById = async (e:React.FormEvent, statusOfForm?:string) => {
    setLoadder(true);
    const updated = {
      ...formData,
      status: statusOfForm,
    };
    if (!isValidForm) return null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await putService(updated);
      setToast({
        message: `${res?.message} as ${updated.status}`,
        type: "success",
      });
      setLoadder(false);
      if(selectedRow){
        route.push('/forms');
      }
    } catch (e) {
      setToast({ message: "Failed to store data", type: "error" });
      setLoadder(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormdata({
      ...formData,
      status: "submitted",
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMultiSelectChange = (
    selectOption: SelectOption[],
    type: string
  ) => {
    const updatedValues = selectOption.map((option) => option.value);
    switch (type) {
      case "specialist":
        setFormdata({
          ...formData,
          assetSpecialist: selectOption.map((option) => option.value),
        });
          setSelectedRowItem({
            ...formData,
            assetSpecialist: updatedValues
          })

        break;
      case "manager":
          setFormdata({
            ...formData,
            assetManager: updatedValues,
          });
          setSelectedRowItem({
            ...formData,
            assetManager: updatedValues
          })

          break;
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
      {loadder ? (
        <Loader />
      ) : (
        <form onSubmit={(e) => handelSubmit(e, 'submitted')} className="form-container">
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
              {isClient && (
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
                  value={
                    selectedRow && Array.isArray(selectedRow.assetManager)
                      ? selectedRowItem?.assetSpecialist.map((item) => ({
                          value: item,
                          label: item,
                        }))
                      : []
                  }
                />
              )}

              <label>Asset Managers:</label>
              {isClient && (
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  options={assetMangersOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  value={
                    selectedRow && Array.isArray(selectedRow.assetManager)
                      ? selectedRowItem ?.assetManager.map((item) => ({
                          value: item,
                          label: item,
                        }))
                      : []
                  }
                  onChange={(selected) =>
                    handleMultiSelectChange(
                      selected as SelectOption[],
                      "manager"
                    )
                  }
                />
              )}
            </div>
            <div className="right-column">
              <label htmlFor="status">Status:</label>
              <input
                type="text"
                className="form-input"
                name="status"
                value={formData.status}
                disabled
              />
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

          {selectedRow == null ? (
            <div className="button-group">
              {loadder ? (
                <Loader />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={(e) => handelSubmit(e, 'save')}
                    disabled={!isValidForm}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                     onClick={(e) => handelSubmit(e, 'save-draft')}
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
          ) : (
            <div className="button-group">
              <button type="button" onClick={(e) => updateFormById(e, selectedRowItem?.status)}>Update form</button>
              <button type="button" onClick={() => route.push("/forms")}>
                Cancel
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default CreateForm;
