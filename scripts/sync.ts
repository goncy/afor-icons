import { $, Glob} from "bun";

await $`bun degit lucide-icons/lucide/icons public/icons --force`;

const icons = new Glob("public/icons/**/*.svg");

const buffer: { name: string; src: string; metadata: {tags: string[], categories: string[]} }[] = [];

for await (const file of icons.scan(".")) {
  const name = file.replace(/public[/\\]icons[/\\](.+?)\.svg$/, "$1");
  const src = `/icons/${name}.svg`;
  const metadata = await Bun.file(file.replace(".svg", ".json")).json();

  buffer.push({ src, name, metadata: {tags: metadata.tags, categories: metadata.categories}});
}

Bun.write("src/icons.json", JSON.stringify(buffer, null, 2));