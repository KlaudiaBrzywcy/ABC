import React, {useState} from "react";
// import {useForm} from 'react-hook-form';
import './FormWrapper.css';
import FormField from "./FormFIeld/FormField";
import FormFieldSelect from "./FormFIeld/FormFieldSelect";

const FormWrapper = () => {

    const [values, setValues] = useState({
        name: '',
        preparation_time: '00:00:00',
        type: '',
        
       
    })  
    
    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
        
    }

    // const [name, setName] = useState('');
    // const [preparation_time, setPrepTime] = useState('00:00:00');
    // const [type, setType] =values.name useState('');
    // const [no_of_slices, setSlices] = useState(0);
    // const [diameter, setDiameter] = useState(0);
    // const [spicyness_scale, setSpicyness] = useState(0);
    // const [slices_of_bread, setBreadSlices] = useState(0);

    // const handleTypeChange = (e) => {
    //   setType(e.target.value);  
    // };

    const onSubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData(form);
        // console.log(formData);
        // const foodieForm = {name, preparation_time, type};
        // console.log(foodieForm)
        const foodieForm = {...values}
        console.log(foodieForm)
        fetch('https://formsubmit.co/kbrzywcy@gmail.com', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(foodieForm)
        } ).then(()=> console.log('new form added'))
    } 

    return (
        <div className="form-wrapper">

            <form onSubmit={onSubmit} id='form'>

                <FormField label={'Name:'} type={'text'} name={'name'} placeholder={'dish name'} value={values.name} onChange={onChange}/>
                <FormField label={'Preparation time:'} type={'text'} name={'preparation_time'} value={values.preparation_time} onChange={onChange} pattern="\d\d:\d\d:\d\d" />
                <FormFieldSelect label={'Type:'} name={'type'} value={values.type} onChange={onChange}/>

                <button type="submit">Send</button>

            </form>
        </div>
    )
}

export default FormWrapper; 