import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { NavBar, NavBarProps } from '../NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<NavBarProps> = (args) => <NavBar {...args} />;

export const Standard = Template.bind({});
Standard.args = {
};
