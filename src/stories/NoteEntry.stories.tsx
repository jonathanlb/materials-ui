import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { NoteEntry, NoteEntryProps } from '../components/NoteEntry';

const noteEntry: Meta = {
  title: 'NoteEntry',
  component: NoteEntry,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default noteEntry;

const Template: Story<NoteEntryProps> = (args) => <NoteEntry {...args} />;

export const Editable = Template.bind({});
Editable.args = {
    date: new Date().getTime(),
    edit: true,
};

export const FilledIn = Template.bind({});
FilledIn.args = {
    date: new Date().getTime(),
    edit: false,
    text: 'Something to **read**',
};
