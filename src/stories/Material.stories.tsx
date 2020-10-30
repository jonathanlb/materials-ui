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

export const FilledIn = Template.bind({});
FilledIn.args = {
  edit: false,
  keywords: ['documentation', 'react'],
  name: 'Something to read',
  url: 'https://material-ui.com/components/text-fields/'
};