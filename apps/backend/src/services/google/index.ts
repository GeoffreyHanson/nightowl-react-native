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

const client = new PlacesClient();

/**
 * @param latitude
 * @param longitude - West coords are negative, East coords are positive
 * @param radius
 * @returns
 */
export const searchCoffeeShops = async ({
  latitude,
  longitude,
  radius = 1000, // default 1km radius
}: SearchParams): Promise<ISearchNearbyResponse> => {
  const [response] = await client.searchNearby({
    locationRestriction: {
      circle: {
        center: { latitude, longitude },
        radius: radius,
      },
    },
    includedTypes: ["cafe"],
    maxResultCount: 10,
  });

  return response;
};
