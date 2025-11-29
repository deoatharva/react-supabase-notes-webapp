import React from "react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      style={{
        cursor: "pointer",
        width: "60px",
        height: "30px",
        borderRadius: "50px",
        background: darkMode ? "#222" : "#ff0000ff",
        display: "flex",
        alignItems: "center",
        justifyContent: darkMode ? "flex-start" : "flex-end",
        padding: "3px",
        transition: "all 0.3s ease",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: darkMode ? "#ff0000ff" : "#222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          transform: darkMode ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        {darkMode ? "🌙" : "☀️"}
      </div>
    </div>
  );
}
