import { readdir, lstat, readFile, copyFile } from "node:fs/promises";
import { resolve, relative } from "node:path";

const transferableAssets = [".module.css"];
const tsconfigFile = "tsconfig.json";
const tsconfigJson = await readFile(tsconfigFile);
const tsconfig = JSON.parse(tsconfigJson);

if (!tsconfig.compilerOptions.rootDir) {
  throw Error(`${tsconfigFile} compilerOptions.rootDir not found`);
}

if (!tsconfig.compilerOptions.outDir) {
  throw Error(`${tsconfigFile} compilerOptions.outDir not found`);
}

const rootDir = resolve(tsconfig.compilerOptions.rootDir);
const outDir = resolve(tsconfig.compilerOptions.outDir);

const transfer = async (dir) => {
  const files = await readdir(dir);

  for await (const file of files) {
    const path = resolve(dir, file);
    const fileStat = await lstat(path);

    if (fileStat.isDirectory()) {
      await transfer(path);
      continue;
    }

    if (transferableAssets.some((el) => file.endsWith(el))) {
      const relativePath = relative(rootDir, path);
      await copyFile(path, resolve(outDir, relativePath));
    }
  }
};

await transfer(rootDir);
