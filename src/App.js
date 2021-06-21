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

    const onClickSend = () => {
        if (!alreadyClick) {
            setAlreadyClick(true);
            console.log(coordinates.toString());
            setSendCnn(cnn);
            setSendXai(xai);
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
                            alreadyClick={alreadyClick} setAlreadyClick={setAlreadyClick}/>

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
