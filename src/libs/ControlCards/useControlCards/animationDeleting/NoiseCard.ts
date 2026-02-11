import { keyframes } from "@mui/material/styles";

export const getNoise = ({ theme, isDeleting }) => {
  const waveDistortion = keyframes({
    "0%": { transform: "translateY(0)" },
    "100%": { transform: "translateY(4px)" },
  });
  return {
    "&::before": isDeleting
      ? {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 0, 0, 0.1) 2px,
        rgba(255, 0, 0, 0.1) 4px
      )
    `,
          animation: `${waveDistortion} 0.5s infinite linear`,
          opacity: 0.7,
          borderRadius: "inherit",
          pointerEvents: "none",
        }
      : {},
  };
};
