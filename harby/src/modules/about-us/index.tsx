import Image from "next/image"
import Link from "next/link"

import Partner from "./components/partner"

import john1 from "/public/contact/john1.png"
import john2 from "/public/contact/john2.png"
import john3 from "/public/contact/john3.png"
import john4 from "/public/contact/john4.png"

const list = [
  "Unleash Your Unique Style: Mix and match or go full custom to reflect your personal style with pieces that are trendy, comfortable, and distinctly yours",
  "Enjoy high-quality streetwear without the luxury markup. We provide exceptional value, ensuring premium materials and craftsmanship at pocket-friendly prices.",
  "Our fashion celebrates all sizes and styles, ensuring everyone can find their perfect fit.",
  "Utilize our intuitive online platform to easily design your dream wardrobe. Experiment with colors, patterns, and cuts with just a few clicks.",
  "Swift and top-notch delivery – because style waits for no one!",
  "Printing your favorite designs made easy and hassle-free.",
  "Have questions? Our dedicated support team is here to help you every step of the way.",
]

const fulfillment = [
  {
    img: "/contact/01.png",
    title: "Pick your canvas",
    desc: "Choose from our premium selection of t-shirts, each ready to be transformed into your personal canvas. Pick your favorite color and size, ensuring a perfect base for your design.",
  },
  {
    img: "/contact/02.png",
    title: "Create Your Masterpiece",
    desc: "Utilize our easy-to-navigate design tool to infuse your t-shirt with personal flair using custom fonts, colors, and graphics. Need inspiration? Our AI tool can generate ready-made, unique images tailored to fit your style preferences. Select an AI-generated design, adjust it to your liking, or combine it with your own images for a truly distinctive look",
  },
  {
    img: "/contact/03.png",
    title: "Leave the rest to us",
    desc: "Once you've crafted the perfect design, add it to your basket and checkout. We handle the precise printing and ensure rapid delivery. Prepare to be amazed by how quickly your personalized t-shirt arrives, ready for you to wear and share your story.",
  },
]

const index = () => {
  return (
    <div>
      <div className="content-container flex flex-col justify-center items-center py-20 bg-[url('/shop/1.png')]">
        <h2 className="text-[#48C0D0] text-center text-[24px] font-medium">
          {"Curious about our journey?"}
        </h2>
        <p className="md:w-2/3 text-center mt-5 leading-6">
          {`In 2024, CustomZ ignited a fashion revolution in Egypt with a simple yet powerful idea: wear your story. With the   cheerful invitation, “Design Your Story,” this lively platform transformed plain t-shirts into personal billboards of self-expression. It wasn’t just about fashion; it was about sharing who you are with the world. Every stitch offered a chance to shout out your passions, dreams, and heritage. Whether you’re navigating the energetic streets of Cairo or relaxing by the gentle Nile, CustomZ t-shirts remind everyone that your style is your story—colorful, unique, and wonderfully you.`}
        </p>
        <p className="md:w-2/3 text-center mt-5 leading-6">
          {`Customz website is owned by Ziad Mohamed Mohamed Ibrahim Abdullah with CR number 101204.`}
        </p>
      </div>

      <section className="relative grid grid-cols-1 md:grid-cols-2 mt-24">
        <div className="flex justify-center">
          <Image
            src={"/contact/t-shirt.png"}
            width={461}
            height={486}
            alt="contact us"
          />
        </div>
        <div className="content-container mt-12 md:mt-0">
          <p className="text-[#48C0D0] text-[16px] text-center md:text-start font-normal">
            {"WHAT WE DO"}
          </p>
          <h1 className="text-[#000000] text-3xl md:text-[40px] text-center md:text-start font-semibold mt-5">
            Craft Your Signature Look with Us
          </h1>
          <p className="text-[#000000] text-[16px] text-center md:text-start font-normal mt-4 mb-6">
            {`Welcome to a new era of streetwear where your vision becomes our blueprint.
             As a pioneering Egyptian brand, we blend cutting-edge fashion with an interactive design experience, allowing you
            to create or select garments that are as original as your fingerprint.`}
          </p>
          <h1 className="text-[#000000] text-3xl md:text-[40px] text-center md:text-start font-semibold mb-3">
            {"What We Promise"}
          </h1>
          <ul>
            {list.map((l, index) => (
              <div key={index} className="grid grid-cols-12 mb-5">
                <div className="col-span-1 mt-1">
                  <Image
                    src={"/contact/listIcon.png"}
                    width={20}
                    height={20}
                    alt="list icon"
                  />
                </div>
                <div className="col-span-11">
                  <li className="text-[#000000] text-[16px] font-normal leading-6">
                    {l}
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </section>
      {/* {"Printing Your Designs Journey"} */}
      <section className="content-container mt-36 text-center pb-16">
        <h1 className="text-[#000000] text-3xl md:text-[40px] font-semibold md:leading-[60px]">
          {"Embark on Your CustomZ T-Shirt Design Journey"} <br />{" "}
        </h1>
        <p className="text-[#434343] text-[16px] leading-6 mt-8 mb-16">
          {`Pick tool (printed or embroidered) - Pick color - Pick size (regular
          -oversize)-Create - Add to basket`}
        </p>
        <div className="flex flex-col md:flex-row justify-between">
          {fulfillment?.map((f, index) => (
            <div key={index} className="px-0 md:px-16 mt-8 md:mt-0">
              <Image
                src={f.img}
                width={50}
                height={50}
                alt=""
                className="mx-auto"
              />
              <h2 className="text-[#000000] text-[25px] font-semibold mt-2 mb-4">
                {f.title}
              </h2>
              <p className="text-[#434343] text-[16px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* <Partner /> */}

      {/* <section className="content-container mt-20 mb-24 text-center">
        <p className="text-[#48C0D0] text-[16px]">Our Team</p>
        <h1 className="text-[#000000] text-3xl md:text-[40px] font-semibold mt-2 md:mt-4 mb-6 md:mb-16">
          We are the best Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 content-center">
          <div className="flex flex-col items-center">
            <Image
              src={"/contact/john1.png"}
              width={284}
              height={315}
              alt="CustomZ team"
            />
            <h2 className="text-[#000000] text-[20px] font-medium mt-4">
              John Doe
            </h2>
            <p className="text-[#999999] text-[16px] font-normal">
              Product manager
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/contact/john2.png"}
              width={284}
              height={315}
              alt="CustomZ team"
            />
            <h2 className="text-[#000000] text-[20px] font-medium mt-4">
              John Doe
            </h2>
            <p className="text-[#999999] text-[16px] font-normal">
              Product manager
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/contact/john3.png"}
              width={284}
              height={315}
              alt="CustomZ team"
            />
            <h2 className="text-[#000000] text-[20px] font-medium mt-4">
              John Doe
            </h2>
            <p className="text-[#999999] text-[16px] font-normal">
              Product manager
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/contact/john4.png"}
              width={284}
              height={315}
              alt="CustomZ team"
            />
            <h2 className="text-[#000000] text-[20px] font-medium mt-4">
              John Doe
            </h2>
            <p className="text-[#999999] text-[16px] font-normal">
              Product manager
            </p>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default index
