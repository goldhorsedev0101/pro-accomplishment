export type UploadResponseT = {
  error: null | string;
  message: string;
  data: Data;
};

export interface Data {
  publicUrl: string;
}
