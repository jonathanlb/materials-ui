import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { IdPicker, IdPickerProps } from '../components/IdPicker';

const idPickerMeta: Meta = {
  title: 'IdPicker',
  component: IdPicker,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default idPickerMeta;

const Template: Story<IdPickerProps> = (args) => <IdPicker {...args} />;
const ids = new Map<string, number>();
['bluegrass', 'blues', 'classical', 'country', 'folk', 'jazz', 'rock'].forEach((s: string, i: number) => ids.set(s, i));

export const Primary = Template.bind({});
Primary.args = {
  cancelled: () => window.alert('Canceled'),
  ids: ids,
  selected: (item: string) => window.alert('Selected: ' + item),
  titleHint: 'Genres...',
};
