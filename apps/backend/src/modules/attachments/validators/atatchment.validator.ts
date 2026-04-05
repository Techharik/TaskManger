export interface IattachmentValidator {
  validateUpload(file: Express.Multer.File): void;
}

export class attachmentValidatorImpl implements IattachmentValidator {
  validateUpload(file: Express.Multer.File) {
    if (!file) {
      throw new Error("File is required");
    }

    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Invalid file type");
    }

    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      throw new Error("File too large");
    }
  }
}
