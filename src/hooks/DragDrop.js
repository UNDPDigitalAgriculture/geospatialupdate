import { useState, useContext } from "react";
import { FileUploader } from "react-drag-drop-files";
import { UploadedContext } from "../contexts/UploadedProvider";

const fileTypes = ["geojson", "json"];

function DragDrop() {
    const [file, setFile] = useState(null);
    const { uploadedGeojson, setUploadedGeojson } = useContext(UploadedContext)
    const [data, setData] = useState();
    const [errorData, setErrorData] = useState();
    const handleChange = (uploadedFile) => {

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            try {
                setData(JSON.parse(fileReader.result));
                console.log(JSON.parse(fileReader.result));
                setUploadedGeojson(JSON.parse(fileReader.result))

                setErrorData(null)
            } catch (e) {
                setErrorData("**Not valid JSON file!**");
            }
        }
        if (uploadedFile !== undefined)
            fileReader.readAsText(uploadedFile);


        // fetch(file)
        //     .then((res) => res.json())
        //     .then((d) => {
        //         console.log(JSON.stringify(d))
        //     })

        // setFile(file);
    };

    return (
        // <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        <input type="file" onChange={(e) => handleChange(e.target.files[0])} />
    );
}

export default DragDrop;