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
    let sourceImage = props.sourceImage;
    let error = props.error;

    return (
        <>
            {displayButton ?
                (
                    <>
                        <h3>Characteristics</h3>
                        <p className="resultP">Location on the WSI:
                            ({coordinates[0]},{coordinates[1]}-{coordinates[2]},{coordinates[3]})</p>
                        <p className="resultP">Image: {sourceImage.substring(0, sourceImage.length-4)}</p>
                    </>)
                :
                null}
            {responseReady ?
                error === null ?
                (
                    <>
                        <p className="resultP">Selected model: <span className="bold">{cnn}</span></p>
                        <p className="resultP">Selected xai: <span className="bold">{xai}</span></p>
                        <h2>Results</h2>
                        {xai === "none" ?
                            (
                                <div className="contentResult">
                                    <div className="singleResult">
                                        <p className="bold resultPOriginalZone">Original zone</p>
                                        {imagePath.map((image) =>
                                            <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${image}`} alt="original zone"/>
                                        )}
                                    </div>
                                    <div className="singleResult">
                                        <p className="bold resultP">Prediction</p>
                                        {result.map((number) =>
                                            <p className="bold resultText">{parseFloat(number).toFixed(3)}</p>
                                        )}
                                    </div>
                                </div>)
                            :
                            xai === "xai1" ?
                                (
                                    <div className="contentResult">
                                        <div className="singleResult">
                                            <p className="bold resultPOriginalZone">Original zone</p>
                                            {imagePath.map((image) =>
                                                <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${image}`} alt="original zone"/>
                                            )}
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">Grad-CAM</p>
                                            {imagePath.map((image) =>
                                                <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_${image}.png`} alt="Grad-CAM"/>
                                            )}
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">LIME</p>
                                            {imagePath.map((image) =>
                                                <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_${image}.png`} alt="LIME"/>
                                            )}
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">Prediction</p>
                                            {result.map((number) =>
                                                <p className="bold resultText">{parseFloat(number).toFixed(3)}</p>
                                            )}
                                        </div>
                                    </div>)
                                :
                                (
                                    <div className="contentResult">
                                        <div className="singleResult">
                                            <p className="bold resultPOriginalZone">Original zone</p>
                                            {imagePath.map((image) =>
                                                <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${image}`} alt="original zone"/>
                                            )}
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">RCVs</p>
                                            {imagePath.map((image) =>
                                                <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_${image}.png`} alt="RCVs"/>
                                            )}
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">Sharp-LIME</p>
                                            {imagePath.map((image) =>
                                                <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_${image}.png`} alt="Sharp-LIME"/>
                                            )}
                                        </div>
                                        <div className="singleResult">
                                            <p className="bold resultP">Prediction</p>
                                            {result.map((number) =>
                                                <p className="bold resultText">{parseFloat(number).toFixed(3)}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                    </>)
                :
                    <p className="ErrorMessage">{error}</p>
            : null}
        </>
    );
}

export default Result;
