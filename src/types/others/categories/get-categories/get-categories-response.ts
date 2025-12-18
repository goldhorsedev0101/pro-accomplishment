export interface GetCategoriesResponseT {
  error: null | string;
  message: string;
  data: Data[];
}

export interface Data {
  has_sub_categories?: boolean;
  icon_url: string;
  name: string;
  id: string;
}
