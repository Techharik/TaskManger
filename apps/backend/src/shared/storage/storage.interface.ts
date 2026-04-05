// shared/storage/storage.interface.ts

export interface IStorageProvider {
  upload(
    file: Buffer,
    fileName: string,
  ): Promise<{
    url: string;
    key: string;
  }>;

  delete(key: string): Promise<void>;

  getDownloadUrl(key: string): Promise<string>;
}
