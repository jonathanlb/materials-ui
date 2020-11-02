import React, { useState } from "react";

import {
  AppBar,
  Box,
  Card,
  CardContent,
  InputBase,
  Link,
  Paper,
  List,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { fade, makeStyles } from "@material-ui/core/styles";

import { MaterialProps } from "./Material";

export interface MaterialSearchProps {
  searchResults?: Array<MaterialProps>;
}

const MAX_KEYWORDS = 5;

const useStyles = makeStyles((theme) => ({
  appBarButton: {
    "background-color": "lightgrey",
    "margin-left": "auto",
    "margin-right": 0,
  },
  keyword: {
    "background-color": "lightgrey",
  },
  searchRoot: {
    color: "inherit",
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchResult: {
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
}));

export const MaterialSearch: React.FC<MaterialSearchProps> = (
  props: MaterialSearchProps
) => {
  const classes = useStyles();
  const [filterStr, setFilterStr] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<MaterialProps>>(
    props.searchResults || []
  );

  function onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const entry = e.target.value;
    if (entry.endsWith("\n") || entry.endsWith("\r")) {
      setFilterStr(e.target.value.trim());
      e.target.value = "";
    }
  }

  return (
    <Card>
      <CardContent>
        <AppBar position="static">
          <Toolbar>
            <Typography component="h3">Search</Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.searchRoot,
                  input: classes.searchInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={onFilterChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Paper>
          <List>
            {searchResults.map((material) => (
              <Box key={material.id} className={classes.searchResult}>
                <Link href={material.url} rel="noreferrer" target="_blank">
                  {material.name}
                </Link>
                {(material.keywords || [])
                  .slice(0, MAX_KEYWORDS)
                  .map((keyword, i) => (
                    <Box
                      key={i}
                      component="div"
                      className={classes.keyword}
                      display="inline"
                      p={0.1}
                      m={0.1}
                    >
                      {keyword}
                    </Box>
                  ))}
              </Box>
            ))}
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
};
