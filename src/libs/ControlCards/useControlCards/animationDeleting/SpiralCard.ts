import { keyframes } from "@mui/material/styles";

export const getSpiralShrink = ({ theme, isDeleting }) => {
  const spiralShrink = keyframes({
  "0%": {
    transform: "rotate(0deg) scale(1)",
    opacity: 1,
  },
  "70%": {
    transform: "rotate(180deg) scale(0.8)",
    opacity: 0.5,
  },
  "100%": {
    transform: "rotate(360deg) scale(0)",
    opacity: 0,
  },
});

  return {
    transition: "all 0.3s ease",
    transformOrigin: "center",
    padding: "16px",
    animation: isDeleting ? `${spiralShrink} 1.5s ease-in forwards` : "none",
    opacity: isDeleting ? 0.8 : 1,
  };
};

