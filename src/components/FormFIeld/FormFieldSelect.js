import React from "react";
import "../FormWrapper.css";

const FormFieldSelect = ({ label, name, value, onChange, onBlur }) => (
  <div className="form-field">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange} onBlur={onBlur}>
      <option value="">--dishes--</option>
      <option value="pizza">Pizza</option>
      <option value="soup">Soup</option>
      <option value="sandwich">Sandwich</option>
    </select>
  </div>
);

export default FormFieldSelect;
