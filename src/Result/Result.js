import './Result.css';
import React from 'react';

//The header of the app with the title
function Result(props) {

    let coordinates = props.coordinates;
    let cnn = props.cnn;
    let xai = props.xai;
    let displayButton = props.displayButton;
    let responseReady = props.responseReady;
    let folderPath = props.folderPath;
    let imagePath = props.imagePath;
    let result = props.result;

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
            {responseReady ?
                (
                    <>
                        <p className="resultP">Selected model: <span className="bold">{cnn}</span></p>
                        <p className="resultP">Selected xai: <span className="bold">{xai}</span></p>
                        <h2>Results</h2>
                        {xai === "none" ?
                            <div className="singleResult">
                                <p className="bold">Original zone</p>
                                <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${imagePath}`} alt="original zone"/>
                                <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-112.png`} alt="original zone"/>
                                <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-114.png`} alt="original zone"/>
                                <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-116.png`} alt="original zone"/>
                            </div>
                            :
                            xai === "xai1" ?
                                (
                                    <div className="contentResult">
                                        <div className="singleResult">
                                            <p className="bold resultPOriginalZone">Original zone</p>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${imagePath}`} alt="original zone"/>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-112.png`} alt="original zone"/>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-114.png`} alt="original zone"/>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-116.png`} alt="original zone"/>
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">Grad-CAM</p>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_${imagePath}.png`} alt="RCVs"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_patch_800-112.png.png`} alt="RCVs"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_patch_800-114.png.png`} alt="RCVs"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_patch_800-116.png.png`} alt="RCVs"/>
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">LIME</p>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_${imagePath}.png`} alt="LIME"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_patch_800-112.png.png`} alt="LIME"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_patch_800-114.png.png`} alt="LIME"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_patch_800-116.png.png`} alt="LIME"/>
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">Prediction</p>
                                            <p className="bold resultText">{result.substring(0,5)}</p>
                                            <p className="bold resultText">0.989</p>
                                            <p className="bold resultText">0.893</p>
                                            <p className="bold resultText">0.792</p>
                                        </div>
                                    </div>)
                                :
                                (
                                    <div className="contentResult">
                                        <div className="singleResult">
                                            <p className="bold resultPOriginalZone">Original zone</p>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${imagePath}`} alt="original zone"/>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-112.png`} alt="original zone"/>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-114.png`} alt="original zone"/>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/patch_800-116.png`} alt="original zone"/>
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">RCVs</p>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_${imagePath}.png`} alt="RCVs"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_patch_800-112.png.png`} alt="RCVs"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_patch_800-114.png.png`} alt="RCVs"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_patch_800-116.png.png`} alt="RCVs"/>
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">Sharp-LIME</p>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_${imagePath}.png`} alt="LIME"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_patch_800-112.png.png`} alt="LIME"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_patch_800-114.png.png`} alt="LIME"/>
                                            <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_patch_800-116.png.png`} alt="LIME"/>
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
