// Dev-only: lets you upload/replace/remove portfolio images while running `npm run dev`.
// Files are written to public/images/ on your disk, so they are committed and deployed as static assets.
// This plugin does not exist in the production build, so the live site has no upload endpoint.
import fs from "node:fs";
import path from "node:path";

const BASES = ["profile-tanu", "glow-and-grace", "colab-sphere", "student-feedback", "thinkspark", "interntrack", "parakh"];
const MAX_BYTES = 8 * 1024 * 1024;
const EXTS = ["jpg", "png", "webp"];

const validKey = (k) => BASES.some((b) => k === b || (b !== "profile-tanu" && /^[2-6]$/.test(k.slice(b.length + 1)) && k.startsWith(b + "-") && k.length === b.length + 2));

function sniff(b) {
  if (b.length > 12 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.length > 12 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (b.length > 12 && b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP") return "webp";
  return null;
}

export default function imageUploads() {
  let dir;
  const manifestPath = () => path.join(dir, "manifest.json");
  const readManifest = () => { try { return JSON.parse(fs.readFileSync(manifestPath(), "utf8")); } catch { return {}; } };
  const writeManifest = (m) => fs.writeFileSync(manifestPath(), JSON.stringify(m, null, 2));
  const removeFiles = (key) => EXTS.forEach((e) => fs.rmSync(path.join(dir, `${key}.${e}`), { force: true }));

  return {
    name: "portfolio-image-uploads",
    apply: "serve",
    configResolved(c) { dir = path.join(c.root, "public", "images"); },
    configureServer(server) {
      server.middlewares.use("/__images", (req, res) => {
        const send = (code, obj) => { res.statusCode = code; res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(obj)); };
        const origin = req.headers.origin;
        if (origin && new URL(origin).host !== req.headers.host) return send(403, { error: "Cross-origin request blocked" });
        const key = (req.url || "").slice(1).split("?")[0];
        if (!validKey(key)) return send(400, { error: "Unknown image slot" });

        if (req.method === "DELETE") {
          removeFiles(key);
          const m = readManifest(); delete m[key]; writeManifest(m);
          return send(200, { ok: true });
        }
        if (req.method !== "POST") return send(405, { error: "Method not allowed" });

        const chunks = []; let size = 0; let aborted = false;
        req.on("data", (c) => {
          size += c.length;
          if (size > MAX_BYTES && !aborted) { aborted = true; send(413, { error: "Image is larger than 8 MB" }); req.destroy(); return; }
          chunks.push(c);
        });
        req.on("end", () => {
          if (aborted) return;
          const buf = Buffer.concat(chunks);
          const ext = sniff(buf);
          if (!ext) return send(415, { error: "File is not a real JPG, PNG or WebP image" });
          fs.mkdirSync(dir, { recursive: true });
          removeFiles(key);
          fs.writeFileSync(path.join(dir, `${key}.${ext}`), buf);
          const m = readManifest(); m[key] = { file: `${key}.${ext}`, v: Date.now() }; writeManifest(m);
          send(200, { ok: true, file: `${key}.${ext}` });
        });
      });
    },
  };
}
