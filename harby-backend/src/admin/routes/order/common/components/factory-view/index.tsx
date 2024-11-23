import React, { useEffect, useState } from 'react'
import Medusa from "@medusajs/medusa-js"
import useNotification from "../../../../personalizer/common/components/hooks/use-notification";
import { medusaUrl } from '../../../../personalizer/common/services/config';

const FactoryView = ({ cartId }) => {

    const notification = useNotification()

    const [url, setUrl] = useState('');
    const [qty, setQty] = useState<number>();

    useEffect(() => {
        const medusa = new Medusa({ baseUrl: medusaUrl, maxRetries: 3 })
        medusa.carts.retrieve(cartId)
            .then(({ cart }) => {
                // console.log(cart.id);
                if (cart) {
                    if (cart.context.designerImage) {
                        setUrl(cart.context.designerImage as string)
                    }
                    setQty(cart.items.length)
                }
            });
    }, [])

    const handleStatusChange = () => {
        const medusa = new Medusa({ baseUrl: medusaUrl, maxRetries: 3 })
        medusa.carts.update(cartId, {
            context: {
                customStatus: "Shipment_ready"
            },
        })
            .then(({ cart }) => {
                notification("Success", "Status updated successfully", "success")
                console.log(cart.id);
                console.log(cart);
            });
    }

    return (
        <div className="mt-12">
            <div className="flex justify-between font-semibold">
                <div className="opacity-0">harby shirt.png</div>
                <div>Quantity to print</div>
                <div>Print Type</div>
            </div>
            <div className="flex justify-between text-gray-700 mt-6">
                <div>
                    <img src={url} width={50} height={50} alt='' />
                </div>
                <div>{qty}</div>
                <div>Embroided</div>
            </div>
            <div className="flex justify-end mt-10">
                <button onClick={handleStatusChange} className="bg-green-600 px-6 py-2  rounded-full text-white">Done</button>
            </div>
        </div>
    )
}

export default FactoryView