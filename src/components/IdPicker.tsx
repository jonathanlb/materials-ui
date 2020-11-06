// styled from https://material-ui.com/components/app-bar/
import React, { useState } from "react";
import { useDialog } from "react-st-modal";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { fade, makeStyles } from "@material-ui/core/styles";

export interface IdPickerProps {
  cancelled?: () => void;
  ids: Map<string, number>;
  selected?: () => void;
  titleHint?: string;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  idList: {},
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  listPaper: {
    maxHeight: 200,
    overflow: "auto",
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export const IdPicker: React.FC<IdPickerProps> = ({ ...props }) => {
  const classes = useStyles();
  const dialog = useDialog();
  const [filterStr, setFilterStr] = useState<string>("");

  function onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterStr(e.target.value.trim());
  }

  function selectItem(e: React.MouseEvent<any>) {
    dialog.close(e.currentTarget.innerText);
  }

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {props.titleHint}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={onFilterChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Paper className={classes.listPaper}>
        <List className={classes.idList}>
          {Array.from(props.ids.entries())
            .filter(
              (kv: [string, number]) =>
                filterStr.length === 0 || kv[0].includes(filterStr)
            )
            .map((kv: [string, number]) => (
              <ListItem
                key={kv[1]}
                button
                onClick={props.selected || selectItem}
              >
                {kv[0]}
              </ListItem>
            ))}
        </List>
      </Paper>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={props.cancelled || (() => dialog.close())}
      >
        Cancel
      </Button>
    </Container>
  );
};
