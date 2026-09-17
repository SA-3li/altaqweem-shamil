import { mkdir, readFile, writeFile } from "node:fs/promises";

const html = await readFile("public/index.html", "utf8");

await mkdir("dist/server", { recursive: true });
await mkdir("dist/client", { recursive: true });
await writeFile("dist/client/index.html", html);

const worker = `const html = ${JSON.stringify(html)};

export default {
  async fetch() {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=3600"
      }
    });
  }
};
`;

await writeFile("dist/server/index.js", worker);
