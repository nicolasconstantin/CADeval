import './ImageSelector.css';
import React, { useEffect, useState } from "react";
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
            <div className="boxImage" onClick={() => {setOpen(true)}}>
                <img className="imageLogo" src={ImageLogo} alt="Logo"/>
                <p className="imageText">Image</p>
            </div>

            <div className="ImageMenu" style={{width: open ? "18%" : "0px", visibility: open ? "visible" : "hidden"}}>
                <p className="imageBurgerCross" onClick={() => {setOpen(false)}}>&#9932; </p>
                <p className="imageBurgerTitle">Images</p>
                <GetFromFolder setImage={setImage}/>
            </div>

        </>
    );
}

export default ImageSelector;
