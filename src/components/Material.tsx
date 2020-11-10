import React, { useState } from "react";

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

import { IdPickerDialog } from "./IdPicker";
import { Keyword } from "./Keyword";
import { NotateDialog, NoteEntry, NoteEntryProps } from "./NoteEntry";

export interface MaterialProps {
  archiveNote: (text: string) => Promise<number>;
  edit?: boolean;
  getKeywords: () => Promise<Map<string, number>>;
  keyMaterial: (matId: number, keyword: string) => Promise<void>;
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
  const [pickingKeywords, setPickingKeywords] = useState(false);
  const [keywordMap, setKeywordMap] = useState(new Map<string, number>());
  const [notating, setNotating] = useState(false);
  const [notes, setNotes] = useState(props.notes || []);

  async function initAddKeyword() {
    setKeywordMap(await props.getKeywords());
    setPickingKeywords(true);
  }

  function initNotate() {
    setNotating(true);
  }

  async function finishNotate(text: string) {
    const noteId = await props.archiveNote(text);
    notes.unshift({
      date: (new Date().getTime()),
      edit: false,
      id: noteId,
      text: text
    })
    setNotes([...notes]);
    setNotating(false);
  }

  async function finishPickingKeywords(keyword: string) {
    setPickingKeywords(false);
    if (keyword !== undefined && !keywords.includes(keyword)) {
      props.keyMaterial(props.id, keyword);
      keywords.push(keyword.toString());
      setKeywords([...keywords.sort()]); // new array to trigger render
    }
  }

  function openTab() {
    if (!props.edit) {
      window.open(props.url, "_blank", "noopener");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <IdPickerDialog
        ids={keywordMap}
        open={pickingKeywords}
        titleHint="Keywords"
        cancelled={() => setPickingKeywords(false)}
        selected={finishPickingKeywords}
        />
      <NotateDialog
        cancelled={() => { setNotating(false) }}
        date={new Date().getTime()}
        edit={true}
        id={-1}
        open={notating}
        save={finishNotate}
        text={""}
        />

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
              <Button className={classes.appBarButton} onClick={initAddKeyword}>
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
              <Button className={classes.appBarButton} onClick={initNotate}>
                Notate
              </Button>
            </Toolbar>
          </AppBar>

          {notes.map((note) => (
            <NoteEntry
              edit={false}
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
