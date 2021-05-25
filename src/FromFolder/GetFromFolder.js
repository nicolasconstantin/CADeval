import "./GetFromFolder.css"
import React, { useEffect, useState } from "react";

function GetFromFolder() {

    const [listOfPath, setListOfPath] = useState([]);


    useEffect(() => {
        function ReadFolder() {
            //get the list of files in the folder
        }
        ReadFolder();
    }, []);

    return (
        <ul>
            {listOfPath.map((path) =>
                <li className="ItemList">path</li>
            )}
        </ul>
    );
}

export default GetFromFolder;
