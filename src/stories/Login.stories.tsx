import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Login, LoginProps } from '../Login';


export default {
  title: 'Login',
  component: Login,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

