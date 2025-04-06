import * as fs from 'fs';

export class FSHandler {
  /**
   * Unlinks a file from the local file system
   * @param filePath - Path to the file
   **/
  static unlinkLocalFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error removing file ${filePath}:`, err);
    });
  }
}
