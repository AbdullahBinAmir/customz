import Fawry from "../lib/fawry";
import {
    AbstractPaymentProcessor,
    PaymentProcessorContext,
    PaymentSessionStatus,
    MedusaContainer,
    CartService,
} from "@medusajs/medusa";
import { MedusaError } from "@medusajs/utils";
import axios from "axios";
import { medusaUrl } from "../admin/routes/personalizer/common/services/config";

export interface FawryPaymentProcessorConfig extends Record<string, unknown> {
    merchant_code: string;
    secret_key: string;
    disable_retries?: boolean;
    debug?: boolean;
}

class FawryPaymentProcessor extends AbstractPaymentProcessor {
    static identifier = "fawry";

    protected readonly cartService: CartService;
    protected readonly configuration: FawryPaymentProcessorConfig = {
        merchant_code: process.env.FAWRY_MERCHANT_CODE,
        secret_key: process.env.FAWRY_SECRET_KEY,
        disable_retries: false,
        debug: true
    };
    protected readonly fawry: Fawry;
    protected readonly debug: boolean;

    constructor(
        container: Record<string, any> & MedusaContainer,
        options: FawryPaymentProcessorConfig
    ) {
        super(container, options);

        // if (!options.secret_key || !options.merchant_code) {
        //   throw new MedusaError(
        //     MedusaError.Types.INVALID_ARGUMENT,
        //     "The Fawry provider requires the secret_key and merchant_code options"
        //   );
        // }

        // this.configuration = options;
        options = this.configuration
        this.fawry = new Fawry({
            merchantCode: options.merchant_code,
            secretKey: options.secret_key,
            disable_retries: options.disable_retries,
        });
        this.debug = Boolean(options.debug);

        this.cartService = container.cartService;

        if (this.cartService.retrieveWithTotals === undefined) {
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                "Your Medusa installation contains an outdated cartService implementation. Update your Medusa installation."
            );
        }
    }

    get paymentIntentOptions() {
        return {};
    }

    async initiatePayment(context: PaymentProcessorContext): Promise<{
        session_data: Record<string, unknown>;
    }> {
        if (this.debug) {
            console.info("PS_P_Debug: InitiatePayment", JSON.stringify(context, null, 2));
        }
        // const { amount, email, resource_id } = context;

        // const cart = await this.cartService.retrieveWithTotals(resource_id);

        // const mobile = cart.shipping_address?.phone || cart.billing_address?.phone;

        // if (!mobile) {
        //   throw new MedusaError(
        //     MedusaError.Types.INVALID_DATA,
        //     "Customer mobile phone number is required"
        //   );
        // }

        // const merchantRefNum = `order_${resource_id}_${Date.now()}`;
        // const customerProfileId = cart.customer_id;

        // const paymentMethod = "CARD";

        // try {
        //   const data = await this.fawry.transaction.initialize({
        //     amount: amount/100,
        //     name:context.customer.first_name,
        //     email: email,
        //     mobile: mobile,
        //     merchantRefNum: merchantRefNum,
        //     customerProfileId: customerProfileId,
        //     token:token,
        //     cvv:cvv,
        //     paymentMethod: paymentMethod,
        //     description: `Payment for order ${resource_id}`,
        //   });

        //   return {
        //     session_data: {
        //       fawryMerchantRefNum: merchantRefNum,
        //       fawryPaymentLink: data.paymentLink,
        //       cartId: resource_id,
        //     },
        //   };
        // } catch (error) {
        //   throw new MedusaError(
        //     MedusaError.Types.UNEXPECTED_STATE,
        //     "Failed to initiate Fawry payment: " + error.message
        //   );
        // }
        try {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${medusaUrl}/store/custom/createpaymenttoken?customerProfileId=${context.customer.id}`,
                headers: {}
            };

            const response = await axios.request(config)
            return {
                session_data: response.data
            }
        } catch (error) {
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                "Failed to initiate Fawry payment: " + error.message
            );
        }
    }

    async updatePayment(data: Record<string, unknown>,): Promise<{
        session_data: Record<string, unknown>;
    }> {
        if (this.debug) {
            console.info("PS_P_Debug: UpdatePayment", JSON.stringify(data, null, 2));
        }

        return {
            session_data: {
              ...data, // We just return the data as is
            }
        }
    }

    async authorizePayment(
        paymentSessionData: Record<string, unknown> & {
            data:{
                fawryMerchantRefNum: string;  
            }     
        }
    ): Promise<{
        status: PaymentSessionStatus;
        data: Record<string, unknown>;
    }> {
        if (this.debug) {
            console.info(
                "PS_P_Debug: AuthorizePayment",
                JSON.stringify(paymentSessionData.data, null, 2)
            );
        }

        try {
            // const statusData = await this.fawry.transaction.checkStatus({
            //     merchantRefNum: paymentSessionData.data.fawryMerchantRefNum,
            // });
            // console.log(statusData)
            // const paymentStatus = statusData?.paymentStatus;

            if (!paymentSessionData.data.fawryMerchantRefNum) {
                return {
                    status: PaymentSessionStatus.PENDING,
                    data: paymentSessionData,
                };
            }

            return {
                status: PaymentSessionStatus.AUTHORIZED,
                data: {...paymentSessionData,status: "authorized"},
            };
        } catch (error) {
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                "Failed to authorize Fawry payment: " + error.message
            );
        }
    }

    async cancelPayment(
        paymentSessionData: Record<string, unknown>,
    ): Promise<Record<string, unknown>> {
        return paymentSessionData;
    }
    /**
     * Delete payment for Paystack payment intent.
     * This is not supported by Paystack - transactions are stateless.
     */
    async deletePayment(
        paymentSessionData: Record<string, unknown> ,
    ): Promise<Record<string, unknown>> {
        return paymentSessionData;
    }

    async refundPayment(
        paymentSessionData:  any,
        refundAmount: number
    ): Promise<{
        data: Record<string, unknown>;
    }> {
        if (this.debug) {
            console.info(
                "PS_P_Debug: RefundPayment",
                JSON.stringify(paymentSessionData, null, 2)
            );
        }

        const referenceNumber = paymentSessionData?.data?.data?.fawryMerchantRefNum;
        const reason = "Customer requested refund";

        try {
            await this.fawry.refund.create({
                referenceNumber,
                refundAmount: (refundAmount/100).toFixed(2),
                reason,
            });

            return {
                data: paymentSessionData,
            };
        } catch (error) {
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                "Failed to refund Fawry payment: " + error.message
            );
        }
    }

    async getPaymentStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus> {
        if (this.debug) {
            console.info("PS_P_Debug: GetPaymentStatus", JSON.stringify(paymentSessionData, null, 2));
        }
        try {
            switch (paymentSessionData.status) {
                case "authorized":
                    return PaymentSessionStatus.AUTHORIZED; // Or another status if appropriate
                case "pending":
                    return PaymentSessionStatus.PENDING;
                case "failed":
                    return PaymentSessionStatus.ERROR;
                // Handle other statuses as necessary
                default:
                    return PaymentSessionStatus.PENDING;
            }
        } catch (error) {
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                "Failed to retrieve Fawry payment status: " + error.message
            );
        }
    }

    async getPaymentData(session) {
        return session.data
    }

    async capturePayment(paymentSessionData: any): Promise<{
        data: Record<string, unknown>;
        status:string
    }> {
        if (this.debug) {
            console.info("PS_P_Debug: CapturePayment", JSON.stringify(paymentSessionData, null, 2));
        }

        const referenceNumber = paymentSessionData?.data?.fawryMerchantRefNum;

        try {
            // Capture the payment using the Fawry API
            const captureResponse = await this.fawry.transaction.capture({
                merchantRefNum: referenceNumber
            });
            console.log("capture",captureResponse)
            if (captureResponse?.orderStatus !== 'PAID') {
                throw new MedusaError(
                    MedusaError.Types.UNEXPECTED_STATE,
                    "Failed to capture Fawry payment: " + captureResponse?.message
                );
            }

            return {
                data: paymentSessionData,
                status: "captured"
            };
        } catch (error) {
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                "Failed to capture Fawry payment: " + error.message
            );
        }
    }

    async retrievePayment(paymentSessionData: Record<string, unknown>): Promise<{
        status: PaymentSessionStatus;
        data: any;
    }> {
        try {

            return {
                status: PaymentSessionStatus.AUTHORIZED, // Adjust this based on actual response
                data: paymentSessionData.data,
            };
        } catch (error) {
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                "Failed to retrieve Fawry payment: " + error.message
            );
        }
    }

    async updatePaymentData(_: string, updateData: Record<string, unknown>): Promise<{
        data: Record<string, unknown>;
    }> {
        if (this.debug) {
            console.info("PS_P_Debug: UpdatePaymentData", JSON.stringify(updateData, null, 2));
        }

        try {
            // Update the payment details using the Fawry API
            // await this.fawry.transaction.update({
            //     merchantRefNum: updateData?.fawryMerchantRefNum as string,
            //     updateData,
            // });

            return {
                data: updateData
            }

        } catch (error) {
            throw new MedusaError(
                MedusaError.Types.UNEXPECTED_STATE,
                "Failed to update Fawry payment: " + error.message
            );
        }
    }



}

export default FawryPaymentProcessor;