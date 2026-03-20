import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  if (files.length === 0) {
    return [];
  }

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || "",
      tags: (data.tags as string[]) || [],
      publishedAt: (data.publishedAt as string) || "",
      readTime: (data.readTime as string) || "",
      content,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
