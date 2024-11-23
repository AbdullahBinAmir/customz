// import UnderlineLink from "@modules/common/components/underline-link"
// import ArrowLeft from "@modules/common/icons/arrow-left"
// import ArrowRight from "@modules/common/icons/arrow-right"
// import Link from "next/link"

// const Slug = ({ params }: { params: { slug: string } }) => {
//   // URL-encoded text
//   var urlEncodedText = params.slug

//   // Decoding the URL-encoded text
//   var decodedText = decodeURIComponent(urlEncodedText)

//   // Removing "Tip" from the decoded text
//   var title = decodedText.replace("", "")

//

//   return (
//     <div
//       style={{
//         width: "50%",
//         margin: "auto",
//         marginTop: "4rem",
//         marginBottom: "4rem",
//       }}
//     >
//       <Link href="/blog">
//         {" "}
//         <ArrowLeft className="mb-5" />{" "}
//       </Link>
//       <h2 className="text-[26px] mb-3 font-semibold">{title}</h2>
//       <p className="text-sm text-gray-500">
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry&apos;s standard dummy text
//         ever since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book. It has survived not only five
//         centuries, but also the leap into electronic typesetting, remaining
//         essentially unchanged. It was popularised in the 1960s with the release
//         of Letraset sheets containing Lorem Ipsum passages, and more recently
//         with desktop publishing software like Aldus PageMaker including versions
//         of Lorem Ipsum.
//         <pre className="mt-2" />
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry&apos;s standard dummy text
//         ever since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book. It has survived not only five
//         centuries, but also the leap into electronic typesetting, remaining
//         essentially unchanged. It was popularised in the 1960s with the release
//         of Letraset sheets containing Lorem Ipsum passages, and more recently
//         with desktop publishing software like Aldus PageMaker including versions
//         of Lorem Ipsum.
//         <pre className="mt-2" />
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry. Lorem Ipsum has been the industry&apos;s standard dummy text
//         ever since the 1500s, when an unknown printer took a galley of type and
//         scrambled it to make a type specimen book. It has survived not only five
//         centuries, but also the leap into electronic typesetting, remaining
//         essentially unchanged. It was popularised in the 1960s with the release
//         of Letraset sheets containing Lorem Ipsum passages, and more recently
//         with desktop publishing software like Aldus PageMaker including versions
//         of Lorem Ipsum.
//       </p>
//     </div>
//   )
// }

// export default Slug

import fs from "fs"
import Markdown from "markdown-to-jsx"
import matter from "gray-matter"
import getPostMetadata from "@modules/blog/components/grtBlogMetadata"
import Link from "next/link"
import ArrowLeft from "@modules/common/icons/arrow-left"

const getPostContent = (slug: string) => {
  const folder = "blogs/"
  const file = `${folder}${slug}.md`
  const content = fs.readFileSync(file, "utf8")
  const matterResult = matter(content)
  return matterResult
}

export const generateStaticParams = async () => {
  const blogs = getPostMetadata()
  return blogs.map((post) => ({
    slug: post.slug,
  }))
}

const PostPage = (props: any) => {
  const slug = props.params.slug
  const post = getPostContent(slug)
  return (
    <div
      className="w-2/3 mx-auto my-16"
      // style={{
      //   width: "50%",
      //   margin: "auto",
      //   marginTop: "4rem",
      //   marginBottom: "4rem",
      // }}
    >
      <Link href="/blog">
        <ArrowLeft className="mb-5" />{" "}
      </Link>
      <div className="mt-6 mb-10">
        <p className="text-slate-400 mt-2">{post.data.date}</p>
        <h1 style={{ fontSize: "32px" }}>{post.data.title}</h1>
      </div>
      <div>
        {/* <div dangerouslySetInnerHTML={{ __html: post.content }}></div> */}
      </div>
      <article className="prose">
        <Markdown>{post.content}</Markdown>
      </article>

      {/* <Markdown options={{ wrapper: "article" }}>{post.content}</Markdown> */}
    </div>
  )
}

export default PostPage
