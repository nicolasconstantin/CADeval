import './selector.css';
import React, {useState} from "react";
import CnnLogo from "../Ressources/xai.png"

//This function display the button and the burger to select images
function XaiSelector(props) {

    //The state to know if the burger is open or not
    const [open, setOpen] = useState(false);
    //The setState for the cnn selection
    let setXai = props.setXai;
    let xai = props.xai;

    //when the user click on a radio button
    const clickForm = (solution) => {
        setXai(solution);
        localStorage.setItem("xai", solution);
    }

    return (
        <>
            <div className="boxSelector" onClick={() => {
                setOpen(true)
            }}>
                <img className="selectorLogo" src={CnnLogo} alt="Logo"/>
                <p className="selectorText">XAI</p>
            </div>

            <div className="selectorMenu" style={{width: open ? "18%" : "0px", visibility: open ? "visible" : "hidden"}}>
                <p className="selectorBurgerCross" onClick={() => {
                    setOpen(false)
                }}>&#9932; </p>
                <p className="selectorBurgerTitle">XAI</p>
                <form className="selectorForm">
                    <input className="selectorInput" type="radio" id="xai1" name="xai" value="1" defaultChecked={xai === "none"} onClick={() => clickForm("none")}/>
                    <label htmlFor="xai1">None</label><br/>
                    <input className="selectorInput" type="radio" id="xai2" name="xai" value="2" defaultChecked={xai === "xai1"} onClick={() => clickForm("xai1")}/>
                    <label htmlFor="xai2">XAI 1</label><br/>
                    <input className="selectorInput" type="radio" id="xai3" name="xai" value="3" defaultChecked={xai === "xai2"} onClick={() => clickForm("xai2")}/>
                    <label htmlFor="xai3">XAI 2</label>
                </form>
            </div>

        </>
    );
}

export default XaiSelector;
