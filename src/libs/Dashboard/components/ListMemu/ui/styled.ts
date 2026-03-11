import { ListItem, styled } from "@mui/material";

interface StyledListItemProps {
  visual: "variant1" | "variant2";
}

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (propName) => !["visual"].includes(propName as string),
})<StyledListItemProps>(({ theme, visual }) => ({
  ...(visual === "variant2" && {
    "&": {
      padding: `0 ${theme.spacing(1)}`,
    },
    '& .MuiListItemIcon-root': {
      marginLeft: `-${theme.spacing(1)}`,
    },
    "& .MuiButtonBase-root": {
      borderRadius: "5px",
      "&.Mui-selected": {
        backgroundColor: "rgba(33,150,243, 0.16)",
      },
    },
  }),

}));
