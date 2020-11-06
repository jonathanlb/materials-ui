import React from "react";

import { AppBar, Link, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export interface NavBarProps {}

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    leftMargin: 10,
  },
  titleLink: {
    color: "black",
    "right-margin": 20,
  },
  titleTypography: {
    backgroundColor: "white",
  },
  toolBar: {
    margin: 10,
  },
}));

export const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className="classes.toolBar">
        <Typography className={classes.titleTypography} component="h3">
          <Link
            className={classes.titleLink}
            component="button"
            href="/"
            variant="inherit"
          >
            Materials
          </Link>
        </Typography>
        <Link
          className={classes.link}
          component="button"
          href="/about"
          variant="inherit"
        >
          About
        </Link>
        <Link
          className={classes.link}
          component="button"
          href="/login"
          variant="inherit"
        >
          Log out
        </Link>
      </Toolbar>
    </AppBar>
  );
};
