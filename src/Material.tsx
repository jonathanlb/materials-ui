import React, { useState } from 'react';

import { 
    Card, CardContent, Container, Divider, TextField, Typography 
} from '@material-ui/core';

import { fade, makeStyles } from '@material-ui/core/styles';

export interface MaterialProps {
    edit: boolean;
    keywords?: Array<string>;
    name?: string;
    url?: string;
}

export const Material: React.FC<MaterialProps> = (
    props: MaterialProps ) => {
    return (
        <Container component="main" maxWidth="xs">
            <TextField id="material-name" label="Name" margin="normal" fullWidth
                InputProps={{ readOnly: !props.edit}} value={props.name}>
            </TextField>
            <TextField id="material-url" label="URL" margin="normal" fullWidth
                InputProps={{ readOnly: !props.edit}} value={props.url}>
            </TextField>
            <TextField id="material-keywords" label="Keywords" margin="normal" variant="filled" fullWidth
                InputProps={{ readOnly: !props.edit}} >
                    TODO: add boxed keywords, edit activity
            </TextField>
            <Divider/>
            <Card>
                <CardContent>
                    <Typography component="h3">
                        Notes
                    </Typography>
                    TODO: iterate over date/note-text tuples.
                </CardContent>
            </Card>
        </Container>
    );
}