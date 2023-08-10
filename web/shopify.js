import { BillingInterval, LATEST_API_VERSION, Shopify } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";




const DB_PATH = `${process.cwd()}/database.sqlite`;


// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
export const billingConfig = {
  "Basic": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 3.99,
    currencyCode: "USD",
    interval: BillingInterval.Every30Days,
  },
  "Advanced": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 9.99,
    currencyCode: "USD",
    interval: BillingInterval.Every30Days,
  },
};



const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: billingConfig, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  //sessionStorage: new CustomSessionStorage()
  // This should be replaced with your preferred storage strategy
  sessionStorage: new SQLiteSessionStorage(DB_PATH),
  // sessionStorage: new Shopify.Session.CustomSessionStorage(
  //   sessionHandler.storeCallback,
  //   sessionHandler.loadCallback,
  //   sessionHandler.deleteCallback
  // )
});

export default shopify;
