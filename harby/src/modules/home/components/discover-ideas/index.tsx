"use client"
import Image from "next/image"
import { useState, useEffect } from "react"

const steps = [
  {
    step: "01",
    title: "Choose your material",
    desc: "Choose from various fabrics and materials tailored to your needs.",
    image: "/home/discover/step1.png",
    img: "/home/discover/st-1.png",
    img1: "/home/discover/stp-1.png",
  },
  {
    step: "02",
    title: "Design your custom style",
    desc: "Personalize with embroidery, prints, and more to bring your ideas to life.",
    image: "/home/discover/step2.png",
    img: "/home/discover/st-2.png",
    img2: "/home/discover/stp-2.png",
  },
  {
    step: "03",
    title: "Style your story at the back",
    desc: "Our team crafts your custom design to perfection, just the way you imagined.",
    image: "/home/discover/step3.png",
    img: "/home/discover/st-3.png",
    img3: "/home/discover/stp-3.png",
  },
]

const DiscoverIdeas = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isSliding, setIsSliding] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true)
      setTimeout(() => {
        setActiveStep((prevStep) => (prevStep + 1) % steps.length)
        setIsSliding(false)
      }, 1000) // Duration of sliding effect
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative">
      <div className="flex flex-col md:pl-11 h-full">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-md:w-[350px] text-center md:text-left pr-8">
            <h1 className="text-blue-dark text-2xl font-medium">
              Step {steps[activeStep].step}
              <span className="text-4xl">.</span>
            </h1>
            <h1 className="text-blue-dark xl:text-4xl lg:text-3xl  font-medium leading-tight">
              {steps[activeStep].title}
            </h1>
            <p className="text-base mt-2 my-4 ">{steps[activeStep].desc}</p>
            <button className="text-white text-lg bg-blue-dark w-40 h-11 mt-4 rounded-full">
              Continue
            </button>
          </div>
          <div className="relative max-md:w-[350px] max-md:mt-[50px] overflow-hidden">
            <div className="w-full h-4/5 relative">
              {/* Main Image remains static, hidden on md and up */}
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="step-img max-lg:hidden"
              />
              {/* Conditional images for md screens */}
              {activeStep === 0 && (
                <img
                  src={steps[activeStep].img1}
                  alt={`${steps[activeStep].title} alternative`}
                  className="lg:hidden block"
                />
              )}
              {activeStep === 1 && (
                <img
                  src={steps[activeStep].img2}
                  alt={`${steps[activeStep].title} alternative`}
                  className="lg:hidden block"
                />
              )}
              {activeStep === 2 && (
                <img
                  src={steps[activeStep].img3}
                  alt={`${steps[activeStep].title} alternative`}
                  className="lg:hidden block"
                />
              )}
              {/* Slider Image with sliding effect - visible only on lg and up */}
              <div className="hidden lg:block">
                <Image
                  src={steps[activeStep].img}
                  layout="intrinsic"
                  width={175}
                  height={170}
                  alt={steps[activeStep].title}
                  className={`absolute xl:top-72 lg:top-52 xl:right-9 right-0 transition-transform duration-1000 ease-in-out ${
                    isSliding
                      ? "transform -translate-x-full"
                      : "transform translate-x-0"
                  }`}
                />
                {/* <img src={steps[activeStep].img} alt={steps[activeStep].title} className={` animated-img absolute top-64 right-0 transition-transform duration-1000 ease-in-out ${isSliding ? 'transform -translate-x-full' : 'transform translate-x-0'}`} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverIdeas
