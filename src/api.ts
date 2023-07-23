import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sync } from "glob";
import { get } from "http";

const POSTS_PATH = path.join(process.cwd(), "posts");

export const getSlugs = (): string[] => {
 const paths = sync(`${ POSTS_PATH }/*.mdx`);
 
 return paths.map(path => {
  
  const parts = path.split("/");
  const fileName = parts[parts.length -1];
  const [slug, _ext] = fileName.split(".");

  return slug;

 });
}

export function getAllPosts () {
  const posts = getSlugs().map(slug => getPostFromSlug(slug))
};

interface Post {
  content: string;
  meta: PostMeta,
}

export interface PostMeta {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  date: string;
}

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(POSTS_PATH, `${ slug }.mdx`);
  const source = fs.readFileSync(postPath);
  const {content, data} = matter (source);

  return {
    content,
    meta: {
      slug,
      description: data.description ?? "",
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
    },
  };
};

