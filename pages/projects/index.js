import Layout from "../../components/Layout";
import Image from "next/image";

const importPosts = async () => {
  const markdownFiles = require
    .context("../../content/projects", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../../content/projects/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export async function getStaticProps() {
  const postsList = await importPosts();

  return {
    props: {
      postsList,
    },
  };
}

export default function ProjectsIndex({ postsList }) {
  return (
    <Layout>
      <div>
        <h1>Projects Index</h1>
      </div>
    </Layout>
  );
}