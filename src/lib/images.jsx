import { createContext, useCallback, useContext, useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL;
const Ctx = createContext({ url: () => null, refresh: () => {} });
export const useImages = () => useContext(Ctx);

// public/images/manifest.json maps slot -> { file, v }. Missing file = placeholder.
export function ImagesProvider({ children }) {
  const [manifest, setManifest] = useState({});
  const refresh = useCallback(async () => {
    try {
      const r = await fetch(`${BASE}images/manifest.json`, { cache: "no-store" });
      setManifest(r.ok ? await r.json() : {});
    } catch { setManifest({}); }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  const url = (key) => { const e = manifest[key]; return e ? `${BASE}images/${e.file}?v=${e.v}` : null; };
  return <Ctx.Provider value={{ url, refresh }}>{children}</Ctx.Provider>;
}
