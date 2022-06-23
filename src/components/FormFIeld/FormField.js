import React from "react";
import "../FormWrapper.css";

const FormField = ({
  label,
  type,
  name,
  placeholder,
  value,
  min,
  max,
  step,
  onChange,
  submit,
}) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required
        submit={submit}
      />
      {value === "" && submit ? (
        <p className="err-msg">{label} is required!</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default FormField;
