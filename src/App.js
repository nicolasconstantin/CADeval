import './App.css';
import Header from "./Header/Header";
import OpenSeadragonViewer from "./OpenSeadragon/OpenSeadragonViewer";
import React, { useState } from "react";
import ImageSelector from "./Menu/ImageSelector";

//This display all the element into the app
function App() {

    //the State for the image displayed by OpenSeadragon
    const [image, setImage] = useState(null);


    return (
        <div className="App">
            <Header/>
            <div className="pageContent">
                <div className="OSDViewer">
                    <OpenSeadragonViewer sentImage={image}/>
                </div>
                <div className="MenuSelection">
                    <ImageSelector setImage={setImage}/>
                </div>
            </div>
        </div>

  );
}

export default App;
