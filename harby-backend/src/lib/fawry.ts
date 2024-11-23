import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import crypto from "crypto";

export const FAWRY_API_PATH = "https://atfawry.fawrystaging.com";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";

interface Request {
  path: string;
  method: HTTPMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  query?: Record<string, string>;
}

export interface FawryTransactionAuthorisation {
  referenceNumber: string;
  merchantRefNumber: string;
  paymentAmount: number;
  fawryFees: number;
  orderStatus: string;
  paymentMethod: string;
  paymentLink: string;
}

export interface FawryWrapperOptions {
  merchantCode: string;
  secretKey: string;
  disable_retries?: boolean;
}

export default class Fawry {
  merchantCode: string;
  secretKey: string;

  protected readonly axiosInstance: AxiosInstance;

  constructor(options: FawryWrapperOptions) {
    this.merchantCode = options.merchantCode;
    this.secretKey = options.secretKey;

    this.axiosInstance = axios.create({
      baseURL: FAWRY_API_PATH,
    });

    if (options?.disable_retries !== true) {
      axiosRetry(this.axiosInstance, {
        retries: 3,
        retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
        retryDelay: axiosRetry.exponentialDelay,
      });
    }
  }

  protected async requestFawryAPI<T>(request: Request): Promise<T> {
    const options: AxiosRequestConfig = {
      method: request.method,
      url: request.path,
      params: request.query,
      data: request.body,
      headers: request.headers,
    };

    try {
      const res = await this.axiosInstance(options);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Error from Fawry API with status code ${error.response?.status}: ${error.response?.data?.statusDescription}`
        );
      }
      throw error;
    }
  }

  private generateSignature(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  transaction = {
    initialize: async ({
      amount,
      name,
      email,
      mobile,
      merchantRefNum,
      customerProfileId,
      token,
      cvv,
      paymentMethod,
      description,
      chargeItems,
    }: {
      amount: number;
      name: string;
      email: string;
      mobile: string;
      merchantRefNum: string;
      customerProfileId: string;
      token: string;
      cvv: number;
      paymentMethod: string;
      description?: string;
      chargeItems?: Array<{
        itemId: string;
        description: string;
        price: number;
        quantity: number;
      }>;
    }) => {
      const returnUrl = "https://customz.shop/checkout"
      const signatureData = `${this.merchantCode}${merchantRefNum}${customerProfileId}${paymentMethod}${amount}${token}${cvv}${returnUrl}${this.secretKey}`;
      const signature = this.generateSignature(signatureData);

      const body = {
        merchantCode: this.merchantCode,
        merchantRefNum: merchantRefNum,
        customerName: name,
        customerMobile: mobile,
        customerEmail: email,
        customerProfileId: customerProfileId,
        cardToken: token,
        cvv: cvv,
        amount: amount,
        currencyCode: "EGP",
        language: "en-gb",
        chargeItems: chargeItems,
        signature: signature,
        enable3DS: true,
        authCaptureModePayment: false,
        returnUrl: returnUrl,
        paymentMethod: paymentMethod,
        description: description
      };

      return this.requestFawryAPI<FawryTransactionAuthorisation>({
        path: "/ECommerceWeb/Fawry/payments/charge",
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    capture: async ({ merchantRefNum }: { merchantRefNum: string; }) => {
      const signatureData = `${merchantRefNum}${this.merchantCode}${this.secretKey}`;
      const signature = this.generateSignature(signatureData);

      const params = {
        merchantCode: this.merchantCode,
        merchantRefNum: merchantRefNum,
        requestSignature: signature
      };

      return this.requestFawryAPI<any>({
        path: "/ECommerceWeb/api/payment/capture",
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    retrieve: async ({ merchantRefNum }: { merchantRefNum: string }) => {
      const signatureData = `${this.merchantCode}${merchantRefNum}${this.secretKey}`;
      const signature = this.generateSignature(signatureData);

      const params = {
        merchantCode: this.merchantCode,
        merchantRefNumber: merchantRefNum,
        signature,
      };

      return this.requestFawryAPI<any>({
        path: "/ECommerceWeb/Fawry/payments/retrieve",
        method: "GET",
        query: params,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    update: async ({ merchantRefNum, updateData }: { merchantRefNum: string; updateData: any }) => {
      const signatureData = `${this.merchantCode}${merchantRefNum}${JSON.stringify(updateData)}${this.secretKey}`;
      const signature = this.generateSignature(signatureData);

      const params = {
        merchantCode: this.merchantCode,
        merchantRefNumber: merchantRefNum,
        signature,
        ...updateData,
      };

      return this.requestFawryAPI<any>({
        path: "/ECommerceWeb/Fawry/payments/update",
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    checkStatus: async ({ merchantRefNum }: { merchantRefNum: string }) => {
      const signatureData = `${this.merchantCode}${merchantRefNum}${this.secretKey}`;
      const signature = this.generateSignature(signatureData);

      const params = {
        merchantCode: this.merchantCode,
        merchantRefNumber: merchantRefNum,
        signature: signature,
      };

      console.log(params)

      return this.requestFawryAPI<any>({
        path: "/ECommerceWeb/Fawry/payments/status",
        method: "GET",
        query: params,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  };

  refund = {
    create: async ({
      referenceNumber,
      refundAmount,
      reason,
    }: {
      referenceNumber: string;
      refundAmount: string;
      reason: string;
    }) => {
      const gsignatureData = `${this.merchantCode}${referenceNumber}${this.secretKey}`;
      const gsignature = this.generateSignature(gsignatureData);

      const response = await fetch(`https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/payments/status/v2?merchantCode=${this.merchantCode}&merchantRefNumber=${referenceNumber}&signature=${gsignature}`);

      const paydata = await response.json()

      const signatureData = `${this.merchantCode}${paydata.fawryRefNumber}${refundAmount}${reason}${this.secretKey}`;
      const signature = this.generateSignature(signatureData);

      const body = {
        merchantCode: this.merchantCode,
        referenceNumber: paydata.fawryRefNumber,
        refundAmount: refundAmount,
        reason: reason,
        signature: signature,
      };

      console.log(body)

      return this.requestFawryAPI<any>({
        path: "/ECommerceWeb/Fawry/payments/refund",
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  };
}