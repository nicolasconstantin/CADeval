import "./GetImages.css"
import React from "react";

//The function to display the patients of one center
function ImageToDisplay(props) {

    //the setState for the center selected, the image displayed by OpenSeadragon and the list of path
    const center = props.center;
    const setImage = props.setImage;
    const listOfPath = props.listOfPath;

    //When the user click on an image
    const setImageDisplayed = (path) => {
        //set the state and the storage(persistency)
        setImage(process.env.REACT_APP_IIP_URL + path + ".dzi");
        localStorage.setItem("image", process.env.REACT_APP_IIP_URL + path + ".dzi");
        console.log(process.env.REACT_APP_IIP_URL + path + ".dzi");
    }

    //Display the list of all images into an html list
    return (
            <ul>
                {listOfPath.map((path) =>
                    path.substring(0,8)===center?
                        <li key={path} className="ItemList" onClick={() => setImageDisplayed(path)}>{center==="centre_4"? path.substring(13) : path.substring(9)}</li>
                    :
                        null
                )}
            </ul>
    );
}

export default ImageToDisplay;
