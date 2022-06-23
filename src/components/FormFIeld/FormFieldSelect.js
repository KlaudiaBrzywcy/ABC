import React from "react";
import FormField from "./FormField";

const FormFieldSelect = ({label, name, value, onChange}) => {
    return (
        <React.Fragment>
            <div className="field">
                <label>{label}</label>
                <select name={name} value={value} onChange={onChange} required>
                    <option value="">--dishes--</option>
                    <option value="pizza">Pizza</option>
                    <option value="soup">Soup</option>
                    <option value="sandwich">Sandwich</option>    
                </select> 
                
            </div>

            {value === 'pizza'&&
                <React.Fragment> 
                    <FormField  label={'Number of slices:'} type={'number'} name={'no_of_slices'} placeholder={'Nr of slices?'}  onChange={onChange} />
                    <FormField  label={'Diameter:'} type={'number'} name={'diameter'} placeholder={"Diameter of your pizza in cm?" } onChange={onChange} /> 
                </React.Fragment>
            }

            {value === 'soup' && 
                <FormField label={'Spiciness scale:'} type={'number'} name={'spicyness_scale'} placeholder={"Spicyness on scale 1-10" } onChange={onChange} min={1} max={10} />
            }
        
            {value === 'sandwich' && 
                <FormField label={'Slices of bread:'} type={'number'} name={'slices_of_bread'} placeholder={"How many slices?" } onChange={onChange}/>
            }
        </React.Fragment>    
    )
}

export default FormFieldSelect;