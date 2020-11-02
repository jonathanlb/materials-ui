import React, { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { fade, makeStyles } from "@material-ui/core/styles";

import { NoteEntry, NoteEntryProps } from "./NoteEntry";

export interface MaterialProps {
  edit: boolean;
  keywords?: Array<string>;
  id: number;
  name?: string;
  notes?: Array<NoteEntryProps>;
  url?: string;
}
const useStyles = makeStyles((theme) => ({
  appBarButton: {
    "background-color": "lightgrey",
    "margin-left": "auto",
    "margin-right": 0,
  },
  keyword: {
    "background-color": "lightgrey",
  },
}));

export const Material: React.FC<MaterialProps> = (props: MaterialProps) => {
  const classes = useStyles();
  function openTab() {
    if (!props.edit) {
      window.open(props.url, '_blank', 'noopener');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        id="material-name"
        label="Name"
        margin="normal"
        fullWidth
        InputProps={{ readOnly: !props.edit }}
        value={props.name}
      />
      <TextField
        id="material-url"
        label="URL"
        margin="normal"
        fullWidth
        InputProps={{ readOnly: !props.edit }}
        value={props.url}
        onClick={openTab}
      />

      <Card>
        <CardContent>
          <AppBar position="static">
            <Toolbar>
              <Typography component="h3">Keywords</Typography>
              <Button className={classes.appBarButton}>Add</Button>
            </Toolbar>
          </AppBar>
          <Card>
            <CardContent>
              {(props.keywords || []).map((keyword, i) => (
                <Box
                  key={i}
                  component="div"
                  className={classes.keyword}
                  display="inline"
                  p={0.5}
                  m={0.5}
                >
                  {keyword}
                </Box>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Divider />
      <Card>
        <CardContent>
          <AppBar position="static">
            <Toolbar>
              <Typography component="h6">Notes</Typography>
              <Button className={classes.appBarButton}>Notate</Button>
            </Toolbar>
          </AppBar>

          {(props.notes || []).map((note) => (
            <NoteEntry id={note.id} key={note.id} date={note.date} text={note.text} />
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};
