import './OpenSeadragon.css';
import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState } from "react";

function OpenSeadragonViewer(props) {

    let image = props.image;
    const [viewer, setViewer] = useState(null);

    useEffect(() => {
        if (image && viewer) {
            viewer.open(image.source);
        }
    }, [image]);

    useEffect(() => {
        InitOpenseadragon();
        return () => {
            viewer && viewer.destroy();
        };
    }, []);

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

    return (
        <div
            id="openSeaDragon"
            style={{
                height: "600px",
                width: "800px"
            }}
        >
        </div>
    );
}

export default OpenSeadragonViewer;
