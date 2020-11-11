import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  Button,
  Card,
  CardContent,
  Dialog,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";

import { fade, makeStyles } from "@material-ui/core/styles";

export interface NoteTarget {
  value: string;
}

export interface NoteEntryProps {
  date: number;
  edit: boolean;
  id: number;
  text: string;
  target?: NoteTarget;
}

function formatDate(epochS: number) {
  return new Date(epochS).toLocaleString();
}

export const NoteEntry: React.FC<NoteEntryProps> = (props: NoteEntryProps) => {
  const [content, setContent] = useState(props.text);

  function onChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const text = e.target.value;
    if (props.target) {
      props.target.value = text;
    }
    setContent(text);
  }

  function renderContent() {
    if (props.edit) {
      return (
        <TextField
          label="Markdown Text"
          margin="normal"
          multiline
          onChange={onChange}
          variant="filled"
          fullWidth
          type="text"
          value={content}
        />
      );
    }
    return <ReactMarkdown>{props.text}</ReactMarkdown>;
  }

  return (
    <Card>
      <CardContent>
        <Typography>{formatDate(props.date)}</Typography>
        <Divider />
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export interface NotateDialogProps extends NoteEntryProps {
  cancelled: () => void;
  open: boolean;
  save: (text: string) => void;
}

export const NotateDialog: React.FC<NotateDialogProps> = (
  props: NotateDialogProps
) => {
  const { cancelled, date, edit, id, open, save, text } = props;
  const textTarget = { value: "" };

  function handleSave(e: React.MouseEvent<any>) {
    save(textTarget.value);
  }

  return (
    <Dialog open={open}>
      <NoteEntry
        date={date}
        edit={edit}
        id={id}
        target={textTarget}
        text={text}
      />
      <Card>
        <CardContent>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={cancelled}>Cancel</Button>
        </CardContent>
      </Card>
    </Dialog>
  );
};
