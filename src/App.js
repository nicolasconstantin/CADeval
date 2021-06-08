import './App.css';
import Header from "./Header/Header";
import OpenSeadragonViewer from "./OpenSeadragon/OpenSeadragonViewer";
import React, { useState } from "react";
import ImageSelector from "./Menu/ImageSelector";
import CnnSelector from "./Menu/CnnSelector";
import XaiSelector from "./Menu/XaiSelector";

//This display all the element into the app
function App() {

    //the State for the image displayed by OpenSeadragon
    const [image, setImage] = useState(null);
    const [cnn, setCnn] = useState(1);
    const [xai, setXai] = useState(1);

    return (
        <div className="App">
            <Header/>
            <div className="pageContent">
                <div className="OSDViewer">
                    <OpenSeadragonViewer sentImage={image} cnn={cnn} xai={xai}/>
                </div>
                <div className="MenuSelection">
                    <ImageSelector setImage={setImage}/>
                    <CnnSelector setCnn={setCnn}/>
                    <XaiSelector setXai={setXai}/>
                </div>
            </div>
        </div>

  );
}

export default App;
