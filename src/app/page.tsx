import styles from './page.module.css';
import Banner from './component/banner';
import Head from 'next/head';
import exp from 'constants';


export default function Home() {
  return (
    <div className={styles.container}>
    <Head>
      <title>Coffee Connoisseur App</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="allows you to discover coffee stores"
      />
    </Head>

    <main className={styles.main}>
      <Banner/>

      </main>
      </div>

  );
}