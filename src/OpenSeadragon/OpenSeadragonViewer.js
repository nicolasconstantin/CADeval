import './OpenSeadragon.css';
import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState } from "react";

//The render of OpenSeadragon
function OpenSeadragonViewer(props) {

    //the setState for the image displayed by OpenSeadragon
    let image = props.sentImage;
    //The viewer for display OpenSeadragon
    const [viewer, setViewer] = useState(null);

    //open the viewer
    useEffect(() => {
        if (image && viewer) {
            viewer.open(image);
        }
    }, [image]);

    //Init OpenSeadragon
    useEffect(() => {
        InitOpenseadragon();
        return () => {
            viewer && viewer.destroy();
        };
    }, []);

    //Set the default properties for OpenSeadragon
    const InitOpenseadragon = () => {
        viewer && viewer.destroy();
        setViewer(
            OpenSeaDragon({
                id: "openSeaDragon",
                prefixUrl: "openseadragon-images/",
                animationTime: 0.5,
                blendTime: 0.1,
                constrainDuringPan: true,
                maxZoomPixelRatio: 2,
                minZoomLevel: 1,
                visibilityRatio: 1,
                zoomPerScroll: 2
            })
        );
    };

    //Display the viewer and the message if no image is selected
    return (
    <>
        <div
            id="openSeaDragon"
            style={{
                height: "600px",
                width: "800px"
            }}
        >

        </div>

        {image === null?
            <p className="selectImageErrorMessage">Please select an image to display</p>:null
        }
    </>
    );
}

export default OpenSeadragonViewer;
