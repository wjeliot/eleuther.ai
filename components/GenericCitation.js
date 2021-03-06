import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function GenericCitation(data) {
  const router = useRouter();
  return (
    <div className="citation">
      <p className="block">
        @misc&#123;
        {data.frontmatter.shortTitle ||
          data.frontmatter.title.substring(
            0,
            data.frontmatter.title.indexOf(" ")
          ) ||
          "article"}
        , title = &#123;{data.frontmatter.title}&#125;, author = &#123;
        {data.frontmatter.authorList ||
          data.frontmatter.authors?.map(
            (author, index) =>
              author.split(" ")[1] +
              ", " +
              author.split(" ")[0] +
              (data.frontmatter.authors.length > 1
                ? index === data.frontmatter.authors.length - 2
                  ? ", and "
                  : "; "
                : "")
          ) ||
          "Eleuther AI"}
        &#125;, howpublished = \url&#123;
        {data.frontmatter.publicationUrl ||
          `https://eleuther.ai
        {router.asPath}`}
        &#125;, note = &#123;[Online; accessed {dayjs().format("DD MMM, YYYY")}
        ]&#125;, year = &#123;2021&#125;&#125;
      </p>
      <style jsx>{`
        .citation {
          background-color: black;
          color: white;
          padding: 2.5vh 2.5vw;
          border-radius: 0.5rem;
        }
        .block {
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}
