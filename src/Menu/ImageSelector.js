import './ImageSelector.css';
import React, { useEffect, useState } from "react";
import ImageLogo from "../Ressources/ImageLogo.png"
import GetFromFolder from "../FromFolder/GetFromFolder";

function ImageSelector() {

    const [open, setOpen] = useState(false);



    return (
        <>
            <div className="boxImage" onClick={() => {setOpen(true)}}>
                <img className="imageLogo" src={ImageLogo} alt="Logo"/>
                <p className="imageText">Image</p>
            </div>

            <div className="ImageMenu">
                <p className="imageBurgerCross" onClick={() => {setOpen(false)}}>&#9932; </p>
                <p className="imageBurgerTitle">Images</p>
                <GetFromFolder/>
            </div>

        </>
    );
}

export default ImageSelector;
