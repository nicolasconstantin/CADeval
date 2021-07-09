import "./GetImages.css"
import React, { useEffect, useState } from "react";
import ImageToDisplay from "./ImageToDisplay";

//The function to read a local folder and display a list of his content
function GetImages(props) {

    //the setState for the image displayed by OpenSeadragon
    const setImage = props.setImage
    //State for the list of images
    const [listOfPath, setListOfPath] = useState([]);
    //const [centerSelected, setCenterSelected] = useState(localStorage.getItem("centerSelected"));
    const [centerSelected, setCenterSelected] = useState("centre_0");

    //get the list of all .tif into a folder and put it into the state
    useEffect(() => {
        async function ReadFolder() {

            //ask response from http request (list of images on the nas)
            let response = await fetch('https://cb95959001d2.ngrok.io');

            setListOfPath(await response.json());

        }
        ReadFolder();
    }, []);

    const changeCenterSelected = (center) => {
        if(center === centerSelected){
            setCenterSelected("no center selected");
        } else{
            setCenterSelected(center);
        }
    }

    //Display the list of all images into an html list
    return (
        <>

            <p className="CenterTitle" onClick={() => changeCenterSelected("centre_0")}>{centerSelected==="centre_0"? "▽" : "▷"} Center 0</p>
            {centerSelected==="centre_0"?
                    <ImageToDisplay center={centerSelected} setImage={setImage} listOfPath={listOfPath}/>
                :
                    null
            }

            <p className="CenterTitle" onClick={() => changeCenterSelected("centre_1")}>{centerSelected==="centre_1"? "▽" : "▷"} Center 1</p>
            {centerSelected==="centre_1"?
                <ImageToDisplay center={centerSelected} setImage={setImage} listOfPath={listOfPath}/>
                :
                null
            }

            <p className="CenterTitle" onClick={() => changeCenterSelected("centre_2")}>{centerSelected==="centre_2"? "▽" : "▷"} Center 2</p>
            {centerSelected==="centre_2"?
                <ImageToDisplay center={centerSelected} setImage={setImage} listOfPath={listOfPath}/>
                :
                null
            }

            <p className="CenterTitle" onClick={() => changeCenterSelected("centre_3")}>{centerSelected==="centre_3"? "▽" : "▷"} Center 3</p>
            {centerSelected==="centre_3"?
                <ImageToDisplay center={centerSelected} setImage={setImage} listOfPath={listOfPath}/>
                :
                null
            }

            <p className="CenterTitle" onClick={() => changeCenterSelected("centre_4")}>{centerSelected==="centre_4"? "▽" : "▷"} Center 4</p>
            {centerSelected==="centre_4"?
                <ImageToDisplay center={centerSelected} setImage={setImage} listOfPath={listOfPath}/>
                :
                null
            }

            {console.log(listOfPath)}

        </>
    );
}

export default GetImages;
