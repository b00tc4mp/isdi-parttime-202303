import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import env from "react-dotenv";
import './App.css';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';


const urlEndpoint = 'https://ik.imagekit.io/mklhds/demo-imagekit'
const publicKey = 'public_KXJOz0g5Xp6gAlhANXjoCNjKLPs=';
const authenticationEndpoint = 'http://localhost:3001/auth';


const onError = err => {
  console.log("Error", err);
};

const onSuccess = res => {
  console.log("Success", res);
};

const postId = '64986e4206370748f20901f9'
function getImage(postId, callback) {

  const xhr = new XMLHttpRequest
  xhr.onload = () => {
    const { status } = xhr

    if (status !== 200) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callback(new Error(error))

      return
    }
    const { response: json } = xhr
    const image = JSON.parse(json)

    callback(null, image)
  }
  xhr.onerror = () => {
    callback(new Error('connection error'))
  }
  xhr.open('GET', `http://localhost:3001/image/${postId}`)

  xhr.send()
}
function App() {
  const [imageRendered, setImageRendered] = useState(null)

  useEffect(() => {
    getImage(postId, (error, singleImage) => {
      if (error) {
        alert(error.message)

        return
      }
      console.log(singleImage.filePath)
      setImageRendered(singleImage.filePath)
      return singleImage.filePath
    })
  }, [])


  if (imageRendered) {
    return (
      <div className="App">
        <h1>ImageKit React quick start</h1>
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticationEndpoint={authenticationEndpoint}
        >
          <IKImage
            urlEndpoint={urlEndpoint}
            src={urlEndpoint + imageRendered}
            width="400"
          />
          <p>Upload an image</p>
          <IKUpload
            onError={onError}
            onSuccess={onSuccess}
          />
        </IKContext>
        {/* ...other SDK components added previously */}
      </div>
    )
  }




}

export default App;
