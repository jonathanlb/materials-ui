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

let noteIdCounter = 1;
function archiveNote(text: string): Promise<number> {
  return Promise.resolve(++noteIdCounter);
}

function getKeywords(): Promise<Map<string, number>> {
  const keywords = new Map<string, number>();
  ["documentation", "javascript", "react", "rust"].forEach((s: string, i: number) => keywords.set(s, i));
  return Promise.resolve(keywords);
}

function keyMaterial(): Promise<void> {
  return Promise.resolve();
}

export const Editable = Template.bind({});
Editable.args = {
  archiveNote,
  edit: true,
  getKeywords,
  keyMaterial,
  id: 98,
};

export const FilledIn = Template.bind({});
FilledIn.args = {
  archiveNote,
  edit: false,
  id: 97,
  keywords: ["documentation", "react"],
  getKeywords,
  keyMaterial,
  name: "Something to read",
  notes: [
    {
      date: new Date().getTime(),
      edit: false,
      id: 9,
      text: "blah, *blah*, **blah**",
    },
    {
      date: new Date().getTime() - 60 * 60 * 24 * 1000,
      edit: false,
      id: 11,
      text: "Yesterday I read something....\n\nand today I forgot.",
    },
  ],
  url: "https://material-ui.com/components/text-fields/",
};
