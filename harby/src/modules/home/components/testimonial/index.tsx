// import TestimonialTag from "@modules/common/icons/testimonial"
// import Image from "next/image"

// const testimonialTag = ['athexa', 'athexa', 'athexa', 'athexa', 'athexa', 'athexa']

// const Testimonial = () => {
//     return (
//         <section className="mt-[120px] md:mx-[72px] md:px-14">
//             <div className="content-container ">
//                 <div className="">
//                     <p className="text-[16px] text-[#000000] font-normal text-center">OUR CLIENTS SAY</p>
//                     <h2 className="text-[#000] text-[28px] md:text-[40px] font-semibold md:leading-[60px] mt-4 mb-14 text-center">Here's what our users <br /> speak about us</h2>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-5">
//                     <div className="relative col-span-2">
//                         <Image src='/testimonial.png' width={400} height={400} alt='Testimonial' />
//                     </div>
//                     <div className="col-span-3 mt-10 md:pl-16">
//                         <p className="text-[#000] text-[16px] md:text-[25px] text-center md:text-start font-medium leading-9">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
//                         <h4 className="text-[#000] text-[25px] font-semibold leading-[48px] mt-9 text-center md:text-start">John Doe</h4>
//                         <p className="text-[#6f6f6f] text-[20px] leading-[48px] text-center md:text-start">Dept manager</p>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-6 mt-[100px] md:mt-[150px]">
//                     {testimonialTag.map((t) =>
//                         <div className="flex justify-center items-center bg-[#FFF] rounded-[10px] py-3 px-7">
//                             <span className="mt-1 pr-3"><TestimonialTag /></span><p>{t}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Testimonial

"use client"
import Carousel from "react-elastic-carousel"
import TestimonialTag from "@modules/common/icons/testimonial"
import Image from "next/image"
import "styles/util.css"

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 4, itemsToScroll: 2 },
  { width: 768, itemsToShow: 6 },
  { width: 1200, itemsToShow: 6 },
]
const testimonialTag = [
  "athexa",
  "athexa",
  "athexa",
  "athexa",
  "athexa",
  "athexa",
  "athexa",
  "athexa",
]

const Testimonial = () => {
  const items = [
    {
      id: 1,
      imgUrl: "/testimonial.png",
      msg: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, Content here, content here",
      name: "John Doe",
      designation: "Dept manager",
    },
    {
      id: 2,
      imgUrl: "/testimonial.png",
      msg: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, Content here, content here",
      name: "John Doe",
      designation: "Dept manager",
    },
    {
      id: 3,
      imgUrl: "/testimonial.png",
      msg: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, Content here, content here",
      name: "John Doe",
      designation: "Dept manager",
    },
    {
      id: 4,
      imgUrl: "/testimonial.png",
      msg: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, Content here, content here",
      name: "John Doe",
      designation: "Dept manager",
    },
    {
      id: 5,
      imgUrl: "/testimonial.png",
      msg: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, Content here, content here",
      name: "John Doe",
      designation: "Dept manager",
    },
  ]

  return (
    <section className="mt-[120px] md:mx-[72px] md:px-14">
      <div className="content-container mb-14">
        <p className="text-[16px] text-[#000000] font-normal text-center">
          OUR CLIENTS SAY
        </p>
        <h2 className="text-[#000] text-[28px] md:text-[40px] font-semibold md:leading-[60px] mt-4 mb-14 text-center">
          Explore Customer feedback and what they say about us
        </h2>
        <p className="text-[16px] text-[#000000] font-normal text-center">
          {
            "Enter a world where our customers' stories come to life. Discover a rich collection of"
          }
          <strong> {"feedback, stories"}</strong> {", and "}
          <strong>{"insights"}</strong>{" "}
          {
            "that illuminate the essence of our brand. Your voice matters, and so does theirs"
          }{" "}
          <strong>– join us </strong> in the journey of{" "}
          <strong>{"shared experiences."}</strong>
        </p>
      </div>
      <Carousel
        isRTL={false}
        showArrows={false}
        enableAutoPlay={true}
        className="content-container"
      >
        {items.map((item) => {
          return (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-5">
              <div className="relative col-span-2">
                <Image
                  src={item.imgUrl}
                  width={400}
                  height={400}
                  alt="Testimonial"
                />
              </div>
              <div className="col-span-3 mt-10 md:pl-16">
                <p className="text-[#000] text-[16px] md:text-[25px] text-center md:text-start font-medium leading-9">
                  {item.msg}
                </p>
                <h4 className="text-[#000] text-[25px] font-semibold leading-[48px] mt-9 text-center md:text-start">
                  {item.name}
                </h4>
                <p className="text-[#6f6f6f] text-[20px] leading-[48px] text-center md:text-start">
                  {item.designation}
                </p>
              </div>
            </div>
          )
        })}
      </Carousel>
      {/* <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-6 mt-[100px] md:mt-[150px]"> */}
      <Carousel
        isRTL={false}
        breakPoints={[
          { width: 1, itemsToShow: 2 },
          { width: 550, itemsToShow: 4 },
          { width: 768, itemsToShow: 6 },
          { width: 1200, itemsToShow: 6 },
        ]}
        pagination={false}
        className="md:content-container mt-[100px] md:mt-[150px]"
      >
        {testimonialTag.map((t, index) => (
          <div
            key={index}
            className="flex justify-center items-center bg-[#FFF] rounded-[10px] py-3 px-7"
          >
            <span className="mt-1 pr-3">
              <TestimonialTag />
            </span>
            <p>{t}</p>
          </div>
        ))}
      </Carousel>
      {/* </div> */}
    </section>
  )
}

export default Testimonial
