import Link from "next/link"

const index = () => {
  return (
    <>
      <div className="flex justify-center items-center h-36 bg-[url('/shop/1.png')]">
        <p className="self-center">
          <Link href="/"> Home page </Link> &gt; Return exchange Policy
        </p>
      </div>
      <div className="content-container mt-16 mb-24 space-y-4 md:px-40">
        <h1 className="text-[#000000] text-center text-[40px] font-semibold mb-16">
          Privacy exchange Policy
        </h1>
        <p className="text-[#000000] text-[16px] font-normal text-start">
        Welcome to Customz! We are thrilled to help you bring your personal style to life with our custom clothing. 
        Each piece is crafted specifically for you, according to your own designs.
        Please take a moment to familiarize yourself with our return policy:.
        </p>

    

        <>
          <h2 className="text-lg font-semibold">
            1. 	Returns for Defects: </h2>
          <p>
          We are committed to excellence and stand behind the quality of our products. 
          If you receive an item that has a defect in materials or craftsmanship, please let us know within 7 days of receiving your order.
          We will gladly assist you with a return and offer a full refund or a replacement, whichever you prefer.
          </p>
        </>

        <>
          <h2 className="text-lg font-semibold">2. 	Design Satisfaction: </h2>
          <p>
          As your personal designs are brought to life exactly as you envision them, we are unable to accept returns based on dissatisfaction with the design. 
          We encourage you to take your time and ensure your design is perfect before you place your order.
          </p>
        </>
        <>
          <h2 className="text-lg font-semibold">3. Exchange Policy</h2>
          <ul className="list-disc pl-4">
            <li className="ml-4">
              <strong>Premium Designs:</strong> Orders placed from our premium designs collection are eligible for exchanges.
               If you need to exchange an item from this collection, please contact our customer service for assistance.
            </li>
            <li className="ml-4">
              <strong>Custom Designs:</strong>  Due to the unique and personalized nature of custom-designed orders, we are unable to offer exchanges for these items.
               Each piece is crafted specifically for you, so please review your design carefully or consult with our customer service team before confirming your order
                to ensure it meets your expectations.
            </li>
            
          </ul>
        </>

        <>
          <h2 className="text-lg font-semibold">4. Cancellation:</h2>
          <p>Orders can only be cancelled within 24 hours of placement.</p>
        </>

        <>
        
          <p>
          Thank you for choosing Customz.
          We are here to help make your designs a reality and ensure you are delighted with your custom apparel. 
          If you have any questions, our customer service team is eager to assist you
          </p>
        </>
      </div>
    </>
  )
}

export default index
