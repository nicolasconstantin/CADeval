import './OpenSeadragon.css';
import OpenSeaDragon from "openseadragon";
import React, {useEffect, useState} from "react";

import * as Annotorious from '@recogito/annotorious-openseadragon';
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css';

//The render of OpenSeadragon
function OpenSeadragonViewer(props) {

    //the setState for the image displayed by OpenSeadragon, the setDisplay and the setCoordonates
    let image = props.sentImage;
    let setDisplayButton = props.setDisplayButton;
    let setCoordinates = props.setCoordinates;

    //The viewer for display OpenSeadragon
    const [viewer, setViewer] = useState(null);
    //the annotations
    const [anno, setAnno] = useState(null);
    //the configuration for the annotation plugin
    const configAnno = {allowEmpty: true, widgets: []}


    //open the viewer and manage the annotation plugin
    useEffect(() => {
        if (image && viewer) {
            viewer.open(image);
            if (anno) {
                anno.clearAnnotations();
            } else {
                const annotorious = Annotorious(viewer, configAnno);
                //call when a selection is created
                annotorious.on('createSelection', function (annotation) {
                    //clear the previous selection
                    annotorious.clearAnnotations();
                    //skip the comment part
                    annotorious.saveSelected();
                    //display the button
                    setDisplayButton(true);

                    //get the coordonates of the region selected and transform them into int
                    //in the annotation, the index 2 and 3 are the size of the box.
                    //I need coordonates of the opposite corner, so I must compute it.
                    let coordinates = annotation.target.selector.value.substring(11).split(",");
                    coordinates[0] = parseInt(coordinates[0], 10);
                    coordinates[1] = parseInt(coordinates[1], 10);
                    coordinates[2] = parseInt(coordinates[0], 10) + parseInt(coordinates[2], 10);
                    coordinates[3] = parseInt(coordinates[1], 10) + parseInt(coordinates[3], 10);
                    //Set the state with the coordinates
                    setCoordinates(coordinates);
                });
                annotorious.on('changeSelectionTarget', function (annotation) {
                    console.log(annotation);
                    let coordinates = annotation.selector.value.substring(11).split(",");
                    coordinates[0] = parseInt(coordinates[0], 10);
                    coordinates[1] = parseInt(coordinates[1], 10);
                    coordinates[2] = parseInt(coordinates[0], 10) + parseInt(coordinates[2], 10);
                    coordinates[3] = parseInt(coordinates[1], 10) + parseInt(coordinates[3], 10);
                    //Set the state with the coordinates
                    setCoordinates(coordinates);
                });
                setAnno(annotorious);
            }
        }

    }, [image, viewer]);

    //Init OpenSeadragon
    useEffect(() => {

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
            <p className="hintAnnotorious">To select an area, hold the SHIFT key while clicking and dragging the
                mouse</p>
            <div
                id="openSeaDragon"
                style={{
                    width: "100%",
                    height: "450px"
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
