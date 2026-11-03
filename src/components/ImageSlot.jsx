import { useEffect, useRef, useState } from "react";
import { useImages } from "../lib/images";

const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
const MAX = 8 * 1024 * 1024;

// Local-dev uploader. Writes into public/images/ via the Vite dev plugin. Not included in production.
export default function ImageSlot({ slotKey, label, compact = false }) {
  const { url, refresh } = useImages();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const input = useRef();
  const current = url(slotKey);

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const reset = () => { setFile(null); setPreview(null); if (input.current) input.current.value = ""; };
  const pick = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    if (!ACCEPT.includes(f.type)) { setMsg("Use a JPG, JPEG, PNG or WebP image."); reset(); return; }
    if (f.size > MAX) { setMsg("Image must be under 8 MB."); reset(); return; }
    setMsg(""); setFile(f); setPreview(URL.createObjectURL(f));
  };
  const call = async (method, body, headers) => {
    setBusy(true); setMsg("");
    try {
      const r = await fetch(`/__images/${slotKey}`, { method, body, headers });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Request failed");
      await refresh(); reset(); setMsg(method === "POST" ? "Saved to public/images." : "Removed.");
    } catch (err) { setMsg(err.message); } finally { setBusy(false); }
  };
  const save = () => call("POST", file, { "Content-Type": file.type });
  const remove = () => window.confirm(`Remove the image for "${label}"?`) && call("DELETE");

  const shown = preview || (!compact && current);
  return (
    <div className="slot">
      <p className="slot-label">{label}</p>
      {shown && <img className="slot-img" src={shown} alt={preview ? `Preview of ${label}` : `Current ${label}`} />}
      <input ref={input} id={`f-${slotKey}`} className="sr" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={pick} />
      <div className="slot-actions">
        {!file && <label htmlFor={`f-${slotKey}`} className="btn ghost sm">{current ? "Replace image" : "Choose image"}</label>}
        {file && <><button type="button" className="btn solid sm" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save image"}</button>
          <button type="button" className="btn ghost sm" onClick={reset} disabled={busy}>Cancel</button></>}
        {!file && current && <button type="button" className="btn ghost sm" onClick={remove} disabled={busy}>Remove</button>}
      </div>
      {msg && <p className="small muted" role="status">{msg}</p>}
    </div>
  );
}
