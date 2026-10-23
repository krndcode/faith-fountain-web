"use client";

import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { Loader2, AlertCircle, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PayPalCheckoutProps {
  amount: number;
  currency: string;
  onSuccess: (details: {
    orderId: string;
    captureId: string;
    amount: number;
    currency: string;
  }) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export function PayPalCheckout({
  amount,
  currency,
  onSuccess,
  onError,
  onCancel,
}: PayPalCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const clientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "your-paypal-sandbox-client-id";
  const isRealConfigured =
    clientId && clientId !== "your-paypal-sandbox-client-id";

  const handleCreateOrder = async (): Promise<string> => {
    setIsProcessing(true);
    setInternalError(null);
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate PayPal order");
      }

      return data.id;
    } catch (err: any) {
      setIsProcessing(false);
      const msg = err.message || "Failed to create donation order";
      setInternalError(msg);
      onError(msg);
      throw err;
    }
  };

  const handleApprove = async (data: { orderID: string }) => {
    setIsProcessing(true);
    setInternalError(null);
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.orderID, amount, currency }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to complete payment capture");
      }

      const captureData = result.data;
      onSuccess({
        orderId: captureData.orderId,
        captureId: captureData.captureId,
        amount: captureData.amount,
        currency: captureData.currency,
      });
    } catch (err: any) {
      const msg = err.message || "Payment capture failed on server";
      setInternalError(msg);
      onError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulated test button for sandbox testing before real credentials are added to .env.local
  const handleSimulatedTestCheckout = async () => {
    setIsProcessing(true);
    setInternalError(null);
    try {
      const createRes = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });
      const createData = await createRes.json();

      const captureRes = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: createData.id,
          amount,
          currency,
          donorName: "Kind Supporter",
        }),
      });
      const captureData = await captureRes.json();

      onSuccess({
        orderId: captureData.data.orderId,
        captureId: captureData.data.captureId,
        amount: captureData.data.amount,
        currency: captureData.data.currency,
      });
    } catch (err: any) {
      setInternalError(err.message || "Simulation error");
      onError(err.message || "Simulation error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {internalError && (
        <div
          role="alert"
          className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 text-sm"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <span>{internalError}</span>
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center justify-center py-6 gap-3 text-brand-forest">
          <Loader2 className="w-6 h-6 animate-spin text-brand-growth" />
          <span className="text-sm font-semibold">
            Connecting to PayPal and verifying transaction...
          </span>
        </div>
      )}

      {/* Official PayPal Buttons SDK Container */}
      <div className={`transition-opacity ${isProcessing ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
        {isRealConfigured ? (
          <PayPalScriptProvider
            options={{
              clientId: clientId,
              currency: currency,
              intent: "capture",
            }}
          >
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "donate",
              }}
              createOrder={handleCreateOrder}
              onApprove={handleApprove}
              onCancel={() => {
                setIsProcessing(false);
                onCancel();
              }}
              onError={(err) => {
                setIsProcessing(false);
                const msg =
                  typeof err === "string" ? err : "PayPal encountered an error during checkout";
                setInternalError(msg);
                onError(msg);
              }}
            />
          </PayPalScriptProvider>
        ) : (
          <div className="p-6 bg-brand-ivory border border-brand-border rounded-xl text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-brand-growth/10 text-brand-growth flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-brand-forest">
              PayPal Sandbox Integration Ready
            </p>
            <p className="text-xs text-brand-charcoal-muted max-w-md mx-auto leading-relaxed">
              Add your PayPal sandbox credentials to <code className="bg-white px-1.5 py-0.5 rounded border text-brand-forest font-mono">.env.local</code> to activate the live SDK buttons. In the meantime, you can test the complete server order &amp; capture verification flow below:
            </p>
            <button
              type="button"
              onClick={handleSimulatedTestCheckout}
              disabled={isProcessing}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-bold text-sm shadow-sm transition-all active:scale-[0.98] w-full max-w-sm mx-auto"
            >
              <Heart className="w-4 h-4 fill-[#003087]" />
              Test Complete Donation Flow ({formatCurrency(amount, currency)})
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-brand-charcoal-muted pt-2">
        <ShieldCheck className="w-4 h-4 text-brand-growth" />
        <span>Secure 256-bit encrypted checkout powered by PayPal</span>
      </div>
    </div>
  );
}
