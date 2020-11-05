const HOST_PREFIX = "http://localhost:8000";
const MAX_ENTRIES = 50;

export async function getKeyword(id: number): Promise<string> {
  return fetch(`${HOST_PREFIX}/keyword/${id}`).then((r: Response) => r.text());
}

const _keywords = new Map<string, number>();
export async function getKeywords(): Promise<Map<string, number>> {
  if (_keywords.size === 0) {
    const text = await fetch(
      `${HOST_PREFIX}/keyword/search/%/${MAX_ENTRIES}/0`
    ).then((r: Response) => r.text());
    const ids = JSON.parse(text) as Array<number>;
    await Promise.all(
      ids.map((id: number) =>
        getKeyword(id).then((keyword: string) => _keywords.set(keyword, id))
      )
    );
  }
  return _keywords;
}

const _keyIds = new Map<number, string>();
export async function getKeywordIds(): Promise<Map<number, string>> {
  if (_keyIds.size === 0) {
    const keywords = await getKeywords();
    keywords.forEach((id: number, keyword: string) => {
      _keyIds.set(id, keyword);
    });
  }
  return _keyIds;
}

export async function getKeywordsForMaterial(
  id: number
): Promise<Array<string>> {
  const keywordsI = await getKeywordIds();
  const text = await fetch(`${HOST_PREFIX}/material/keywords/${id}`).then((r) =>
    r.text()
  );
  const keyIds = JSON.parse(text) as Array<number>;
  return keyIds.map((keyId) => keywordsI.get(keyId) || "???");
}

export async function keyMaterial(
  matId: number,
  keyword: string
): Promise<void> {
  const keywords = await getKeywords();
  const keyId = keywords.get(keyword);
  if (keyId === undefined) {
    return Promise.reject("Unknown keyword");
  }

  const text = await fetch(
    `${HOST_PREFIX}/material/key/${matId}/${keyId}`
  ).then((r: Response) => r.text());
  if (text !== "Ok") {
    return Promise.reject(text);
  }
  return Promise.resolve();
}
