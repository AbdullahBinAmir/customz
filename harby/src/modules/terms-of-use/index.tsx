import Link from "next/link"

const index = () => {
  return (
    <>
      <div className="flex justify-center items-center h-36 bg-[url('/shop/1&#46;png')]">
        <p className="self-center">
          <Link href="/"> Home page </Link> &gt; Terms of use
        </p>
      </div>
      <div className="content-container text-center mt-16 mb-24 md:px-40">
        <h1 className="text-[#000000] text-[40px] font-semibold mb-16">
          Terms of use
        </h1>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Acceptance of Terms By using this site&#44; you acknowledge and agree
          to comply with all terms and conditions set forth herein&#46; If you
          do not agree with these terms&#44; please refrain from using the
          site&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Intellectual Property All content available on this site&#44;
          including texts&#44; graphics&#44; images&#44; and logos&#44; is
          protected under copyright and other intellectual property laws&#46; No
          part of this site may be copied or redistributed without prior written
          permission from the site owner&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Legitimate Use You are permitted to use this site for educational and
          personal purposes only&#46; The use of the site for any illegal or
          unethical purpose&#44; including fraud or infringement of the rights
          of others&#44; is prohibited&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          External Links The site may contain links to external websites&#46; We
          are not responsible for the content or practices of these sites&#46;
          Links are provided for your convenience only&#44; and you should
          review the terms and conditions of these sites before using them&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Content Updates We reserve the right to modify or update the content
          on the site at any time without prior notice&#46; We recommend
          reviewing these terms periodically to ensure you are aware of the
          latest changes&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Disclaimer The information available on this site is provided &#34;as
          is&#34; without any warranties&#44; either express or implied&#46; We
          do not assume any responsibility for the accuracy or completeness of
          the information available on the site&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Limitation of Liability We will not be liable for any direct or
          indirect damages arising from the use of the site&#44; including but
          not limited to loss of data or profits&#44; even if we have been
          informed of the possibility of such damages&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Applicable Laws These terms and conditions are governed by and
          construed in accordance with the laws in force in the Arab Republic of
          Egypt&#46; Any dispute arising from these terms shall be resolved in
          the Egyptian courts&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Amendments to the Terms We reserve the right to amend these terms and
          conditions at any time&#46; Any amendment becomes effective
          immediately upon its posting on the site&#46; Your continued use of
          the site after such postings constitutes your acceptance of these
          changes&#46;
        </p>
        <p className="text-[#000000] text-[16px] font-normal mb-6 text-start">
          Contact Us If you have any inquiries regarding these terms and
          conditions&#44; you can contact us&#46;
        </p>
      </div>
    </>
  )
}

export default index
