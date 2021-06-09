import './selector.css';
import React, {useState} from "react";
import CnnLogo from "../Ressources/cnn.png"

//This function display the button and the burger to select images
function CnnSelector(props) {

    //The state to know if the burger is open or not
    const [open, setOpen] = useState(false);
    //The state for the cnn selection
    let setCnn = props.setCnn;
    let cnn = props.cnn;

    //when the user click on a radio button
    const clickForm = (model) => {
        setCnn(model);
        localStorage.setItem("cnn", model);
    }

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
                    <input className="selectorInput" type="radio" id="model1" name="model" value="1" defaultChecked={cnn === "Model1"} onClick={() => clickForm("Model1")}/>
                    <label htmlFor="model1">Model 1</label><br/>
                    <input className="selectorInput" type="radio" id="model2" name="model" value="2" defaultChecked={cnn === "Model2"} onClick={() => clickForm("Model2")}/>
                    <label htmlFor="model2">Model 2</label><br/>
                    <input className="selectorInput" type="radio" id="model3" name="model" value="3" defaultChecked={cnn === "Model3"} onClick={() => clickForm("Model3")}/>
                    <label htmlFor="model3">Model 3</label>
                </form>
            </div>

        </>
    );
}

export default CnnSelector;
