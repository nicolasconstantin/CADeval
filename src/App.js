import './App.css';
import Header from "./Header/Header";
import OpenSeadragonViewer from "./OpenSeadragon/OpenSeadragonViewer";
import React, { useEffect, useState } from "react";

function App() {

    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState();


    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        const response = await fetch("https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json")
        let image = await response.json();
        setImages(image.groups);
    };



    const selectImage = (slide) => {
        setSelectedImage(slide.slide);
    };

  return (
    <div className="App">
      <Header/>
        {console.log(images)}
        <div
            className="App"
            style={{
                display: "flex",
                justifyContent:'space-between'
            }}
        >
            <div className="OSDViewer">
                <OpenSeadragonViewer image={selectedImage}/>
            </div>
            <div>
                <h2>Test Images</h2>
                {images.map((group, index) => {
                    return (
                        <div
                            style={{
                                display:"flex",
                                flexDirection:'column'
                            }}
                        >
                            <h3 key={index}>{group.name}</h3>
                            {group.slides.map((slide, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            return selectImage(slide);
                                        }}
                                    >
                                        {slide.name}
                                    </button>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

        </div>

    </div>
  );
}

export default App;
