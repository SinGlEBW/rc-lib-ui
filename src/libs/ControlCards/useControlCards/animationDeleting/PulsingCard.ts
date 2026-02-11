import { keyframes } from "@mui/material/styles";

export const getPulseBorder = ({ theme, isDeleting }) => {
  const pulseBorder = keyframes({
    "0%, 100%": {
      borderColor: "#ff4444",
      boxShadow: "0 0 2px rgba(255, 68, 68, 0.3)",
    },
    "50%": {
      borderColor: "#ff8888",
      boxShadow: "0 0 7px rgba(255, 68, 68, 0.7)",
    },
  });
  return {
    border: "2px solid",
    borderColor: isDeleting ? "#ff4444" : "transparent",
    transition: "border-color 0.3s ease",
    animation: isDeleting ? `${pulseBorder} 1s infinite` : "none",
  };
};
