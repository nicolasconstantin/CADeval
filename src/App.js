import './App.css';
import Header from "./Header/Header";
import OpenSeadragonViewer from "./OpenSeadragon/OpenSeadragonViewer";
import React, {useState} from "react";
import ImageSelector from "./Menu/ImageSelector";
import CnnSelector from "./Menu/CnnSelector";
import XaiSelector from "./Menu/XaiSelector";
import Result from "./Result/Result";

//This display all the element into the app
function App() {

    //If the local storage is empty for the cnn, set the storage to Model1 (display the first checkbox selected)
    if (localStorage.getItem("cnn") === null) {
        localStorage.setItem("cnn", "model1");
    }

    //If the local storage is empty for the xai, set the storage to none (display the first checkbox selected)
    if (localStorage.getItem("xai") === null) {
        localStorage.setItem("xai", "none");
    }

    //the State for the image displayed by OpenSeadragon, the cnn and the xai choosen by the user
    const [image, setImage] = useState(localStorage.getItem("image"));
    const [cnn, setCnn] = useState(localStorage.getItem("cnn"));
    const [sendCnn, setSendCnn] = useState(null);
    const [xai, setXai] = useState(localStorage.getItem("xai"));
    const [sendXai, setSendXai] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [displayButton, setDisplayButton] = useState(false);
    const [alreadyClick, setAlreadyClick] = useState(false);
    const [responseReady, setResponseReady] = useState(false);
    const [imagePath, setImagePath] = useState(localStorage.getItem("imagePath"));
    const [folderPath, setFolderPath] = useState(localStorage.getItem("folderPath"));
    const [result, setResult] = useState(localStorage.getItem("result"));
    const [sourceImage, setSourceImage] = useState(localStorage.getItem("sourceImage"));
    const [error, setError] = useState(null);

    const onClickSend = async () => {
        if (!alreadyClick) {
            //set the cnn and the xai for the response
            setSendCnn(cnn);
            setSendXai(xai);

            //reset error
            setError(null);

            //send http request and catch the response

            //set the state to "in process"
            setResponseReady(false);
            setAlreadyClick(true);

            let x0 = Math.round(coordinates[0]/128);
            let y1 = Math.round(coordinates[3]/128);
            let x1 = Math.round(coordinates[2]/128);
            let y0 = Math.round(coordinates[1]/128);

            if(x1-x0>=1 && x1-x0<156 && y1-y0>1 && y1-y0<156){
                try{
                    let query = "https://1cb558bb6db2.eu.ngrok.io/" + x0 + "," + y1 + "," + x1 + "," + y0 + "/" + sourceImage + "/" + cnn + "/" + xai + "/";

                    let response = await fetch(query)

                    let jsonResponse = await response.json();

                    //set the imagePath and the result in the state and in the localStorage || RESULT OF REQUEST
                    setFolderPath(jsonResponse[0]);
                    localStorage.setItem("folderPath", jsonResponse[0]);
                    setImagePath(jsonResponse[1]);
                    localStorage.setItem("imagePath", jsonResponse[1]);
                    setResult(jsonResponse[2]);
                    localStorage.setItem("result", jsonResponse[2]);

                    //Manage an empty response
                    if(jsonResponse[1].length === 0){
                        setError("No processable images were found by the CNN model. Please, try to select another area.");
                    }

                }catch (e) {
                    setError("An error occurs during the model processing: " + e.toString());
                    console.log(e);
                }
            }else {
                setError("Your area is too small or too big (min height and width 200 pixels and max height and width 20 000 pixels).")
            }


            //set the state to "finished compute response"
            setResponseReady(true);
            setAlreadyClick(false);

        }
    };

    return (
        <div className="App">
            <Header/>
            <div className="pageContent">
                <div className="OSDViewer">
                    <OpenSeadragonViewer sentImage={image} setDisplayButton={setDisplayButton}
                                         setCoordinates={setCoordinates}/>
                </div>
                <div className="response">
                        <Result coordinates={coordinates} cnn={sendCnn} xai={sendXai} displayButton={displayButton}
                            responseReady={responseReady} imagePath={imagePath} folderPath={folderPath} result={result} sourceImage={sourceImage} error={error}/>

                    {alreadyClick?
                        <p>The computation has started, CNN model can take a moment to finish. Do not refresh the page please !</p>
                        :
                        null
                    }

                    {displayButton ?
                        <button className="buttonStart" onClick={onClickSend}>{alreadyClick? "Please wait...": "Start computation"}</button> : null}
                </div>
                <div className="MenuSelection">
                    <ImageSelector setImage={setImage} setSourceImage={setSourceImage}/>
                    <CnnSelector setCnn={setCnn} cnn={cnn}/>
                    <XaiSelector setXai={setXai} xai={xai}/>
                </div>
            </div>
        </div>

    );
}

export default App;
