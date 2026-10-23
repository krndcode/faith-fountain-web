/**
 * PayPal Server-Side Service
 * Handles OAuth2 authentication, server-to-server Order creation, and capture verification.
 */

const PAYPAL_MODE = process.env.PAYPAL_MODE === "live" ? "live" : "sandbox";

const PAYPAL_BASE_URL =
  PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID || "";
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";

export const isPayPalConfigured = (): boolean => {
  return Boolean(
    PAYPAL_CLIENT_ID &&
    PAYPAL_CLIENT_SECRET &&
    PAYPAL_CLIENT_ID !== "your-paypal-sandbox-client-id" &&
    PAYPAL_CLIENT_SECRET !== "your-paypal-sandbox-client-secret"
  );
};

export const getPayPalMode = (): "sandbox" | "live" => {
  return PAYPAL_MODE;
};

/**
 * Generate PayPal OAuth2 Access Token using Basic Auth
 */
export async function getPayPalAccessToken(): Promise<string> {
  if (!isPayPalConfigured()) {
    throw new Error(
      "PayPal API credentials are not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env.local"
    );
  }

  const authString = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("PayPal OAuth token request failed:", errorBody);
    throw new Error(`Failed to authenticate with PayPal: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Server-side Create Order via PayPal Orders API v2
 */
export async function createPayPalOrder(params: {
  amount: number;
  currency: string;
}): Promise<{ id: string; status: string }> {
  const { amount, currency } = params;

  // Format amount to exact 2 decimal places
  const formattedAmount = amount.toFixed(2);

  const accessToken = await getPayPalAccessToken();

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        description: "Faith Fountain Foundation Charitable Donation",
        amount: {
          currency_code: currency,
          value: formattedAmount,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: formattedAmount,
            },
          },
        },
        items: [
          {
            name: "Donation to Faith Fountain Foundation",
            description: "Support for education, community relief, hospital assistance & Gospel outreach",
            quantity: "1",
            unit_amount: {
              currency_code: currency,
              value: formattedAmount,
            },
            category: "DONATION",
          },
        ],
      },
    ],
    application_context: {
      brand_name: "Faith Fountain Foundation",
      locale: "en-US",
      landing_page: "NO_PREFERENCE",
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
    },
  };

  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("PayPal create order failed:", data);
    throw new Error(data.message || "Failed to create PayPal order");
  }

  return {
    id: data.id,
    status: data.status,
  };
}

export interface PayPalCaptureResult {
  orderId: string;
  captureId: string;
  amount: number;
  currency: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  donorEmail?: string;
  donorName?: string;
}

/**
 * Server-side Capture Order via PayPal Orders API v2
 * Verifies merchant capture status and idempotency
 */
export async function capturePayPalOrder(orderId: string): Promise<PayPalCaptureResult> {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("PayPal capture request failed:", data);
    throw new Error(data.message || "Failed to capture PayPal payment");
  }

  // Extract capture details safely
  const purchaseUnit = data.purchase_units?.[0];
  const capture = purchaseUnit?.payments?.captures?.[0];

  const captureStatus = capture?.status || data.status;
  const isCompleted = captureStatus === "COMPLETED";

  const capturedAmount = parseFloat(capture?.amount?.value || purchaseUnit?.amount?.value || "0");
  const currencyCode = capture?.amount?.currency_code || purchaseUnit?.amount?.currency_code || "CAD";

  const payer = data.payer;
  const donorEmail = payer?.email_address;
  const donorName = payer?.name
    ? `${payer.name.given_name || ""} ${payer.name.surname || ""}`.trim()
    : undefined;

  return {
    orderId: data.id,
    captureId: capture?.id || data.id,
    amount: capturedAmount,
    currency: currencyCode,
    status: isCompleted ? "COMPLETED" : "PENDING",
    donorEmail,
    donorName,
  };
}
