import "./GetImages.css";
import React, { useEffect, useMemo, useState } from "react";
import ImageToDisplay from "./ImageToDisplay";

//The function to read a local folder and display a list of his content
function GetImages(props) {
  //the setState for the image displayed by OpenSeadragon
  const setImage = props.setImage;
  //State for the list of images
  const [listOfPath, setListOfPath] = useState([]);
  //State for the folder selected
  const [folderSelected, setFolderSelected] = useState(null);

  const setSourceImage = props.setSourceimage;

  const listOfFolders = useMemo(() => {
    let folders = listOfPath.map((path) => path.substr(0, path.indexOf("/")));

    return Array.from(new Set(folders));
  }, [listOfPath]);

  //get the list of all .tif into a folder and put it into the state
  useEffect(() => {
    async function ReadFolder() {
      //ask response from http request (list of images on the nas)
      let response = await fetch("https://cb95959001d2.ngrok.io");

      setListOfPath(await response.json());
    }
    ReadFolder();
  }, []);

  const changeFolderSelected = (folder) => {
    if (folder === folderSelected) {
      setFolderSelected("no folder selected");
    } else {
      setFolderSelected(folder);
    }
  };

  //Display the list of all images into an html list
  return (
    <>
      {listOfFolders.map((folder) => (
        <>
          <p
            className="FolderTitle"
            onClick={() => changeFolderSelected(folder)}
          >
            {folderSelected === folder ? "▽" : "▷"} {folder}
          </p>
          {folderSelected === folder ? (
            <ImageToDisplay
              folder={folderSelected}
              setImage={setImage}
              listOfPath={listOfPath}
              setSourceImage={setSourceImage}
            />
          ) : null}
        </>
      ))}
    </>
  );
}

export default GetImages;
