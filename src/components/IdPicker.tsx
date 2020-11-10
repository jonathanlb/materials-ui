// styled from https://material-ui.com/components/app-bar/
import React, { useState } from "react";

import {
  AppBar, Button, Container, Dialog, InputBase, List,
  ListItem, Paper, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import { fade, makeStyles } from "@material-ui/core/styles";

export interface IdPickerProps {
  cancelled: () => void;
  ids: Map<string, number>;
  selected: (item: string) => void;
  titleHint: string;
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
  const [filterStr, setFilterStr] = useState<string>("");

  function onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterStr(e.target.value.trim());
  }

  function selectItem(e: React.MouseEvent<any>) {
    props.selected(e.currentTarget.innerText);
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
                onClick={selectItem}
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
        onClick={props.cancelled}
      >
        Cancel
      </Button>
    </Container>
  );
};

export interface IdPickerDialogProps extends IdPickerProps {
  open: boolean;
}

export const IdPickerDialog: React.FC<IdPickerDialogProps> = (props: IdPickerDialogProps)  => {
  const { cancelled, ids, open, selected, titleHint} = props;

  return (
    <Dialog open={open}>
      <IdPicker 
        cancelled={cancelled} 
        ids={ids} 
        selected={selected} 
        titleHint={titleHint}
      />
    </Dialog>
  );
}
