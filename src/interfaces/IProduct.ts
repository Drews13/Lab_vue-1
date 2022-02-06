export interface IProduct {
  id: number;
  categoriesId: number[];
  name: string;
  shortDescription: string;
  detailedDescription: string;
  publisher: string;
  edition: string;
  releaseDate: string;
  announcementDate: string;
  tags: string;  
  systemRequirements: string;
  image: string;
  rating: number;
  genre: string;
  price: number;
  creationDate: string;
  quantity: number;
}
