import './ImageSelector.css';
import React, {useState} from "react";
import CnnLogo from "../Ressources/cnn.png"

//This function display the button and the burger to select images
function CnnSelector(props) {

    //The state to know if the burger is open or not
    const [open, setOpen] = useState(false);
    //The setState for the cnn selection
    let setCnn = props.setCnn;

    return (
        <>
            <div className="boxSelector" onClick={() => {
                setOpen(true)
            }}>
                <img className="selectorLogo" src={CnnLogo} alt="Logo"/>
                <p className="selectorText">CNN</p>
            </div>

            <div className="selectorMenu" style={{width: open ? "18%" : "0px", visibility: open ? "visible" : "hidden"}}>
                <p className="selectorBurgerCross" onClick={() => {
                    setOpen(false)
                }}>&#9932; </p>
                <p className="selectorBurgerTitle">CNN</p>
                <form className="selectorForm">
                    <input className="selectorInput" type="radio" id="model1" name="model" value="1" defaultChecked={true} onClick={() => setCnn(1)}/>
                    <label htmlFor="model1">Model 1</label><br/>
                    <input className="selectorInput" type="radio" id="model2" name="model" value="2" onClick={() => setCnn(2)}/>
                    <label htmlFor="model2">Model 2</label><br/>
                    <input className="selectorInput" type="radio" id="model3" name="model" value="3" onClick={() => setCnn(3)}/>
                    <label htmlFor="model3">Model 3</label>
                </form>
            </div>

        </>
    );
}

export default CnnSelector;
