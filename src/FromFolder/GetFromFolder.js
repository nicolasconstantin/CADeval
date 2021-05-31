import "./GetFromFolder.css"
import React, { useEffect, useState } from "react";

//The function to read a local folder and display a list of his content
function GetFromFolder(props) {

    //the setState for the image displayed by OpenSeadragon
    const setImage = props.setImage
    //State for the list of images
    const [listOfPath, setListOfPath] = useState([]);

    //get the list of all .tif into a folder and put it into the state
    useEffect(() => {
        function ReadFolder() {
            //get the list of files in the folder
            let images = require.context('../Ressources/DataImages', false, /\.(tif)$/).keys();

            //add each name of images in the folder into the state
            images.forEach((image) => {
                setListOfPath(oldArray => [...oldArray, image.substring(2,image.length)]);
            })
        }
        ReadFolder();
    }, []);

    //When the user click on an image
    const setImageDisplayed = (path) => {
        setImage("http://localhost/iipsrv/iipsrv.fcgi?DeepZoom=/data/" + path + ".dzi")
    }

    //Display the list of all images into an html list
    return (
        <ul className="test">
            {listOfPath.map((path) =>
                <li className="ItemList" onClick={() => setImageDisplayed(path)}>{path}</li>
            )}
        </ul>
    );
}

export default GetFromFolder;
