import "./GetImages.css";
import React from "react";

//The function to display the patients of one folder
function ImageToDisplay(props) {
  //the setState for the folder selected, the image displayed by OpenSeadragon and the list of path
  const folder = props.folder;
  const setImage = props.setImage;
  const listOfPath = props.listOfPath;
  const setSourceImage = props.setSourceImage;

  //When the user click on an image
  const setImageDisplayed = (path) => {
    //set the state and the storage(persistency)
    setImage(process.env.REACT_APP_IIP_URL + path + ".dzi");
    localStorage.setItem(
      "image",
      process.env.REACT_APP_IIP_URL + path + ".dzi"
    );

    setSourceImage(path);
    localStorage.setItem("sourceImage", path);
  };

  //Display the list of all images into an html list
  return (
    <ul>
      {listOfPath.map((path) =>
        path.substring(0, path.indexOf("/")) === folder ? (
          <li
            key={path}
            className="ItemList"
            onClick={() => setImageDisplayed(path)}
          >
            {path.substr(path.indexOf("/") + 1)}
          </li>
        ) : null
      )}
    </ul>
  );
}

export default ImageToDisplay;
