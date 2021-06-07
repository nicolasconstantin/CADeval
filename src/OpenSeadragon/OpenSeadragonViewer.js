import './OpenSeadragon.css';
import OpenSeaDragon from "openseadragon";
import React, {useEffect, useState} from "react";

import * as Annotorious from '@recogito/annotorious-openseadragon';
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css';

//The render of OpenSeadragon
function OpenSeadragonViewer(props) {

    //the setState for the image displayed by OpenSeadragon
    let image = props.sentImage;
    //The viewer for display OpenSeadragon
    const [viewer, setViewer] = useState(null);
    //the annotations
    const [anno, setAnno] = useState(null);
    //the configuration for the annotation plugin
    const configAnno = {allowEmpty:true, widgets: []}

    //open the viewer
    useEffect(() => {
        if (image && viewer) {
            viewer.open(image);

            if (anno) {
                anno.clearAnnotations();
            } else {
                const annotorious = Annotorious(viewer, configAnno);

                //call when a selection is created
                annotorious.on('createSelection', async function() {
                    //clear the previous selection
                    annotorious.clearAnnotations();
                    //skip the comment part (not used for this project)
                    annotorious.saveSelected();
                });

                //trigger when an annotation is created
                annotorious.on('createAnnotation', function (annotation) {
                    //sent request to python scripts
                });
                console.log('annotorious is', annotorious);
                setAnno(annotorious);
            }
        }

    }, [image, viewer]);


    //Init OpenSeadragon
    useEffect(() => {

        //InitOpenseadragon();
        const osd = OpenSeaDragon({
            id: "openSeaDragon",
            prefixUrl: "openseadragon-images/",
            animationTime: 0.5,
            blendTime: 0.1,
            constrainDuringPan: true,
            maxZoomPixelRatio: 2,
            minZoomLevel: 1,
            visibilityRatio: 1,
            zoomPerScroll: 2,
        });

        setViewer(osd);

        return () => {
            viewer && viewer.destroy();
        };
    }, []);

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

            {image === null ?
                <p className="selectImageErrorMessage">Please select an image to display</p> : null
            }
        </>
    );
}

export default OpenSeadragonViewer;
