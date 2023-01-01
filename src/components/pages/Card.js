import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

function toDataURL(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      context.drawImage(this, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject("Could not load image");
  });
}

// Function to randomly generate four images for user to pick from
const CrdImg = () => {
  const [cardImage, setCardImage] = React.useState({
    topText: "Thank you",
    bottomText: "",
    randomImage: "",
  });
  const [allImages, setAllImages] = React.useState("");
  let [ranGen, setRanGen] = React.useState(0);

  //Getting images through the api
  React.useEffect(() => {
    const getImageFromApi = async () => {
      fetch("https://source.unsplash.com/random/300x300").then(({ url }) => {
        toDataURL(url).then((dataUrl) => setAllImages(dataUrl));
      });
    };
    getImageFromApi();
  }, [cardImage.randomImage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardImage((prevImage) => ({
      ...prevImage,
      [name]: value,
    }));
  };

  const handleCaptureClick = async () => {
    const imageCardDownload = document.getElementById("meme--image");
    if (!imageCardDownload) return;

    const canvas = await html2canvas(imageCardDownload);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  };

  return (
    <main>
      <Header />
      <div className="form">
        <select
          className="selectimage"
          id="selectimage"
          name="randomImage"
          onChange={handleChange}
        >
          <option value="">Select Image</option>
          <option value={ranGen}>Image1</option>
          <option value={ranGen + 1}>Image2</option>
          <option value={ranGen + 2}>Image3</option>
          <option value={ranGen + 3}>Image4</option>
        </select>

        <input
          type="text"
          className="form--input"
          placeholder="Enter recipient's name"
          name="bottomText"
          value={cardImage.bottomText}
          onChange={handleChange}
        />
      </div>
      <div id="meme--image" className="meme">
        {cardImage.randomImage !== "" && (
          <img src={allImages} alt="" className="meme--image" />
        )}

        {cardImage.randomImage !== "" && (
          <>
            <h2 className="meme--text top">{cardImage.topText}</h2>
            <h2 className="meme--text bottom">{cardImage.bottomText}</h2>
          </>
        )}
      </div>

      {cardImage.randomImage !== "" && (
        <button id="fileDownload" onClick={handleCaptureClick}>
          Download
        </button>
      )}
      <Link to="/">
        <button id="btny">Return to home page</button>
      </Link>
    </main>
  );
};

export default CrdImg;

