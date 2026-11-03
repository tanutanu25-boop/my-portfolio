import { useEffect, useState } from "react";
import { useImages } from "../lib/images";

// Shows the uploaded image for a slot, or a neutral placeholder. Never shows a fake screenshot.
export default function Picture({ slot, alt, label, eager = false }) {
  const { url } = useImages();
  const src = url(slot);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (src && !failed) {
    return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />;
  }
  return (
    <div className="ph" role="img" aria-label={`${label || alt} (image coming soon)`}>
      <span className="ph-mark" aria-hidden="true">{(label || "TT").split(/[\s&]+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2)}</span>
      <span className="ph-text">Screenshot coming soon</span>
    </div>
  );
}
