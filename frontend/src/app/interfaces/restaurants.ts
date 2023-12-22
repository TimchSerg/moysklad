import { ICategory } from "./categories";
import { ICity } from "./city";

export interface IPhone {
  phone: string;
  comment: string;
}

export interface ICreateRestaurant {
  name: string;
  category: string;
  address: string;
}

export interface IFiltersRestaurants {
  categories: ICategory[];
  cities: ICity[];
};

export interface IRestaurantInfo{
  phoneOwner: string | null; 
  addressEntry: string | null; 
  addPhone: string | null, 
  phoneComment: string,
  metro: string,
  averageReceipt: string
}

export interface IGallery{
  link: string,
  title: string
}
export interface ISocial{
  facebook: string | null;
  instagram: string | null;
  telegram: string | null;
  twitter: string | null;
  vk: string | null;
  youtube: string | null;
}

export interface IWorkingHours{
  friday: string;
  monday: string;
  saturday: string;
  sunday: string;
  thursday: string;
  tuesday: string;
  wednesday: string;
}

export interface IDishes {
  id: string;
  name: string;
  description: string;
  photo: string;
  price: string;
  grams: string;
  categoryId: string;
  category: ICategory;
  kitchenId: string;
  kitchen: ICategory;
}

export interface IHookah {
  id: string;
  name: string;
  description: string;
  photo: string;
  price: string;
  categoryId: string;
  category: ICategory;
}

export interface IRestaurant {
  id: string;
  name: string;
  address: string;
  addPhones: IPhone[];
  logo: string;
  telephone: string;
  categories: ICategory[];
  city: { name: string };
  description: string;
  addInfo: IRestaurantInfo;
  social: ISocial;
  workingHours: IWorkingHours;
  gallery: Array<IGallery>;
  hashtags: Array<any>;
  menu: IDishes[];
  rating: number;
  status: string;
  createdAt: string;
}

export interface IManagerRestaurants {
  managerId: string;
  restaurantId: string;
  restaurants: IRestaurant;
}