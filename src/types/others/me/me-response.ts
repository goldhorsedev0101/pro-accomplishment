export interface MeResponseT {
  message: string;
  data: Data;
  error: any;
}

export interface Data {
  id: string;
  email: string;
  role: string;
}
