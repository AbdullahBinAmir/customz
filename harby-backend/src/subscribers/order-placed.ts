import {
    type SubscriberConfig,
    type SubscriberArgs,
    OrderService,
} from "@medusajs/medusa"

import Medusa from "@medusajs/medusa-js"
import { medusaUrl } from "../admin/routes/personalizer/common/services/config"
import axios from "axios";

export default async function handleOrderPlaced({
    data, eventName, container, pluginOptions,
}: SubscriberArgs<Record<string, string>>) {

    // async function updateInventory(selectedOptions: Array<any>, qty: number) {
    //     try {
    //         const response = await axios.put(`${medusaUrl}/store/custom/getInventoryByOptions`, {
    //             selectedOptions,
    //             qty
    //         });
    //         console.log('Response:', response.data);
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             console.error('Axios error:', error.response?.data || error.message);
    //         } else {
    //             console.error('Unexpected error:', error);
    //         }
    //     }
    // }
    async function updateInventory(options: string, qty: number) {
        try {
            const response = await axios.put(`${medusaUrl}/store/custom/updateInventory`, {
                options,
                qty
            });
            console.log('Response:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    const orderService: OrderService = container.resolve(
        "orderService"
    )

    const medusa = new Medusa({ baseUrl: medusaUrl, maxRetries: 3 })

    const order = await orderService.retrieve(data.id, {
        // you can include other relations as well
        relations: ["items"],
    })

    for (let i = 0; i < order.items.length; i++) {
        // must be previously logged in or use api token
        medusa.products.variants.retrieve(order.items[i].variant_id)
            .then(({ variant }) => {
                // return updateInventory(variant.options, order.items[i].quantity);
                return updateInventory(variant.title, order.items[i].quantity);
            })

    }
}

export const config: SubscriberConfig = {
    event: OrderService.Events.PLACED,
    context: {
        subscriberId: "order-placed-handler",
    },
}