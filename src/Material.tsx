import React, { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
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

          {(props.notes || []).map((note, i) => (
            <NoteEntry key={i} date={note.date} text={note.text} />
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};
