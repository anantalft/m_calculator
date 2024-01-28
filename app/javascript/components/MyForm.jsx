import React, {useState} from 'react';
import '../../assets/stylesheets/MyForm.css'
function MyForm({players, closePopUp = f =>f}) {
    const [formValues, setFormValues] = useState(players.filter(item => item.Header !== 'Total' && item.Header !== 'Actions').map(item=> ({ name: item.Header})))
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { name: ""}])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        if (formValues.length > 1){
            saveJSON('players', JSON.stringify(formValues))
            closePopUp(true);
        }else{
            alert('Please add at least two player?')
        }

        // alert(JSON.stringify(formValues));
    }

    const saveJSON = (key, data) =>
        localStorage.setItem(key, JSON.stringify(data));

    return (
        <form onSubmit={handleSubmit}>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label>Name</label>
                    <input className='input-txt'  type="text" name="name" value={element.name || ""} required onChange={e => handleChange(index, e)}/>
                    {
                        players.length < 1 || element.name == '' ?
                            <button type="button" className="button remove"
                                    onClick={() => removeFormFields(index)}>Remove</button>
                            : null
                    }
                </div>
            ))}
            <div className="button-section">
                <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                <button className="button submit" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default MyForm