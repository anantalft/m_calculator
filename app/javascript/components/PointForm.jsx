import React, {useState} from 'react';
import '../../assets/stylesheets/MyForm.css'
import {loadJSON, saveJSON} from "~/util/loadStorage";
import MyForm from "~/components/MyForm";
function PointForm({players, editPoints, closePopUp = f =>f, updateCalculatedPoints=f=>f, points}) {

    // const [itemValues, setItemValues] = useState(Object.values(editPoints)[0] || [])
    // const [itemKey, setItemkey] = useState(Object.keys(editPoints)[0] || [])
    const objValues = (editPoints) => {
        return Object.values(editPoints)[0] || []
    }

    const objKey = (editPoints) => {
        return Object.keys(editPoints)[0] || []
    }
    let pointItem = (piItem) => {
         const objValue = objValues(editPoints)
        if (!objValue.length) return { name: piItem.Header, point: 0, played: true, winner: false, maalseen: false}
        const eItem = objValue.filter(item => item.name == piItem.Header)[0]
        if (!eItem) return { name: piItem.Header, point: 0, played: false, winner: false, maalseen: false}
        return { name: piItem.Header, point: parseInt(eItem.point) || 0, played: eItem.played || false, winner: eItem.winner || false, maalseen: eItem.maalseen || false}
    }
    const [formValues, setFormValues] = useState(players.filter(item => item.Header !== 'Actions').map(item=> (pointItem(item))))
    const [totalPoint, setTotalPoint] = useState(totalPointsCalculator(formValues) || 0)
    let handleSubmit = (event) => {
        event.preventDefault();
        const key = points ?  parseInt(Object.keys(points).pop()) + 1 : 0
        let new_player_points = {}
        if (objKey(editPoints) > 0 ){
             points[objKey(editPoints)] = [...formValues]
            new_player_points = points
        }else{
             new_player_points = {...points, [key]: [...formValues] }
        }

        const winners = formValues.filter(obj => obj.winner === true);
        if (winners.length == 1){
            saveJSON('players_points', JSON.stringify(new_player_points))
            updateCalculatedPoints(true);
            closePopUp(true);
        }else{
            alert('Please select one winner?')
        }
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.type=='checkbox' ?  !(e.target.value ==='true') : e.target.value;
        if (e.target.type=='checkbox' ){
            if (e.target.name =='winner'){
                newFormValues[i]['maalseen'] =  !(e.target.value ==='true');
            }
        }
        setTotalPoint(totalPointsCalculator(newFormValues) )
        setFormValues(newFormValues);
    }

    function totalPointsCalculator(formValues){
        return formValues.reduce((acc, element) => acc + (element.played && element.maalseen ?  parseInt(element.point) : 0)  ,0)
    }

    return (
        <form onSubmit={handleSubmit}>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <div className='right-child'><b><label>{element.name} </label></b></div>
                <div className='left-child'>
                    <input className='input-txt' type="number" name="point" required value={  (element.name == 'Total') ? totalPoint : element.point }  onChange={e => handleChange(index, e)}/>
                    { (element.name != 'Total')  ? <>
                        <label> Played?</label><input type='checkbox'  name="played" checked={element.played} value={element.played}  onChange={e => handleChange(index, e)}/>
                        <label> Winner?</label><input type='checkbox' name="winner"
                                                                   checked={element.winner} value={element.winner}
                                                                   onChange={e => handleChange(index, e)}/>
                        <label> Maal Seen?</label> <input type='checkbox' name="maalseen" checked={element.maalseen} value={element.maalseen}  onChange={e => handleChange(index, e)}/>
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
