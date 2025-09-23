export interface GetCategoriesResponseT {
  error: null | string;
  message: string;
  data: Data[];
}

export interface Data {
  icon_url: string;
  name: string;
  id: string;
}
