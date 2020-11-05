import React, { useState } from "react";
import { CustomDialog } from "react-st-modal";

import {
  AppBar,
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

import { IdPicker } from "./IdPicker";
import { Keyword } from "./Keyword";
import { NoteEntry, NoteEntryProps } from "./NoteEntry";
import { getKeywords, keyMaterial } from "./keywords";

export interface MaterialProps {
  edit?: boolean;
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
}));

export const Material: React.FC<MaterialProps> = (props: MaterialProps) => {
  const classes = useStyles();
  const [keywords, setKeywords] = useState(props.keywords || []);

  async function addKeyword() {
    const keywordMap = await getKeywords();
    const keyword = (await CustomDialog(
      <IdPicker ids={keywordMap} titleHint="Keywords" />
    )) as string;
    console.log("keyword", keyword);
    if (keyword !== undefined && !keywords.includes(keyword)) {
      keyMaterial(props.id, keyword);
      keywords.push(keyword as string);
      console.log("keywords", keywords);
      setKeywords([...keywords.sort()]); // new array to trigger render
    }
  }

  function openTab() {
    if (!props.edit) {
      window.open(props.url, "_blank", "noopener");
    }
  }

  function notate() {}

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
              <Button className={classes.appBarButton} onClick={addKeyword}>
                Add
              </Button>
            </Toolbar>
          </AppBar>
          <Card>
            <CardContent>
              {(keywords || []).map((keyword, i) => (
                <Keyword keyword={keyword} key={i} />
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
              <Button className={classes.appBarButton} onClick={notate}>
                Notate
              </Button>
            </Toolbar>
          </AppBar>

          {(props.notes || []).map((note) => (
            <NoteEntry
              id={note.id}
              key={note.id}
              date={note.date}
              text={note.text}
            />
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};
