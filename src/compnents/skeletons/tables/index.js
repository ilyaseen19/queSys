import * as React from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const variants = ["h1", "h3", "body1", "caption"];

function TypographyDemo() {
  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          <Skeleton />
        </Typography>
      ))}
    </div>
  );
}

export default function SkeletonTables() {
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <TypographyDemo />
      </Grid>
    </Grid>
  );
}
