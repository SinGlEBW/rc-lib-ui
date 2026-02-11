import { keyframes } from "@mui/material/styles";


export const getGradient = ({theme, isDeleting}) => {
  const gradientFlow = keyframes({
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
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
        background: "linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.1) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: `${gradientFlow} 1.5s linear infinite`,
        pointerEvents: "none",
      }
    : {},
  };
};
