// 'use client'
// import { useProducts } from "medusa-react";
// import { useCollections } from "medusa-react"

// import Image from "next/image"

// const catrgoryCard = [
//     { img: '/home/print-category/1.png', title: 'T Shirt', desc: 'Retail shop' },
//     { img: '/home/print-category/2.png', title: 'T Shirt', desc: 'Retail shop' },
//     { img: '/home/print-category/3.png', title: 'T Shirt', desc: 'Retail shop' },
//     { img: '/home/print-category/1.png', title: 'T Shirt', desc: 'Retail shop' },
//     { img: '/home/print-category/2.png', title: 'T Shirt', desc: 'Retail shop' },
// ]
// const PrintCategory = () => {
//     // const {products} = useProducts()
//     // const {collections} = useCollections()
//     // // console.log("productsList :", products);
//     // // console.log("collectionsList :", collections);

//     return (
//         <section className="mt-[100px] md:mx-14">
//             <div className="content-container ">
//                 <div>
//                     <h2 className="text-[#000] text-[40px] font-semibold text-center">Print by catagories</h2>
//                     <p className="text-[#5A5A5A] text-[16px] font-normal leading-8 text-center mt-5 mb-10">There are many variations of passages of Lorem Ipsum available, but <br /> the majority have suffered</p>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-x-7">
//                     {catrgoryCard.map((c) =>
//                         <div className="relative">
//                             <div className="flex justify-center">
//                                 <Image src={c.img} width={258} height={257} alt="Print Catgory" />
//                             </div>
//                             <p className="text-[#000] text-[20px] font-normal leading-8 text-center mt-2">{c.title}</p>
//                             {/* <p className="text-[#6F6F6F] text-[16px] font-normal leading-8 text-center">{c.desc}</p> */}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default PrintCategory

"use client"
import Carousel from "react-elastic-carousel"
import Image from "next/image"

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 700, itemsToShow: 3 },
  { width: 900, itemsToShow: 4 },
  // { width: 1200, itemsToShow: 4 },
]

const catrgoryCard = [
  {
    id: 1,
    img: "/home/print-category/1.png",
    title: "Gifts - Social Events -Special days ",
    desc: "Retail shop",
  },
  {
    id: 2,
    img: "/home/print-category/2.png",
    title:
      "Streetwear trends - Vintage - Cultural - Music - Anime - Movies - Inspiring Quotes ",
    desc: "Retail shop",
  },
  {
    id: 3,
    img: "/home/print-category/3.png",
    title:
      "Romantic - Hobbies-Antique-Retro - Motivational - Games - Funny-Sports.",
    desc: "Retail shop",
  },
  {
    id: 4,
    img: "/home/print-category/4.png",
    title: "Special offers and promotions",
    desc: "Retail shop",
  },
  {
    id: 5,
    img: "/home/print-category/2.png",
    title: "Best selling - New arrivals",
    desc: "Retail shop",
  },
]

const PrintCategory = () => {
  return (
    <section className="mt-[100px] md:mx-0">
      {/* <div className="content-container "> */}
      <div>
        <h2 className="text-[#000] text-[40px] font-semibold text-center">
          Print by catagories
        </h2>
        <p className="text-[#5A5A5A] text-[16px] font-normal leading-8 text-center mt-5 mb-10">
          Your style, our expertise
        </p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-x-7"> */}
      <Carousel
        isRTL={false}
        pagination={false}
        enableAutoPlay={true}
        breakPoints={breakPoints}
        className="md:content-container"
      >
        {catrgoryCard.map((c) => (
          <div key={c.id} className="relative">
            <div className="flex justify-center">
              <Image
                src={c.img}
                width={258}
                height={257}
                alt="Print Catgory"
                className="rounded-lg"
              />
            </div>
            <p className="text-[#000] text-[20px] font-normal leading-8 text-center mt-2 mx-6">
              {c.title}
            </p>
            {/* <p className="text-[#6F6F6F] text-[16px] font-normal leading-8 text-center">{c.desc}</p> */}
          </div>
        ))}
      </Carousel>
      {/* </div> */}
      {/* </div> */}
    </section>
  )
}

export default PrintCategory
