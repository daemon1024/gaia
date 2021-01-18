import Head from "next/head";
import styles from "../styles/Home.module.css";
import Parser from "rss-parser";
import useSWR from "swr";

async function feedFetch(...args) {
  const parser = new Parser();
  const feed = await parser.parseURL(...args);
  return feed;
}

function Feed({ initialData }) {
  const { data } = useSWR(
    "https://daemon1024.github.io/posts/index.xml",
    feedFetch,
    {
      initialData,
    }
  );

  if (!data) return <p>Loading</p>;

  return (
    <>
      <h2 className={styles.subtitle}>{data.title}</h2>
      <div className={styles.grid}>
        {data.items.map((item) => (
          <a href={item.link} className={styles.card} key={item.guid}>
            <h3>{item.title}</h3>
          </a>
        ))}
      </div>
    </>
  );
}

export default function Home({ initialData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gaia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Gaia!</h1>

        <Feed initialData={initialData} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const initialData = await feedFetch(
    "https://daemon1024.github.io/posts/index.xml"
  );
  return {
    props: {
      initialData,
    },
  };
}
