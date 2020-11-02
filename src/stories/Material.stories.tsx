import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Material, MaterialProps } from '../Material';

export default {
  title: 'Material',
  component: Material,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<MaterialProps> = (args) => <Material {...args} />;

export const Editable = Template.bind({});
Editable.args = {
  edit: true
}

export const FilledIn = Template.bind({});
FilledIn.args = {
  edit: false,
  keywords: ['documentation', 'react'],
  name: 'Something to read',
  notes: [
    {
      date: new Date().getTime(),
      text: 'blah, *blah*, **blah**'
    },
    {
      date: new Date().getTime() - 60*60*24*1000,
      text: 'Yesterday I read something....\n\nand today I forgot.'
    }
  ],
  url: 'https://material-ui.com/components/text-fields/'
};