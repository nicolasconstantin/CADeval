import './Result.css';
import React from 'react';
import image from '../Ressources/ImageLogo.png'
import image2 from '../Ressources/cnn.png'

//The header of the app with the title
function Result(props) {

    let coordinates = props.coordinates;
    let cnn = props.cnn;
    let xai = props.xai;
    let displayButton = props.displayButton;
    let alreadyClick = props.alreadyClick;

    return (
        <>
            {displayButton ?
                (
                    <>
                        <h3>Characteristics</h3>
                        <p className="resultP">Location on the WSI:
                            ({coordinates[0]},{coordinates[1]}-{coordinates[2]},{coordinates[3]})</p>
                        <p className="resultP">Selected model: <span className="bold">{cnn}</span></p>
                        <p className="resultP">Selected xai: <span className="bold">{xai}</span></p>
                    </>)
                :
                null}
            {alreadyClick ?
                (
                    <>
                        <h2>Results</h2>
                        <p className="resultP">Prediction: <span className="bold">0.87%</span></p>
                        {xai === "none" ? null
                            :
                            xai === "xai1" ?
                                (
                                    <>
                                        <p className="bold resultP">Grad-CAM</p>
                                        <img className="resultImg" src={image} alt="Grad-CAM"/>
                                        <p className="bold resultP">LIME</p>
                                        <img className="resultImg" src={image2} alt="LIME"/>
                                    </>)
                                :
                                (
                                    <>
                                        <p className="bold resultP">RCVs</p>
                                        <img className="resultImg" src={image} alt="RCVs"/>
                                        <p className="bold resultP">Sharp-LIME</p>
                                        <img className="resultImg" src={image2} alt="Sharp-LIME"/>
                                    </>
                                )}
                    </>)
                :
                null}
        </>
    );
}

export default Result;
