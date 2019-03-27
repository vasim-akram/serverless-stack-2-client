import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(fileName, file, {
    contentType: file.type
  });

  return stored.key;
}
