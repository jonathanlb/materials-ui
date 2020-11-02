import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { 
    Card, CardContent, Container, Divider, TextField, Typography 
} from '@material-ui/core';

import { fade, makeStyles } from '@material-ui/core/styles';
import { formatDiagnosticsWithColorAndContext } from 'typescript';

export interface NoteEntryProps {
    date: number;
    edit?: boolean;
    text: string;
}

function formatDate(epochS: number) {
    return new Date(epochS).toLocaleString();        
}

export const NoteEntry: React.FC<NoteEntryProps> = (
    props: NoteEntryProps ) => {

        function renderContent() {
            if (props.edit) {
                return(
                    <TextField 
                        label="Markdown Text" margin="normal" 
                        multiline variant="filled" fullWidth
                        value={props.text}>
                    </TextField>
                );
            } else {
                return(
                    <ReactMarkdown>
                        {props.text}
                    </ReactMarkdown>
                );
            }
        }

        return (
            <Card>
                <CardContent>
                    <Typography>
                        {formatDate(props.date)}
                    </Typography>
                    <Divider/>
                    {renderContent()}
                </CardContent>
            </Card>
        );
};