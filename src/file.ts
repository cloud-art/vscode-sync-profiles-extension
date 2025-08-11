import { promises as fs, watch } from "fs";

export const isFileExist = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
};

export const readFile = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getFile = async (
  filePath: string,
  fileName: string
): Promise<File | null> => {
  const fileExist = await isFileExist(filePath);

  if (!fileExist) {
    console.error(`File ${filePath} does not exist.`);
    return null;
  }

  const content = await readFile(filePath);

  if (content === null) {
    console.error(`Failed to read file ${filePath}.`);
    return null;
  }

  return new File([content], fileName);
};

export const watchDirectory = (
  filePath: string,
  onChange: (event: "add" | "change", filePath: string) => void
) => {
  const watcher = watch(
    filePath,
    { recursive: true },
    (eventType, filename) => {
      if (!filename) {
        return;
      }
      if (eventType === "change") {
        onChange("change", `${filePath}/${filename}`);
      } else if (eventType === "rename") {
        onChange("add", `${filePath}/${filename}`);
      }
    }
  );

  return () => watcher.close();
};
