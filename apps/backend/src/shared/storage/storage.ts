import fs from "fs/promises";
import path from "path";
import { IStorageProvider } from "./storage.interface";

export class localStorageProvider implements IStorageProvider {
  private uploadDir = path.join(process.cwd(), "uploads");

  async upload(file: Buffer, fileName: string) {
    const key = `${Date.now()}-${fileName}`;
    const filePath = path.join(this.uploadDir, key);

    await fs.writeFile(filePath, file);

    return {
      url: `/uploads/${key}`,
      key,
    };
  }

  async delete(key: string) {
    const filePath = path.join(this.uploadDir, key);
    await fs.unlink(filePath);
  }

  async getDownloadUrl(key: string) {
    return `/uploads/${key}`;
  }
}
