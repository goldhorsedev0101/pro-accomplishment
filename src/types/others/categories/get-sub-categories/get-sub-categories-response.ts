export interface GetSubCategoriesResponseT {
  message: string;
  data: data[];
  error: any;
}

export interface data {
  id: string;
  name: string;
  type: string;
  category_id: string;
  icon_url: any;
}
