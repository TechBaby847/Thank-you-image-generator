import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
      <div className="home">
        {/* <img className="backgroundimage" src="https://img.freepik.com/premium-vector/thank-you-letter-text-blue-gold-isolated-blue-background_115973-1363.jpg" alt="background image" /> */}
        <h1 className="home--title">
          Welcome to <span>APPRECIATE</span>
        </h1>
        <h3 className="home--project">
          Create and Download a <span>Thank You Card</span> to show <br />
          your appreciation to your loved ones or collegues!
        </h3>
        <Link to="/Card">
          <button className="btny">click me!</button>
        </Link>
      </div>
  );
};

export default Home;
