import React from "react";
import bg from "./bg.jpeg"; // import your bg image

export default function HeroSection() {
  return (
    <section
      className="hero-section container text-white d-flex flex-column justify-content-center align-items-start rounded"
      style={{
        minHeight: "500px",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "inset 0 0 80px rgba(54, 9, 74, 0.8)", // dark purple overlay glow
      }}
    >
      <div className="hero-text" style={{ maxWidth: "600px" }}>
        <div
          className="subtitle text-uppercase fw-semibold"
          style={{ color: "#b257e8", letterSpacing: "2px", marginBottom: "0.5rem" }}
        >
          Experience
        </div>
        <h1
          className="title fw-bold"
          style={{
            fontSize: "4rem",
            lineHeight: 1.1,
            background:
              "linear-gradient(90deg, #ffffff, #c38aff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 10px rgba(195, 138, 255, 0.5)",
            marginBottom: "1.5rem",
          }}
        >
          Fruity Sensation!
        </h1>
        <p className="description" style={{ color: "#ccc", maxWidth: "350px", marginBottom: "2rem", fontSize: "1.1rem" }}>
          This absolutely mouth-watering WordPress full width slider will drive up your conversion rates in no time. Get this full width slider on your own website now!
        </p>
        <button
          className="btn btn-outline-light"
          style={{
            borderColor: "#c38aff",
            color: "#c38aff",
            fontWeight: "600",
            padding: "0.7rem 2rem",
            transition: "all 0.3s ease",
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = "#c38aff";
            e.currentTarget.style.color = "#1a0a32";
            e.currentTarget.style.boxShadow = "0 0 20px #c38aff";
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#c38aff";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}

