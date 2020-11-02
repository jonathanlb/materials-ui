import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { MaterialSearch, MaterialSearchProps } from "../MaterialSearch";

export default {
  title: "MaterialSearch",
  component: MaterialSearch,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<MaterialSearchProps> = (args) => (
  <MaterialSearch {...args} />
);
const ids = new Map<string, number>();
[
  "bluegrass",
  "blues",
  "classical",
  "country",
  "folk",
  "jazz",
  "rock",
].forEach((s: string, i: number) => ids.set(s, i));

export const Primary = Template.bind({});
Primary.args = {
  searchResults: [
    {
      id: 17,
      keywords: ["documentation", "react"],
      name: "Stuff to read...",
      url: "https://material-ui.com/components/text-fields/",
    },
    {
      id: 18,
      keywords: ["documentation", "react"],
      name: "More stuff to read...",
      url: "https://material-ui.com/components/box/",
    },
    {
      id: 97,
      keywords: ["sports"],
      name: "Straight from the Source podcast",
      url:
        "https://theathletic.com/podcast/102-straight-from-the-source-with-michael-russo/",
    },
  ],
};
