import { PlacesClient } from "@googlemaps/places";
import dotenv from "dotenv";

// Types
import type { ISearchNearbyRequest, ISearchNearbyResponse } from "./types";

export interface Place {
  name: string;
  id: string;
  rating?: number;
  userRatingsTotal?: number;
  vicinity?: string;
  openingHours?: {
    openNow?: boolean;
    periods?: Array<{
      open: { day: number; time: string };
      close: { day: number; time: string };
    }>;
  };
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface PlacesSearchResponse {
  places: Place[];
}

interface SearchParams {
  latitude: number;
  longitude: number;
  radius?: number;
  openNow?: boolean;
  pageToken?: string;
}

// Initialize Google Places Client
dotenv.config();

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is required");
}

const client = new PlacesClient({
  fallback: true,
  apiKey: process.env.GOOGLE_API_KEY,
});

export const searchCoffeeShops = async ({
  latitude,
  longitude,
  radius = 1000,
}: SearchParams): Promise<ISearchNearbyResponse> => {
  const [response] = await client.searchNearby(
    {
      locationRestriction: {
        circle: {
          center: { latitude, longitude },
          radius,
        },
      },
      includedTypes: ["coffee_shop", "cafe"],
      excludedTypes: ["convenience_store", "bar", "restaurant", "gas_station"],
      maxResultCount: 10,
    },
    {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask": [
            "places.id",
            "places.displayName",
            "places.rating",
            "places.userRatingCount",
            "places.types",
            "places.googleMapsUri",
            // "places.location",
            // "places.formattedAddress",
            // "places.currentOpeningHours.openNow",
          ].join(","),
        },
      },
    }
  );

  return response;
};
