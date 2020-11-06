import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { MaterialSearch, MaterialSearchProps } from "../components/MaterialSearch";

const searchMeta: Meta = {
  title: "MaterialSearch",
  component: MaterialSearch,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};
export default searchMeta;

const Template: Story<MaterialSearchProps> = (args) => (
  <MaterialSearch {...args} />
);

const SEARCH_RESULTS = [
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
];

async function searchStub(query: string) {
  const [mode, term] = query.split('/');
  switch (mode) {
    case "search":
      return JSON.stringify(
        SEARCH_RESULTS.filter(x => 
          x.name.includes(term))
      );
    case "keyword": 
      return JSON.stringify(
        SEARCH_RESULTS.filter(x => 
          x.keywords.filter(k => k.includes(term)).length > 0)
    );
    default: 
      return "[]";
  }
}

export const Primary = Template.bind({});
Primary.args = {
  searchMode: "search",
  searchProc: searchStub,
  searchResults: SEARCH_RESULTS,
};
