import './ImageSelector.css';
import React, { useState } from "react";
import ImageLogo from "../Ressources/ImageLogo.png"
import GetFromFolder from "../FromFolder/GetFromFolder";

//This function display the button and the burger to select images
function ImageSelector(props) {

    //the setState for the image displayed by OpenSeadragon
    const setImage = props.setImage;
    //The state to know if the burger is open or not
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="boxSelector" onClick={() => {setOpen(true)}}>
                <img className="selectorLogo" src={ImageLogo} alt="Logo"/>
                <p className="selectorText">Image</p>
            </div>

            <div className="selectorMenu" style={{width: open ? "18%" : "0px", visibility: open ? "visible" : "hidden"}}>
                <p className="selectorBurgerCross" onClick={() => {setOpen(false)}}>&#9932; </p>
                <p className="selectorBurgerTitle">Images</p>
                <GetFromFolder setImage={setImage}/>
            </div>

        </>
    );
}

export default ImageSelector;
