import axios from "axios";
import { response } from "express";
import fetch from "node-fetch";
import { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET} from "./config.js";


export async function createOrder() {
 
  const accessToken = await generateAccessTokenFetch();
  const url = `${PAYPAL_API}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "4.00",
          },
        },
      ],
    }),
  });

  const data = await response.json();
  console.log(data);
  return data;
}


export async function capturePayment(orderId) {
  const accessToken = await generateAccessTokenFetch();
  const url = `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
}

async function generateAccessTokenFetch() {
    const response = await fetch(PAYPAL_API + "/v1/oauth2/token", {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization:
          "Basic " + Buffer.from(PAYPAL_API_CLIENT + ":" + PAYPAL_API_SECRET).toString("base64"),
      },
    });
    const data = await response.json();
    return data.access_token;
}

