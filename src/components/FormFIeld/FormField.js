import React from "react";

const FormField = ({label,type, name,placeholder, value, onChange}) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                value={value} 
                onChange={onChange}
                required
            />
            {/* {name === '' &&  <p className="err-msg">Field is required!</p>}  */}
        </div>
    )
}

export default FormField;