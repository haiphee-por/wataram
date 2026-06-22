export interface Temple {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  thaiDescription: string;
  image: string;
  province: string;
  district?: string;
  type: 'วัดราษฎร์' | 'พระอารามหลวง' | 'อุทยานประวัติศาสตร์';
  rating: number;
  reviewsCount: number;
  distance?: string;
  yearBuilt: string;
  architecturalStyle: string;
  locationName: string;
  visitingHours: string;
  images: string[];
  heritageClass?: string;
  verified: boolean;
}

export interface Review {
  id: string;
  templeId: string;
  author: string;
  avatarChar: string;
  rating: number;
  date: string;
  comment: string;
  replied?: boolean;
  replyText?: string;
}

export interface Activity {
  id: string;
  type: 'verification' | 'review' | 'user' | 'media';
  time: string;
  text: string;
  highlightText?: string;
}
