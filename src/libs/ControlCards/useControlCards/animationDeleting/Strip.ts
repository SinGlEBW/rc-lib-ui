import { keyframes, type SxProps } from "@mui/material/styles";
interface BacgroundStripe{
  isDeleting: boolean;
  rgb?: string;
  sx?: SxProps
}
export const getBacgroundStripe = ({ isDeleting, rgb, sx }:BacgroundStripe) => {
  const rgbColor = rgb || "rgba(49, 68, 104, 0.7)";
  const stripeWidth = "50px";
  const loadingStripes = keyframes({
    "0%": { backgroundPosition: "0px" },
    "100%": { backgroundPosition: stripeWidth },
  });

  return (
    isDeleting && {
      outline: "0 !important",
      transition: "all 0.3s ease",
      animation: isDeleting ? `${loadingStripes} 2.5s linear infinite` : "none",
      backgroundImage: `linear-gradient(
      45deg, ${rgbColor} 25%, 
      transparent 25%, 
      transparent 50%, 
      ${rgbColor} 50%, 
      ${rgbColor} 75%, 
      transparent 75%, 
      transparent
    ) !important`,
      backgroundSize: `${stripeWidth} ${stripeWidth} !important`,
      ...sx,
    }
  );
};
