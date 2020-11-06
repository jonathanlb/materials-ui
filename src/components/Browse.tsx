import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import { Material, MaterialProps } from "./Material";
import { NavBar } from "./NavBar";

import { getMaterial } from "../search";

const useStyles = makeStyles((theme) => ({}));

export interface BrowseProps {
  materialID: string;
}

export const Browse: React.FC<BrowseProps> = (props: BrowseProps) => {
  const { materialID } = useParams<BrowseProps>();
  const [material, setMaterial] = useState<MaterialProps>();
  if (material === undefined) {
    getMaterial(parseInt(materialID)).then(setMaterial);
  }

  return (
    <div>
      <NavBar />
      {material === undefined ? (
        <div />
      ) : (
        <Material
          edit={material.edit}
          id={material.id}
          keywords={material.keywords}
          name={material.name}
          notes={material.notes}
          url={material.url}
        />
      )}
    </div>
  );
};
