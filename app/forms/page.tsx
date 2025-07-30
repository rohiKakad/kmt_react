"use client";
import { useCallback, useEffect, useState } from "react";
import "./Forms.css";
import Select from "react-select";
import { postData } from "../services/postService";

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
};

const Fomrs = () => {
  const [formData, setFormdata] = useState<FormDataType>({
    title: "",
    desc: "",
    assetSpecialist: [],
    assetManager: [],
    note: "",
    isChecked: false,
  });

  const [isClient, setClient] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [loadder, setLoadder] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const assetSpecialistOptions = ["Chocolate", "Strawberry", "Vanilla"];
  const assetMangersOptions = ["Chirs", "Randy", "Varma"];

  const handelSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if(!isValidForm) return null;
    try{
        setLoadder(true);
        const res = postData(formData);
        console.log(res);
    }
    catch(e){
        console.log('failed to save', e);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormdata({
      ...formData,
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

  const handleSave = () => {
    console.log("Saved:", formData);
  };

  const handleSaveDraft = () => {
    console.log("Draft Saved:", formData);
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
  }, [validForm]);

  return (
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
            onChange={handleChange}
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
        <button type="button" onClick={handleSave} disabled={!isValidForm}>
          Save
        </button>
        <button type="button" onClick={handleSaveDraft} disabled={!isValidForm}>
          Save Draft
        </button>
        <button type="submit" disabled={!isValidForm}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Fomrs;
