import { keyframes } from "@mui/material/styles";

export const getRadial = ({ theme, isDeleting }) => {
  const expandCircle = keyframes({
    "0%": {
      width: "0%",
      height: "0%",
      opacity: 1,
    },
    "100%": {
      width: "200%",
      height: "200%",
      opacity: 0.9,
    },
  });

  return {

    "&::after": isDeleting
      ? {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "0%",
          height: "0%",
          borderRadius: "50%",
          background: "radial-gradient(circle, transparent 30%, rgba(255,255,255,0.9) 70%)",
          transform: "translate(-50%, -50%)",
          animation: `${expandCircle} 1.5s ease-out forwards`,
          pointerEvents: "none",
        }
      : {},
  };
};
