import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Login, LoginProps } from '../components/Login';


const loginMeta: Meta = {
  title: 'Login',
  component: Login,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default loginMeta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

