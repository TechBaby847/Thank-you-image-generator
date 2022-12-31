import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

// Function to randomly generate four images for user to pick from
const CrdImg = () => {
  const [cardImage, setCardImage] = React.useState({
    topText: "Thank you",
    bottomText: "",
    randomImage: "",
  });
  const [allImages, setAllImages] = React.useState([]);
  let [ranGen, setRanGen] = React.useState(0);

  //Getting images through the api
  React.useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=50")
      .then((res) => res.json())
      .then((data) => setAllImages(data))
      .then(setRanGen(Math.floor(Math.random() * 40)));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardImage((prevImage) => ({
      ...prevImage,
      [name]: value,
    }));
  };

  const handleCaptureClick = async () => {
    const imageCardDownload = document.getElementById("meme");
    if (!imageCardDownload) return;

    const canvas = await html2canvas(imageCardDownload);
    const dataURL = canvas.toDataURL(
      "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
    );
    downloadjs(
      dataURL,
      "download.png",
      "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
    );
  };

  return (
    <main>
      <Header />
      <div className="form">
        <select
          className="selectimage"
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
      <div className="meme" id="meme">
        {cardImage.randomImage !== "" && (
          <img
            src={allImages[cardImage.randomImage].download_url}
            alt=""
            className="meme--image"
          />
        )}
        {cardImage.randomImage !== "" && (
          <>
            <h2 className="meme--text top">{cardImage.topText}</h2>
            <h2 className="meme--text bottom">{cardImage.bottomText}</h2>
          </>
        )}

        <button id="fileDownload" onClick={handleCaptureClick}>Download</button>

        <Link to="/">
          <button className="btny">Return to home page</button>
        </Link>
      </div>
    </main>
  );
};

export default CrdImg;

// {/* <button className="form--button" onClick={getCardImage}>
//           Get a new card image <i className="fa-solid fa-images"></i>
// </button> */}

// function getCardImage() {
//   const randomNumber = Math.floor(Math.random() * allImages.length);
//   const url = allImages[randomNumber].url;
//   setCardImage(prevImage => ({
//     ...prevImage,
//     randomImage: url
//   }));
// }
