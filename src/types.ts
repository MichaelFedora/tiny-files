export interface FileInfo {
  name: string;
  size: number;
  modified: number;
  type?: string;
}

export interface FileList {
  entries: string[];
  page?: number;
}

export interface FileListAdvance {
  entries: { [path: string]: FileInfo };
  page?: number;
}

export interface PathedFileInfo extends FileInfo {
  path: string;
}
