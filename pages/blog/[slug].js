import path from "path";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import "katex/dist/katex.min.css";

import Layout from "../../components/Layout";
import PostContent from "../../components/PostContent";
import PostHeader from "../../components/PostHeader";
import PostMeta from "../../components/PostMeta";

import { MDXRemote } from "next-mdx-remote";
import { InlineMath, BlockMath } from "react-katex";
import DiscordHighlight from "../../components/DiscordHighlight";
import DiscordMessage from "../../components/DiscordMessage";
import PostImage from "../../components/PostImage";

export const getStaticPaths = async () => {
  const paths = fs
    .readdirSync(path.join(process.cwd(), "content/blog"))
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const blogPostPath = path.join(
    path.join(process.cwd(), "content/blog"),
    `${params.slug}.mdx`
  );
  const source = fs.readFileSync(blogPostPath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

const components = {
  InlineMath,
  BlockMath,
  DiscordHighlight,
  DiscordMessage,
  PostImage,
};

export default function BlogSlug({ source, frontMatter }) {
  return (
    <Layout>
      <div className="postgrid">
        <div className="content">
          <PostHeader
            title={frontMatter.title}
            subtitle={frontMatter.description}
          />
          <PostContent>
            <MDXRemote {...source} components={components} />
          </PostContent>
        </div>
        <PostMeta
          cover={frontMatter.cover}
          date={dayjs(Number(frontMatter.date)).format("D MMMM, YYYY")}
          authors={frontMatter.authors}
          category={frontMatter.category}
          tags={frontMatter.tags}
        />
      </div>
      <style jsx>{`
        .postgrid {
          display: grid;
          grid-template-columns: 1fr 7.5vw 1fr;
        }
        .content {
          display: flex;
          flex-direction: column;
          gap: 3vh;
          grid-column: 1 / 3;
        }
        @media (max-width: 875px) {
          .postgrid {
            display: flex;
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </Layout>
  );
}
