import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
  minHeight: "40px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TitleWrapper = styled(Box)({
  flex: 1,
  overflow: "hidden",
  marginRight: "8px",
});

const Title = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

function CardHeader({ title, actions }) {
  return (
    <StyledHeader>
      <TitleWrapper>
        <Title variant="subtitle1">{title}</Title>
      </TitleWrapper>
      {actions && <Box sx={{ display: "flex", gap: 0.5 }}>{actions}</Box>}
    </StyledHeader>
  );
}

export default CardHeader;
