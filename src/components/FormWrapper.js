import React, {useState} from "react";
// import {useForm} from 'react-hook-form';
import './FormWrapper.css'

const FormWrapper = () => {

    

    const [name, setName] = useState('');
    const [preparation_time, setPrepTime] = useState('00:00:00');
    const [type, setType] = useState('');
    const [no_of_slices, setSlices] = useState(0);
    const [diameter, setDiameter] = useState(0);
    const [spicyness_scale, setSpicyness] = useState(0);
    const [slices_of_bread, setBreadSlices] = useState(0);

    const handleTypeChange = (e) => {
      setType(e.target.value);  
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log(formData);
        const foodieForm = {name, preparation_time, type};
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

                
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="dish name"
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                />
                {name === '' &&  <p className="err-msg">Field is required!</p>} 
               
               

                <label>Preparation time: </label>
                <input
                  type="text"
                  name="preparation_time"
                  required
                  placeholder="00:00:00"
                  pattern="\d\d:\d\d:\d\d"  
                  value={preparation_time} 
                  onChange={(e)=>setPrepTime(e.target.value)}
                />
                {/* <p className="err-msg">Field is required!</p> */}
                
                <label>Pick type of dish</label>
                <select name="type" value={type} onChange={handleTypeChange} 
                >
                    <option value="">--dishes--</option>
                    <option value="pizza">Pizza</option>
                    <option value="soup">Soup</option>
                    <option value="sandwich">Sandwich</option>    
                </select> 
               
                {type === 'pizza' &&
                    <React.Fragment>
                        <label>Number of slices: </label>
                        <input 
                            type="number"
                            name="no_of_slices"
                            required
                            placeholder="Nr of slices?" 
                            value={no_of_slices} 
                            onChange={(e)=>setSlices(e.target.value)}
                        />
                        {/* <p className="err-msg">Field is required!</p> */}
                        
                        <label>Diameter: </label>
                        <input 
                            type=" number" 
                            name="diameter"
                            required
                            placeholder="Diameter of your pizza in cm?" 
                            value={diameter}
                            onChange={(e)=> setDiameter(e.target.value)}
                        />
                        {/* <p className="err-msg">Field is required!</p> */}
                    </React.Fragment>
                }

                {type === 'soup' && 
                    <React.Fragment>
                        <label>Spiciness scale: </label>
                        <input
                        type="number"
                        name="spicyness_scale"
                        required
                        min={1} 
                        max={10} 
                        placeholder= 'Spicyness on scale 1-10' 
                        value={spicyness_scale} 
                        onChange={(e)=> setSpicyness(e.target.value)}
                        />
                        {/* <p className="err-msg">Field is required!</p> */}
                    </React.Fragment>
                }

                {type === 'sandwich' && 
                    <React.Fragment>
                        <label>Slices of bread: </label>
                        <input 
                            type="number"
                            name="slices_of_bread" 
                            required
                            value={slices_of_bread} 
                            onChange={(e)=> setBreadSlices(e.target.value)}
                        />
                        {/* <p className="err-msg">Field is required!</p> */}
                    </React.Fragment>
                } 

                <button type="submit">Send</button>

            </form>
        </div>
    )
}

export default FormWrapper; 