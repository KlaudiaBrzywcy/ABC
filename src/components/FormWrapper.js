import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import "./FormWrapper.css";
import FormField from "./FormField/FormField";
import FormFieldSelect from "./FormField/FormFieldSelect";
import { FaPizzaSlice, FaBreadSlice } from "react-icons/fa";
import { CgBowl } from "react-icons/cg";

const FormWrapper = () => {
  const [stateID, setStateID] = useState(uuidv4());
  const [errSubmit, setErrSubmit] = useState("");

  const { values, handleSubmit, touched, errors, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        preparation_time: "",
        type: "",
        no_of_slices: 0,
        diameter: 0,
        spicyness_scale: 0,
        slices_of_bread: 0,
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .max(50, "Max 50 characters")
          .required("Name is required!"),

        preparation_time: Yup.string()
          .required("Preparation time is required!")
          .matches(/^\d{2}:\d{2}:\d{2}$/gm, "Set required format!"),

        type: Yup.string().required("Type is required!"),
        no_of_slices: Yup.number().when("type", {
          is: "pizza",
          then: Yup.number()
            .required("Nr of slices is required!")
            .min(1, "Min 1 slice!"),
        }),

        diameter: Yup.number().when("type", {
          is: "pizza",
          then: Yup.number()
            .min(15, "Min 15 cm!")
            .required("Nr of slices is required!"),
        }),

        spicyness_scale: Yup.number().when("type", {
          is: "soup",
          then: Yup.number()
            .min(1, "Spiciness scale 1-10!")
            .max(10, "Spiciness scale 1-10!")
            .required("Spiciness scale is required!"),
        }),

        slices_of_bread: Yup.number().when("type", {
          is: "sandwich",
          then: Yup.number()
            .min(1, "Min 1 slice!")
            .required("Nr of slices is required!"),
        }),
      }),
      onSubmit: (values, { resetForm }) => {
        let foodieID = { id: stateID };
        const foodieForm = { ...values, ...foodieID };
        const readyFoodieForm = Object.entries(foodieForm).filter(
          ([, value]) => value !== 0
        );
        fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(readyFoodieForm)),
        })
          .then(() => resetForm())
          .then(() => setStateID(uuidv4()))
          .then(() => setErrSubmit(""))
          .catch((error) => {
            setErrSubmit(error.message);
          });
      },
    });

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} id="form">
        <FormField
          label={"Name:"}
          type={"text"}
          name={"name"}
          placeholder={"dish name"}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name ? (
          <p className="err">{errors.name}</p>
        ) : null}
        <FormField
          label={"Preparation time:"}
          type={"text"}
          name={"preparation_time"}
          placeholder={"00:00:00"}
          value={values.preparation_time}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.preparation_time && errors.preparation_time ? (
          <p className="err">{errors.preparation_time}</p>
        ) : null}

        <FormFieldSelect
          label={"Type:"}
          name={"type"}
          value={values.type}
          onChange={(e) => {
            handleChange(e);
            if (e.currentTarget.value === "pizza") {
              values.slices_of_bread = 0;
              values.spicyness_scale = 0;
            } else if (e.currentTarget.value === "sandwich") {
              values.no_of_slices = 0;
              values.diameter = 0;
              values.spicyness_scale = 0;
            } else if (e.currentTarget.value === "soup") {
              values.no_of_slices = 0;
              values.diameter = 0;
              values.slices_of_bread = 0;
            }
          }}
          onBlur={handleBlur}
        />
        {touched.type && errors.type ? (
          <p className="err">{errors.type}</p>
        ) : null}

        {values.type === "pizza" && (
          <>
            <span className="icon">
              <FaPizzaSlice />
            </span>
            <FormField
              label={"Number of slices:"}
              type={"number"}
              name={"no_of_slices"}
              placeholder={"Nr of slices?"}
              value={values.no_of_slices}
              onChange={handleChange}
              min={1}
            />
            {errors.no_of_slices ? (
              <p className="err">{errors.no_of_slices}</p>
            ) : null}

            <FormField
              label={"Diameter:"}
              type={"number"}
              name={"diameter"}
              placeholder={"Diameter of your pizza in cm?"}
              value={parseFloat(values.diameter)}
              onChange={handleChange}
              step={0.1}
              min={15}
            />
            {errors.diameter ? <p className="err">{errors.diameter}</p> : null}
          </>
        )}

        {values.type === "soup" && (
          <>
            <span className="icon">
              <CgBowl />
            </span>
            <FormField
              label={"Spiciness scale:"}
              type={"number"}
              name={"spicyness_scale"}
              placeholder={"Spicyness on scale 1-10"}
              value={values.spicyness_scale}
              onChange={handleChange}
              min={0}
              max={10}
            />
            {errors.spicyness_scale ? (
              <p className="err">{errors.spicyness_scale}</p>
            ) : null}
          </>
        )}

        {values.type === "sandwich" && (
          <>
            <span className="icon">
              <FaBreadSlice />
            </span>
            <FormField
              label={"Slices of bread:"}
              type={"number"}
              name={"slices_of_bread"}
              placeholder={"How many slices?"}
              value={values.slices_of_bread}
              onChange={handleChange}
              min={0}
            />
            {errors.slices_of_bread ? (
              <p className="err">{errors.slices_of_bread}</p>
            ) : null}
          </>
        )}

        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>
      <p className="err-submit">{errSubmit}</p>
    </div>
  );
};

export default FormWrapper;
