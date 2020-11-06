import { MaterialProps } from "./Material";

const HOST_PREFIX = "http://localhost:8000";
const MAX_ENTRIES = 10;

export function getBrowseLink(id: number): string {
  return `browse/${id}`;
}

export async function getMaterial(id: number): Promise<MaterialProps> {
  const text = await fetch(
    `${HOST_PREFIX}/material/${id}`
  ).then((r: Response) => r.text());
  return JSON.parse(text) as MaterialProps;
}

async function getMaterials(ids: Array<number>): Promise<string[]> {
  const materialsPromise = Promise.all(
    ids.map((id) =>
      fetch(`${HOST_PREFIX}/material/${id}`).then((r: Response) => r.text())
    )
  );
  return materialsPromise;
}

export async function searchMaterials(query: string): Promise<string> {
  const [mode, term] = query.split("/");
  let ids: Array<number> = [];
  switch (mode) {
    case "keyword":
      break;
    case "note":
      break;
    case "search":
      ids = await searchMaterialsByName(term.trim());
      break;
    default:
      console.error("search mode not supported:", mode);
  }
  const materials = await getMaterials(ids);
  return `[${materials.join()}]`;
}

async function searchMaterialsByName(term: string): Promise<Array<number>> {
  const query = `${term.startsWith("^") ? "" : "%"}${term}${
    term.endsWith("$") ? "" : "%"
  }`;
  const cmd = `${HOST_PREFIX}/material/search/${query}/${MAX_ENTRIES}/0`;
  const idsStr = await fetch(cmd).then((r: Response) => r.text());
  return JSON.parse(idsStr) as Array<number>;
}
