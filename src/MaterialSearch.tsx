import React, { useState } from "react";

import {
  AppBar,
  Box,
  Card,
  CardContent,
  IconButton,
  InputBase,
  Link,
  Paper,
  List,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";
import SearchIcon from "@material-ui/icons/Search";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { fade, makeStyles } from "@material-ui/core/styles";

import { Keyword } from "./Keyword";
import { MaterialProps } from "./Material";
import { getBrowseLink } from "./search";

export interface MaterialSearchProps {
  getKeywordsForMaterial?: (matID: number) => Promise<Array<string>>;
  pageNum?: number;
  searchMode?: string;
  searchProc: (query: string) => Promise<string>;
  searchQuery?: string;
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
  keywordIcon: {
    transition: theme.transitions.create("width"),
  },
  nameIcon: {
    transition: theme.transitions.create("width"),
  },
  notesIcon: {
    transition: theme.transitions.create("width"),
  },
  searchControls: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
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
  const [searchState, setSearchState] = useState<MaterialSearchProps>(props);

  function onFilterKeyUp(
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (e.key === "Enter") {
      const search = `${
        searchState.searchMode || "search"
      }/${e.currentTarget.value.trim()}`;
      searchState.searchProc(search).then(updateResults);
    }
  }

  function searchModeColor(
    buttonName: string
  ): "primary" | "secondary" | "disabled" {
    if (buttonName === searchState.searchMode) {
      return "primary";
    }
    return "disabled";
  }

  async function updateResults(results: string) {
    const searchResults = JSON.parse(results) as Array<MaterialProps>;
    if (searchState.getKeywordsForMaterial !== undefined) {
      await Promise.all(
        searchResults.map(
          (mat) =>
            searchState.getKeywordsForMaterial &&
            searchState.getKeywordsForMaterial(mat.id).then((keys) => {
              // eslint-disable-next-line no-param-reassign
              mat.keywords = keys;
            })
        )
      );
    }

    setSearchState({
      ...searchState,
      searchResults,
    });
  }

  return (
    <Card>
      <CardContent>
        <AppBar position="static">
          <Toolbar>
            <Typography component="h3">Search</Typography>
            <div className={classes.searchControls}>
              <Tooltip title="By title">
                <IconButton
                  aria-label="by-title"
                  onClick={() =>
                    setSearchState({ ...searchState, searchMode: "search" })
                  }
                >
                  <TextFieldsIcon
                    className={classes.nameIcon}
                    color={searchModeColor("search")}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="By keyword">
                <IconButton
                  aria-label="by-keyword"
                  onClick={() =>
                    setSearchState({ ...searchState, searchMode: "keyword" })
                  }
                >
                  <VpnKeyIcon
                    className={classes.keywordIcon}
                    color={searchModeColor("keyword")}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="By note content">
                <IconButton
                  aria-label="by-note"
                  onClick={() =>
                    setSearchState({ ...searchState, searchMode: "note" })
                  }
                >
                  <NotesIcon
                    className={classes.notesIcon}
                    color={searchModeColor("note")}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="query…"
                classes={{
                  root: classes.searchRoot,
                  input: classes.searchInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onKeyUp={onFilterKeyUp}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Paper>
          <List>
            {(searchState.searchResults || []).map((material) => (
              <Box key={material.id} className={classes.searchResult}>
                <Link href={getBrowseLink(material.id)}>{material.name}</Link>
                {(material.keywords || [])
                  .slice(0, MAX_KEYWORDS)
                  .map((keyword, i) => (
                    <Keyword key={i} keyword={keyword} />
                  ))}
              </Box>
            ))}
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
};
