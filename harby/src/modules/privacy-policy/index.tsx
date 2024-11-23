import Link from "next/link"

const index = () => {
  return (
    <>
      <div className="flex justify-center items-center h-36 bg-[url('/shop/1.png')]">
        <p className="self-center">
          <Link href="/"> Home page </Link> &gt; Privacy and exchange Policy
        </p>
      </div>
      <div className="content-container mt-16 mb-24 space-y-4 md:px-40">
        <h1 className="text-[#000000] text-center text-[40px] font-semibold mb-16">
          Privacy and exchange Policy
        </h1>
        <p className="text-[#000000] text-[16px] font-normal text-start">
          Welcome to CustomZ! We are committed to protecting your privacy and
          ensuring that your personal information is handled safely and
          responsibly. This Privacy Policy outlines how we collect, use, and
          safeguard the information you provide while using our services.
        </p>

        <>
          <h2 className="text-lg font-semibold">1. Information Collection</h2>
          <ul className="list-disc pl-4">
            <li className="ml-4">
              <strong>Personal Information:</strong> We collect personal
              information when you register on our site, place an order,
              subscribe to our newsletter, or fill out a form. Information
              collected may include your name, email address, mailing address,
              phone number, and credit card information.
            </li>
            <li className="ml-4">
              <strong>Non-Personal Information:</strong> We may also collect
              non-personal information about your visit, including the pages you
              viewed, the links you clicked, and other actions taken within our
              services
            </li>
            <li className="ml-4">
              <strong>Customer Content:</strong> We allow users to upload images
              to customize their products. You are responsible for ensuring that
              you have the necessary rights to use and share all images you
              upload to our platform. CustomZ is not responsible for any
              copyright infringement related to images uploaded by users.
            </li>
          </ul>
        </>

        <>
          <h2 className="text-lg font-semibold">2. Use of Information</h2>
          <p>
            The information we collect may be used in one of the following ways:
          </p>
          <ul className="list-disc pl-4">
            <li className="ml-4"> To personalize your experience</li>
            <li className="ml-4"> To improve our website and services</li>
            <li className="ml-4"> To process transactions</li>
            <li className="ml-4">
              To send periodic emails with updates, promotions, and important
              service information.
            </li>
          </ul>
        </>

        <>
          <h2 className="text-lg font-semibold">3. Information Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information:
          </p>
          <ul className="list-disc pl-4">
            <li className="ml-4">Secure servers</li>
            <li className="ml-4">Encrypted data transfers</li>
            <li className="ml-4">Restricted access to personal information</li>
          </ul>
        </>

        <>
          <h2 className="text-lg font-semibold">
            4. Information Sharing and Disclosure
          </h2>
          <p>
            CustomZ does not sell, trade, or otherwise transfer to outside
            parties your personally identifiable information. This does not
            include trusted third parties who assist us in operating our
            website, conducting our business, or servicing you, so long as those
            parties agree to keep this information confidential.
          </p>
        </>

        <>
          <h2 className="text-lg font-semibold">5. Third-Party Links</h2>
          <p>
            Occasionally, at our discretion, we may include or offer third-party
            products or services on our website. These third-party sites have
            separate and independent privacy policies. We therefore have no
            responsibility or liability for the content and activities of these
            linked sites.
          </p>
        </>

        <>
          <h2 className="text-lg font-semibold">6. Your Consent</h2>
          <p>By using our site, you consent to our privacy policy.</p>
        </>

        <>
          <h2 className="text-lg font-semibold">
            7. Changes to our Privacy Policy
          </h2>
          <p>
            If we decide to change our privacy policy, we will post those
            changes on this page and/or update the Privacy Policy modification
            date above.
          </p>
        </>
      </div>
    </>
  )
}

export default index
