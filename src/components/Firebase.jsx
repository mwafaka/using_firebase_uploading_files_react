import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Cloudinary } from '@cloudinary/url-gen';

const firebaseConfig = {
// Adde you config here!
};

initializeApp(firebaseConfig);

const Firebase = () => {
  const [files, setFiles] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray);
  };

  const uploadFiles = async () => {
    const storage = getStorage();

    for (const file of files) {
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      console.log(`${file.name} uploaded successfully.`);
      const downloadURL = await getDownloadURL(storageRef);
      setUploadedUrls((prevUrls) => [...prevUrls, downloadURL]);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileSelect} />
      <button onClick={uploadFiles}>Upload</button>
      <container style={{display:'flex'}}>

      {uploadedUrls.map((url, index) => (
        <div key={index} >
          <img style={{margin:'20px', width: "150px", height: "150px" }} src={url} />
          <p>
            <a href={url}>Click to visit</a>
          </p>
        </div>
      ))}
      </container>
     
    </div>
  );
};

export default Firebase;
