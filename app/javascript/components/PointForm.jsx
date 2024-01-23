import React, {useState} from 'react';
import '../../assets/stylesheets/MyForm.css'
import {loadJSON, saveJSON} from "~/util/loadStorage";
import MyForm from "~/components/MyForm";
function PointForm({players, closePopUp = f =>f}) {
    const [formValues, setFormValues] = useState(players.map(item=> ({ name: item.Header, point: 0, played: true, winner: false, maalseen: false})))
    const [totalPoint, setTotalPoint] = useState(0)
    let handleSubmit = (event) => {
        event.preventDefault();
        const player_points = JSON.parse(loadJSON('players_points'))
        const key = player_points ?  parseInt(Object.keys(player_points).pop()) + 1 : 0
        const new_player_points = {...player_points, [key]: [...formValues] }
        const winners = formValues.filter(obj => obj.winner === true);
        if (winners.length == 1){
            saveJSON('players_points', JSON.stringify(new_player_points))
            closePopUp(true);
        }else{
            alert('Please select one winner?')
        }
        //alert(JSON.stringify(formValues))
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.type=='checkbox' ?  !(e.target.value ==='true') : e.target.value;
        if (e.target.type=='checkbox' ){
            if (e.target.name =='winner'){
                newFormValues[i]['maalseen'] =  !(e.target.value ==='true');
            }
        }
        setFormValues(newFormValues);
        setTotalPoint(newFormValues.reduce((acc, element) => acc + (element.played && element.maalseen ?  parseInt(element.point) : 0)  ,0) )
    }


    return (
        <form onSubmit={handleSubmit}>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <div className='right-child'><b><label>{element.name} </label></b></div>
                <div className='left-child'>
                    <input className='input-txt' type="number" name="point" required value={  (element.name == 'Total') ? totalPoint : element.point }  onChange={e => handleChange(index, e)}/>
                    { (element.name != 'Total')  ? <>
                        <label for='played'> Played?</label><input type='checkbox'  name="played" checked={element.played} value={element.played}  onChange={e => handleChange(index, e)}/>
                        <label for='winner'> Winner?</label><input type='checkbox' name="winner"
                                                                   checked={element.winner} value={element.winner}
                                                                   onChange={e => handleChange(index, e)}/>
                        <label for='maalseen'> Maal Seen?</label> <input type='checkbox' name="maalseen" checked={element.maalseen} value={element.maalseen}  onChange={e => handleChange(index, e)}/>
                    </>  : '' }
                    </div>
                </div>
            ))}
            <div className="button-section">
                <button className="button submit" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default PointForm
