import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { MaterialSearch, MaterialSearchProps } from "./MaterialSearch";
import { NavBar } from "./NavBar";

import { getKeywordsForMaterial } from "../keywords";
import { searchMaterials } from "../search";

export interface HomeProps {}

const useStyles = makeStyles((theme) => ({}));

export const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      <MaterialSearch
        getKeywordsForMaterial={getKeywordsForMaterial}
        searchProc={searchMaterials}
      />
    </div>
  );
};
