import './App.css';
import Header from "./Header/Header";
import OpenSeadragonViewer from "./OpenSeadragon/OpenSeadragonViewer";
import React, { useEffect, useState } from "react";
import ImageSelector from "./Menu/ImageSelector";

function App() {

    const [image, setImage] = useState(null);


    useEffect(() => {
        setImage("http://localhost/iipsrv/iipsrv.fcgi?DeepZoom=/data/patient_011_node_4.tif.dzi");
    }, []);

  return (
    <div className="App">
      <Header/>
        <div className="pageContent">
            <div className="OSDViewer">
                <OpenSeadragonViewer sentImage={image}/>
            </div>
            <div className="MenuSelection">
                <ImageSelector/>
            </div>
        </div>
    </div>

  );
}

export default App;
