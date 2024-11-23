

import FeaturedProducts from "@modules/home/components/featured-products"

const BestSeller = () => {
    return (
        <section className="mx-[98px] mt-[170px]">
            <div>
                <h2 className="text-[#000] text-[40px] font-semibold leading-[60px] text-center">Best sellers</h2>
                <p className="text-[#5A5A5A] text-[16px] font-normal leading-8 text-center mt-11 mb-8">There are many variations of passages of Lorem Ipsum available, but <br /> the majority have suffered</p>
            </div>
            <div>
                <FeaturedProducts />
            </div>
        </section>
    )
}

export default BestSeller
