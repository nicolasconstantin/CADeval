import './Result.css';
import React, {useState, useEffect} from 'react';

//The header of the app with the title
function Result(props) {

    let coordinates = props.coordinates;
    let cnn = props.cnn;
    let xai = props.xai;
    let displayButton = props.displayButton;
    let alreadyClick = props.alreadyClick;
    let setAlreadyClick = props.setAlreadyClick;

    return (
        <>
            {displayButton ?
                (
                    <>
                        <h3>Characteristics</h3>
                        <p className="resultP">Location on the WSI:
                            ({coordinates[0]},{coordinates[1]}-{coordinates[2]},{coordinates[3]})</p>
                    </>)
                :
                null}
            {alreadyClick ?
                (
                    <>
                        <p className="resultP">Selected model: <span className="bold">{cnn}</span></p>
                        <p className="resultP">Selected xai: <span className="bold">{xai}</span></p>
                        <h2>Results</h2>
                        <p className="resultP">Prediction: <span className="bold">0.87%</span></p>
                        <p className="bold">Original zone</p>
                        <img className="originalZone" src="https://fast.hevs.ch/cadeval/1623850982.1658227/patch_800-110.png" alt="original zone"/>
                        {xai === "none" ? null
                            :
                            xai === "xai1" ?
                                (
                                    <div className="contentResult">
                                        <div className="singleResult">
                                            <p className="bold resultP">Grad-CAM</p>
                                            <img className="resultImg" src="https://fast.hevs.ch/cadeval/1623850982.1658227/GradCAM_patch_800-110.png.png" alt="RCVs"/>
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">LIME</p>
                                            <img className="resultImg" src="https://fast.hevs.ch/cadeval/1623850982.1658227/LIME_patch_800-110.png.png" alt="LIME"/>
                                        </div>
                                    </div>)
                                :
                                (
                                    <div className="contentResult">
                                        <div className="singleResult">
                                            <p className="bold resultP">RCVs</p>
                                            <img className="resultImg" src="https://fast.hevs.ch/cadeval/1623850982.1658227/GradCAM_patch_800-110.png.png" alt="RCVs"/>
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">Sharp-LIME</p>
                                            <img className="resultImg" src="https://fast.hevs.ch/cadeval/1623850982.1658227/LIME_patch_800-110.png.png" alt="LIME"/>
                                        </div>
                                    </div>
                                )}
                    </>)
                :
                null}
        </>
    );
}

export default Result;
