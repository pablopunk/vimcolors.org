import { MdOutlineArticle } from "react-icons/md";
import classNames from "classnames";

const articles = [
  {
    title: "I made a macOS app for the ultimate window management",
    author: "@pablopunk",
    date: "December 2023",
    url: "https://pablopunk.com/posts/i-made-a-macos-app-for-the-ultimate-window-management",
  },
  {
    title:
      "I told ChatGPT to create a passive store and now I don't code anymore",
    author: "@pablopunk",
    date: "March 2023",
    url: "https://pablopunk.com/posts/i-told-chatgpt-to-create-a-passive-store-and-now-i-don-t-code-anymore",
  },
  {
    title: "How to create a real-time UI with NextJS and Supabase",
    author: "@pablopunk",
    date: "August 2021",
    url: "https://pablopunk.com/posts/how-to-create-a-real-time-ui-with-nextjs-and-supabase",
  },
];

export const RelatedContent = () => (
  <section className="border-l pl-4">
    <h2 className="capitalize text-xl text-accent mb-4">related content</h2>
    {articles.map((article, index) => (
      <article key={article.url} className="border p-4 rounded-lg mb-4">
        <a
          href={article.url}
          className={classNames("transition-colors hover:text-accent", {
            "text-accent-alt": index === 0,
          })}
        >
          <h3>
            <MdOutlineArticle className="inline mb-1 mr-2" size={20} />
            {article.title}
          </h3>
        </a>
        <div className="opacity-50 text-xs mt-1">
          by {article.author} on {article.date}
        </div>
      </article>
    ))}
  </section>
);
