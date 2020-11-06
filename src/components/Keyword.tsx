import React from "react";

import { Box } from "@material-ui/core";

import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  keyword: {
    "background-color": "lightgrey",
  },
}));

export interface KeywordProps {
  keyword: string;
}

export const Keyword: React.FC<KeywordProps> = (props: KeywordProps) => {
  const classes = useStyles();
  return (
    <Box
      component="div"
      className={classes.keyword}
      display="inline"
      p={0.5}
      m={0.5}
    >
      {props.keyword}
    </Box>
  );
};
