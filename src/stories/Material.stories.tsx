import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Material, MaterialProps } from "../components/Material";

const materialMeta: Meta = {
  title: "Material",
  component: Material,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};
export default materialMeta;

const Template: Story<MaterialProps> = (args) => <Material {...args} />;

export const Editable = Template.bind({});
Editable.args = {
  edit: true,
  id: 98,
};

export const FilledIn = Template.bind({});
FilledIn.args = {
  edit: false,
  id: 97,
  keywords: ["documentation", "react"],
  name: "Something to read",
  notes: [
    {
      date: new Date().getTime(),
      id: 9,
      text: "blah, *blah*, **blah**",
    },
    {
      date: new Date().getTime() - 60 * 60 * 24 * 1000,
      id: 11,
      text: "Yesterday I read something....\n\nand today I forgot.",
    },
  ],
  url: "https://material-ui.com/components/text-fields/",
};
