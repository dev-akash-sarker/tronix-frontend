// app/campaign/[slug]/page.tsx
import { FC } from "react";
type TimeLeft = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface Campaign {
  campaignId: string;
  campaignName: string;
  OfferStartTime: string;
  OfferEndTime: string;
  products: {
    id: number;
    productID: string;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    sales?: number;
    Offerdiscount: number;
    persentage: boolean;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
  }[];
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
type CampaignSlug = "durgapuja-offer" | "eid-offer";

interface CampaignPageProps {
  params: {
    slug: CampaignSlug;
  };
}

const campaignData: Record<
  CampaignSlug,
  { title: string; description: string }
> = {
  "durgapuja-offer": {
    title: "Durgapuja Offer",
    description: "Special discounts for Durgapuja!",
  },
  "eid-offer": {
    title: "Eid Offer",
    description: "Special discounts for Eid!",
  },
};

const CampaignPage: FC<CampaignPageProps> = ({ params }) => {
  const campaign = campaignData[params.slug];
  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{campaign.title}</h1>
      <p>{campaign.description}</p>
    </div>
  );
};

export default CampaignPage;
