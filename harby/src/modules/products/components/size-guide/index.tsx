import { medusaClient } from '@lib/config'
import React, { useEffect, useState } from 'react'

type TShirtSize = {
    id: string
    fit: 'regular' | 'oversize'
    size: string
    chest_min: number
    chest_max: number
    length: number
    product_id: string | null
}

export default function SizeGuideModal({ productId }: { productId?: string }) {
    const [sizes, setSizes] = useState<TShirtSize[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const { t_shirt_sizes } = await medusaClient.client.request("GET", `/store/t-shirt-sizes${productId ? `?product_id=${productId}` : ''}`)
                setSizes(t_shirt_sizes)
            } catch (err) {
                setError('Error fetching t-shirt sizes. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchSizes()
    }, [productId])

    const SizeTable = ({ title, sizes }: { title: string, sizes: TShirtSize[] }) => (
        <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-100">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[300px]">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2 px-2 text-left">Size</th>
                            <th className="py-2 px-2 text-left">Chest (cm)</th>
                            <th className="py-2 px-2 text-left">Length (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map((size) => (
                            <tr key={size.id} className="border-b border-gray-800">
                                <td className="py-2 px-2">{size.size}</td>
                                <td className="py-2 px-2">{size.chest_min} - {size.chest_max}</td>
                                <td className="py-2 px-2">{size.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

    return (
        <div className="bg-gray-900 text-gray-300 p-4 md:p-8 rounded-lg max-w-4xl mx-auto">
            <div className="text-center mb-6">
                {/* <img src="/public/meamade.png" alt="Customz Logo" className="mx-auto mb-4" /> */}
            </div>
            {loading ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
            ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
                <>
                    <SizeTable title="REGULAR FIT T-SHIRT" sizes={sizes.filter(size => size.fit === 'regular')} />
                    <SizeTable title="OVERSIZE FIT T-SHIRT" sizes={sizes.filter(size => size.fit === 'oversize')} />
                </>
            )}
            <div className="text-center mt-6">
                <a href="https://www.customz.shop" className="bg-gray-700 text-white px-4 py-2 rounded-full inline-block hover:bg-gray-600 transition-colors text-sm md:text-base">
                    SHOP NOW
                </a>
            </div>
            <div className="text-center mt-4 text-xs md:text-sm text-gray-500">
                www.customz.shop
            </div>
        </div>
    )

}