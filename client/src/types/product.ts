export interface ProductReview {
  author: string;
  rating: number;
  text: string;
  avatar?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: [string, string, string, string];
  category: string;
  rating: number;
  stockInfo: string;
  recommended?: boolean;
  description: string;
  specifications: ProductSpecification[];
  reviews: ProductReview[];
}
