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
  onBlur,
  pattern,
}) => (
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
      onBlur={onBlur}
      pattern={pattern}
    />
  </div>
);

export default FormField;
