import ArrowRight from "@modules/common/icons/arrow-right"
import Image from "next/image"
import Link from "next/link"
import getPostMetadata from "./components/grtBlogMetadata"

const recentBlogPost = [
  {
    title: "Tip to Find Best Print on Demand Business Name Ideas",
    imgUrl: "/home/print-category/1.png",
    date: "fabruary 7, 2023",
  },
  {
    title: "Tip to Find Best Print on Demand Business Name Ideas",
    imgUrl: "/home/print-category/2.png",
    date: "fabruary 7, 2023",
  },
  {
    title: "Tip to Find Best Print on Demand Business Name Ideas",
    imgUrl: "/home/print-category/3.png",
    date: "fabruary 7, 2023",
  },
  {
    title: "Tip to Find Best Print on Demand Business Name Ideas",
    imgUrl: "/home/print-category/2.png",
    date: "fabruary 7, 2023",
  },
]

const blogCategoryList = [
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
  "Lorem ipsum",
]

const Blog = () => {
  const postMetadata = getPostMetadata()

  return (
    <>
      <div className="flex justify-center items-center h-36 bg-[url('/shop/1.png')]">
        <p className="self-center">
          <Link href="/"> Home page </Link> &gt; Blog
        </p>
      </div>
      <div className="md:flex flex-row content-container md:px-20 my-24">
        <div className="basis-2/3">
          {/* {blogs.map((b, i) => ( */}
          {postMetadata.map((b, i) => (
            <div key={i} className="md:flex w-full mb-20">
              <div className="basis-full md:basis-1/2 relative">
                <Image
                  src={b.coverImage}
                  // width={461}
                  // height={312}
                  fill
                  sizes="60vw"
                  alt="blog image"
                  className="rounded-[20px]"
                />
              </div>
              <div className="basis-full md:basis-1/2 md:ml-11 md:mr-3">
                <p className="text-[16px] text-[#000000] font-semibold mt-5">
                  {/* CustomZ */}
                  {b.date}
                </p>
                <h3 className="text-[25px] text-[#000000] font-normal mt-2">
                  {b.title}
                </h3>
                <p className="text-[16px] text-[#6F6F6F] font-normal mt-4 mb-5">
                  {b.desc}
                </p>
                <Link
                  href={`/blog/${b.slug}`}
                  className="transition-all duration-300 group hover:pl-4 hover:pr-1"
                >
                  <button className="flex items-center text-[16px] font-semibold">
                    <span className="pr-2">See More</span>{" "}
                    <ArrowRight className="transition-all group-hover:ml-2 duration-300" />
                  </button>
                </Link>
                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block basis-1/3">
          <div className="bg-white  py-6 pl-5 rounded-[20px]">
            <h2 className="text-[25px] text-[#000000] font-semibold mb-6">
              Category
            </h2>
            {blogCategoryList.map((c, index) => (
              <Link key={index} href="/blog">
                <p className="text-[16px] text-[#000000] font-normal mt-3">
                  {c}
                </p>
              </Link>
            ))}
          </div>
          <div className="bg-white  py-6 pl-5 rounded-[20px] mt-14">
            <h2 className="text-[25px] text-[#000000] font-semibold mb-6">
              Recent Posts
            </h2>
            {recentBlogPost.map((c, index) => (
              <Link key={index} href="/blog">
                <div className="flex mt-4">
                  <Image
                    src={c.imgUrl}
                    width={65}
                    height={50}
                    alt="recent posts"
                  />
                  <div className="px-3">
                    <p className="text-[12px] text-[#7d7d7d] font-medium uppercase">
                      {c.date}
                    </p>
                    <p className="text-[16px] text-[#000000] font-bold leading-5 mt-1">
                      {c.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog
