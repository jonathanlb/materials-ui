import { MaterialProps } from "./Material";
import { getKeywordsLike } from "./keywords";
import { getNotesLike } from "./notes";

const HOST_PREFIX = "http://localhost:8000";
const MAX_ENTRIES = 10;

export function getBrowseLink(id: number) {
  return `browse/${id}`;
}

function getLikeTerm(term: string): string {
  const prefix = term.startsWith("^") ? "" : "%";
  const suffix = term.endsWith("$") ? "" : "%";
  return `${prefix}${term}${suffix}`;
}

export function getMaterial(id: number): Promise<MaterialProps> {
  return fetch(`${HOST_PREFIX}/material/${id}`)
    .then((r: Response) => r.text())
    .then((text: string) => JSON.parse(text));
}

async function getMaterials(ids: Array<number>): Promise<Array<string>> {
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
        ids = await searchMaterialsByKeyword(term.trim())
      break;
    case "note":
        ids = await searchMaterialsByNote(term.trim())
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

async function searchMaterialsByKeyword(term: string): Promise<Array<number>> {
    const keywords = await getKeywordsLike(getLikeTerm(term));
    const matIds = new Set<number>();
    const i = keywords.values()
    let k = i.next();
    while (!k.done) {
        const cmd = `${HOST_PREFIX}/material/keyword/${k.value}/${MAX_ENTRIES}/0`;
        const idsStr = await fetch(cmd).then((r: Response) => r.text());
        const ids: Array<number> = JSON.parse(idsStr)
        ids.forEach(i => matIds.add(i))
    }
    return Array.from(matIds)
}

async function searchMaterialsByName(term: string): Promise<Array<number>> {
  const query = getLikeTerm(term);
  const cmd = `${HOST_PREFIX}/material/search/${query}/${MAX_ENTRIES}/0`;
  const idsStr = await fetch(cmd).then((r: Response) => r.text());
  const matIds: Array<number> = JSON.parse(idsStr);
  return matIds;
}

async function searchMaterialsByNote(term: string): Promise<Array<number>> {
    const notes = await getNotesLike(getLikeTerm(term));
    const matIds = new Set<number>();
    notes.forEach(async (note: number) => {
        const cmd = `${HOST_PREFIX}/material/note/${note}/${MAX_ENTRIES}/0`;
        const idsStr = await fetch(cmd).then((r: Response) => r.text());
        const ids: Array<number> = JSON.parse(idsStr)
        ids.forEach(i => matIds.add(i))
    });
    return Array.from(matIds)
}