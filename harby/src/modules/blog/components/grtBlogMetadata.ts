import fs from "fs"
import { PostMetadata } from "./BlogMetadata"
import matter from "gray-matter"
// import { PostMetadata } from "../components/PostMetadata"

const getPostMetadata = (): PostMetadata[] => {
  const folder = "blogs/"
  const files = fs.readdirSync(folder)
  const markdownPosts = files.filter((file) => file.endsWith(".md"))

  // Get gray-matter data from each file.
  const blogs = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`blogs/${fileName}`, "utf8")
    const matterResult = matter(fileContents)
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace(".md", ""),
      desc: matterResult.data.desc,
      coverImage: matterResult.data.coverImage,
    }
  })

  return blogs
}

export default getPostMetadata
