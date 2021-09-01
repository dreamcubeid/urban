import { IncomingMessage } from 'http';
import {
  getGoogleAuth,
  getFacebookAuth,
  getBlogHeaderImage,
  getWhatsAppOTPSetting,
  getBrand,
  getBanner
} from "@sirclo/nexus";

const GRAPHQL_URI = (req) => {
  return process.env.GRAPHQL_URI || `https://${req.headers.host}/graphql`;
}

export const handleGoogleAuth = async (req: IncomingMessage) => {
  return await getGoogleAuth(GRAPHQL_URI(req));
}

export const handleFacebookAuth = async (req: IncomingMessage) => {
  return await getFacebookAuth(GRAPHQL_URI(req));
}

export const handleGetBlogHeaderImage = async (req: IncomingMessage) => {
  return await getBlogHeaderImage(GRAPHQL_URI(req));
}

export const useWhatsAppOTPSetting = async (req: IncomingMessage) => {
  return await getWhatsAppOTPSetting(GRAPHQL_URI(req))
}

export const handleGetBanner = async (req: IncomingMessage) => {
  return await getBanner(GRAPHQL_URI(req))
}

export const useBrand = async (req: IncomingMessage) => {
  try {
    return await getBrand(GRAPHQL_URI(req));
  } catch (e) {
    console.log('Error while request brand: ', e);
  }
}
