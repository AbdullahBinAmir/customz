import type {
    OrderService,
    SubscriberConfig,
    SubscriberArgs,
  } from "@medusajs/medusa";
  import FawryPaymentProcessor, {
    type FawryPaymentProcessorConfig,
  } from "../services/fawry-payment";
  
  type OrderPlacedData = {
    id: string;
  };
  
  function isOrderPlacedData(data: unknown): data is OrderPlacedData {
    return typeof data === "object" && data !== null && "id" in data;
  }
  
  export const config: SubscriberConfig = {
    event: "order.placed",
  };
  
  export default async function orderCapturer({
    container,
    data,
  }: SubscriberArgs) {
    const orderService = container.resolve<OrderService>("orderService");
    const pluginConfiguration = container.resolve<
      FawryPaymentProcessor & {
        configuration: FawryPaymentProcessorConfig;
      }
    >(`pp_${FawryPaymentProcessor.identifier}`).configuration;
  
    try {
      if (!isOrderPlacedData(data)) {
        return;
      }
  
      const order = await orderService.retrieve(data.id, {
        relations: ["payments"],
      });
      if (!order) return;
  
      // Check if the order was paid for with Fawry
      const isPaidForWithFawry = order.payments?.some(
        p => p.provider_id === "fawry",
      );
      if (!isPaidForWithFawry) return;
  
      if (pluginConfiguration.debug) {
        console.info(
          "PS_P_Debug: Capturing Fawry order with data:",
          JSON.stringify(data, null, 2),
        );
      }
  
      // Capture the payment
      await orderService.capturePayment(order.id);
    } catch (error) {
      console.error("Error capturing Fawry order:", error);
    }
  }