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


            /*fetch('https://cb95959001d2.ngrok.io')
                .then(response => console.log(response))
                .then(data => console.log(data.total));*/
        }
        ReadFolder();
    }, []);

    //When the user click on an image
    const setImageDisplayed = (path) => {
        //set the state and the storage(persistency)
        setImage(process.env.REACT_APP_IIP_URL + "/data/" + path + ".dzi");
        localStorage.setItem("image", process.env.REACT_APP_IIP_URL + "/data/" + path + ".dzi");
        console.log(localStorage.getItem("image"));
    }

    //Display the list of all images into an html list
    return (
        <ul className="test">
            {listOfPath.map((path) =>
                <li key={path} className="ItemList" onClick={() => setImageDisplayed(path)}>{path}</li>
            )}
        </ul>
    );
}

export default GetFromFolder;
