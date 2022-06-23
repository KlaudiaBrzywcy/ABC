import React, { useState } from "react";
// import {useForm} from 'react-hook-form';
import "./FormWrapper.css";
import FormField from "./FormFIeld/FormField";
import FormFieldSelect from "./FormFIeld/FormFieldSelect";

const FormWrapper = () => {
  const [values, setValues] = useState({
    name: "",
    preparation_time: "00:00:00",
    type: "",
  });

  const [submit, setSubmit] = useState(false);
  //  const setInitialValues = () => {setValues({name: values.name})

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearState = (e) => {
    setValues((prevState) => ({
      ...prevState,
    }));
    // setValues({ ...values, [e.target.name]: "" });
    // if (e.target.name === "") {
    //   delete values.e.target.name;
    // }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const foodieForm = { ...values };
    console.log(foodieForm);
    fetch("https://formsubmit.co/kbrzywcy@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodieForm),
    }).then(() => console.log("new form added"));
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit} id="form">
        <FormField
          label={"Name:"}
          type={"text"}
          name={"name"}
          placeholder={"dish name"}
          value={values.name || ""}
          onChange={onChange}
          submit={submit}
        />
        <FormField
          label={"Preparation time:"}
          type={"text"}
          name={"preparation_time"}
          value={values.preparation_time}
          onChange={onChange}
          pattern="\d\d:\d\d:\d\d"
        />
        <FormFieldSelect
          label={"Type:"}
          name={"type"}
          value={values.type}
          onChange={onChange}
          setValues={setValues}
          values={values}
        />
        {values.type === "pizza" && (
          <>
            <FormField
              label={"Number of slices:"}
              type={"number"}
              name={"no_of_slices"}
              value={values.no_of_slices}
              placeholder={"Nr of slices?"}
              onChange={onChange}
              min={1}
            />
            <FormField
              label={"Diameter:"}
              type={"number"}
              name={"diameter"}
              value={parseFloat(values.diameter)}
              placeholder={"Diameter of your pizza in cm?"}
              onChange={onChange}
              min={15.0}
              step={0.1}
            />
          </>
        )}

        {values.type === "soup" && (
          <FormField
            label={"Spiciness scale:"}
            type={"number"}
            name={"spicyness_scale"}
            value={values.spicyness_scale}
            placeholder={"Spicyness on scale 1-10"}
            onChange={onChange}
            min={1}
            max={10}
          />
        )}

        {values.type === "sandwich" && (
          <FormField
            label={"Slices of bread:"}
            type={"number"}
            name={"slices_of_bread"}
            value={values.slices_of_bread}
            placeholder={"How many slices?"}
            onChange={onChange}
          />
        )}

        <button type="submit" onClick={() => setSubmit(true)}>
          Send
        </button>
      </form>
    </div>
  );
};

export default FormWrapper;
