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
    if (localStorage.getItem("cnn") === "None") {
        localStorage.setItem("cnn", "Model1");
    }

    //If the local storage is empty for the xai, set the storage to none (display the first checkbox selected)
    if (localStorage.getItem("xai") === "None") {
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

    const onClickSend = async () => {
        if (!alreadyClick) {



            //set the cnn and the xai for the response
            setSendCnn(cnn);
            setSendXai(xai);

            //send http request and catch the response

            //set the state to "in process"
            setResponseReady(false);
            setAlreadyClick(true);

            let x0 = Math.round(coordinates[0]/128);
            let y1 = Math.round(coordinates[3]/128);
            let x1 = Math.round(coordinates[2]/128);
            let y0 = Math.round(coordinates[1]/128);

            //let query = "https://1cb558bb6db2.eu.ngrok.io/" + x0 + "," + y1 + "," + x1 + "," + y0 + "/" + sourceImage + "/" + cnn + "/" + xai + "/";

            //let response = await fetch(query);

            //let jsonResponse = await response.json();

            let jsonResponse = JSON.parse("[\"1623850982.1658227\",[\"patch_800-110.png\",\"patch_800-110.png\",\"patch_800-110.png\"],[\"0.95865163\", \"0.95865163\", \"0.95865163\"]]");

            //set the imagePath and the result in the state and in the localStorage || RESULT OF REQUEST
            setFolderPath(jsonResponse[0]);
            localStorage.setItem("folderPath", jsonResponse[0]);
            setImagePath(jsonResponse[1]);
            localStorage.setItem("imagePath", jsonResponse[1]);
            setResult(jsonResponse[2]);
            localStorage.setItem("result", jsonResponse[2]);

            //set the state to "finished compute response"
            setAlreadyClick(false);
            setResponseReady(true);
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
                            responseReady={responseReady} imagePath={imagePath} folderPath={folderPath} result={result} sourceImage={sourceImage}/>

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
