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
                        <p className="resultCharacteristics">Location on the WSI:
                            ({coordinates[0]},{coordinates[1]}-{coordinates[2]},{coordinates[3]})</p>
                        <p className="resultCharacteristics">Width : {coordinates[2]-coordinates[0]} pixels - Height : {coordinates[3]-coordinates[1]} pixels</p>
                        <p className="resultCharacteristics">Image: {sourceImage.substring(0, sourceImage.length-4)}</p>
                    </>)
                :
                null}
            {responseReady ?
                error === null ?
                (
                    <>
                        <p className="resultCharacteristics">Selected model: <span className="bold">{cnn}</span></p>
                        <p className="resultCharacteristics">Selected xai: <span className="bold">{xai}</span></p>
                        <h2>Results</h2>
                        {xai === "none" ?
                            (
                                <>
                                    <div className="resultDiv">
                                        <p className="bold resultP">Original zone</p>
                                        <p className="bold resultP">Prediction</p>
                                    </div>
                                    {imagePath.map((image, index) =>
                                        (
                                            <div className="resultDiv" key={index}>
                                                <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${image}`} alt="original zone"/>
                                                <p className="bold resultText">{parseFloat(result[index]).toFixed(3)}</p>
                                            </div>
                                        )
                                    )}
                                </>
                            )
                            :
                            xai === "xai1" ?
                                (
                                    <>
                                        <div className="resultDiv">
                                            <p className="bold resultP">Original zone</p>
                                            <p className="bold resultP">Grad-CAM</p>
                                            <p className="bold resultP">LIME</p>
                                            <p className="bold resultP">Prediction</p>
                                        </div>
                                        {imagePath.map((image, index) =>
                                            (
                                                <div className="resultDiv" key={index}>
                                                    <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${image}`} alt="original zone"/>
                                                    <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/GradCAM_${image}.png`} alt="Grad-CAM"/>
                                                    <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/LIME_${image}.png`} alt="LIME"/>
                                                    <p className="bold resultText">{parseFloat(result[index]).toFixed(3)}</p>
                                                </div>
                                            )
                                        )}
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="resultDiv">
                                            <p className="bold resultP">Original zone</p>
                                            <p className="bold resultP">RCVs</p>
                                            <p className="bold resultP">Sharp-LIME</p>
                                            <p className="bold resultP">Prediction</p>
                                        </div>
                                        {imagePath.map((image, index) =>
                                            (
                                                <div className="resultDiv" key={index}>
                                                    <img className="originalZone" src={`https://fast.hevs.ch/cadeval/${folderPath}/${image}`} alt="original zone"/>
                                                    <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/RCV_${image}.png`} alt="RCVs"/>
                                                    <img className="resultImg" src={`https://fast.hevs.ch/cadeval/${folderPath}/Sharp-LIME_${image}.png`} alt="Sharp-LIME"/>
                                                    <p className="bold resultText">{parseFloat(result[index]).toFixed(3)}</p>
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                    </>)
                :
                    <p className="ErrorMessage">{error}</p>
            : null}
        </>
    );
}

export default Result;
