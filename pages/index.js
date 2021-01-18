import Head from "next/head";
import Parser from "rss-parser";
import useSWR from "swr";

import styles from "../styles/Home.module.css";
import gaiaList from "../gaia.config";

async function feedFetch(...args) {
  const parser = new Parser();
  const feed = await parser.parseURL(...args);
  return feed;
}

function Feed({title,feed,initialData}) {
  const { data } = useSWR(
    feed,
    feedFetch,
    {
      initialData,
    }
  );

  if (!data) return <p>Loading</p>;

  return (
    <>
      <h2 className={styles.subtitle}>{title || data.title}</h2>
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

export default function Home({ gaiaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gaia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Gaia!</h1>
        {gaiaList.map(({title,feed,initialData}) => (
          <Feed initialData={initialData} title={title} feed={feed} key={title}/>
        ))}
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
  await Promise.all(
    gaiaList.map(async (feed,i) => {
	  let initialData = await feedFetch(feed.feed);
      gaiaList[i].initialData = initialData
    })
  );
  return {
    props: {
      gaiaList
    },
  };
}
