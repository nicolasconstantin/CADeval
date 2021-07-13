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

    const onClickSend = async () => {
        if (!alreadyClick) {



            //set the cnn and the xai for the response
            setSendCnn(cnn);
            setSendXai(xai);

            //send http request and catch the response

            //set the state to "in process"
            setResponseReady(false);
            setAlreadyClick(true);

            let response = await fetch('http//127.0.0.1:5008/170,825,200,800/patient_012_node_0.tif/model1/xai1/');

            let test = await response.json();


            //set the imagePath and the result in the state and in the localStorage || RESULT OF REQUEST
            setImagePath("patch_800-110.png");
            localStorage.setItem("imagePath", "patch_800-110.png");
            setFolderPath("1623850982.1658227");
            localStorage.setItem("folderPath", "1623850982.1658227");
            setResult("0.9262903342927582");
            localStorage.setItem("result", "0.9894134307832658");

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
                            responseReady={responseReady} imagePath={imagePath} folderPath={folderPath} result={result}/>

                    {displayButton ?
                        <button className="buttonStart" onClick={onClickSend}>{alreadyClick? "Please wait...": "Start computation"}</button> : null}
                </div>
                <div className="MenuSelection">
                    <ImageSelector setImage={setImage}/>
                    <CnnSelector setCnn={setCnn} cnn={cnn}/>
                    <XaiSelector setXai={setXai} xai={xai}/>
                </div>
            </div>
        </div>

    );
}

export default App;
