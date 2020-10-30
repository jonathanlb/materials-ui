import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { IdPicker, IdPickerProps } from '../IdPicker';

export default {
  title: 'IdPicker',
  component: IdPicker,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IdPickerProps> = (args) => <IdPicker {...args} />;
const ids = new Map<string, number>();
['bluegrass', 'blues', 'classical', 'country', 'folk', 'jazz', 'rock'].forEach((s: string, i: number) => ids.set(s, i));

export const Primary = Template.bind({});
Primary.args = {
  ids: ids,
  titleHint: 'Genres...',
};