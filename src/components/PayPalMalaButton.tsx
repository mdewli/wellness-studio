"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
  type ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { useMemo, useState } from "react";

type PayPalMalaButtonProps = {
  productTitle: string;
  price: number;
  paypalClientId?: string | null;
};

/**
 * Validates if the given PayPal client ID is present, non-empty, and not a placeholder.
 */
export function isValidPayPalClientId(id?: string | null): id is string {
  if (!id || typeof id !== "string") return false;
  const trimmed = id.trim().toLowerCase();
  if (trimmed === "" || trimmed === "placeholder" || trimmed.includes("placeholder")) {
    return false;
  }
  return true;
}

export function PayPalMalaButton({
  productTitle,
  price,
  paypalClientId,
}: PayPalMalaButtonProps) {
  const [message, setMessage] = useState<string | null>(null);

  // Check passed prop first, then fall back to environment variable
  const rawId =
    paypalClientId !== undefined && paypalClientId !== null && paypalClientId.trim() !== ""
      ? paypalClientId
      : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const validClientId = isValidPayPalClientId(rawId) ? rawId.trim() : null;

  const options = useMemo<ReactPayPalScriptOptions | null>(() => {
    if (!validClientId) return null;
    return {
      clientId: validClientId,
      currency: "EUR",
      intent: "capture",
      components: "buttons",
    };
  }, [validClientId]);

  if (!validClientId || !options) {
    return (
      <p className="border border-[#2A2A2A]/15 px-4 py-3 font-serif text-sm opacity-70">
        Online checkout is currently unavailable
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <PayPalScriptProvider options={options}>
        <PayPalButtons
          style={{ layout: "vertical", color: "black", shape: "rect", label: "paypal" }}
          createOrder={(_data, actions) =>
            actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: productTitle,
                  amount: {
                    currency_code: "EUR",
                    value: price.toFixed(2),
                  },
                },
              ],
            })
          }
          onApprove={async (data, actions) => {
            if (!actions.order) {
              setMessage("Unable to complete payment.");
              return;
            }
            const details = await actions.order.capture();
            setMessage(
              `Thank you. Payment ${details.status?.toLowerCase() ?? "completed"} for ${productTitle}.`,
            );
          }}
          onError={() => {
            setMessage("Something went wrong with PayPal. Please try again.");
          }}
        />
      </PayPalScriptProvider>
      {message ? (
        <p className="font-serif text-sm text-[#2A2A2A]" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
