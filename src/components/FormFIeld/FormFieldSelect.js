import React, { useEffect } from "react";
import "../FormWrapper.css";

const FormFieldSelect = ({ label, name, value, onChange, submit }) => (
  <div className="form-field">
    <label>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      submit={submit}
    >
      <option value="">--dishes--</option>
      <option value="pizza">Pizza</option>
      <option value="soup">Soup</option>
      <option value="sandwich">Sandwich</option>
    </select>
    {value === "" && submit ? (
      <p className="err-msg">{label} is required!</p>
    ) : (
      <p></p>
    )}
  </div>
);

export default FormFieldSelect;
