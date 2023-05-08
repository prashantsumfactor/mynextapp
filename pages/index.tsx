import styles from '../styles/index.module.css';
import Banner from '../component/banner';
import Head from 'next/head';

const handleOnBannerBtnClick = () => {
    console.log('Button click event');
}

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="allows you to discover coffee stores"
                />
            </Head>

            <main className={styles.main}>
                <Banner
                    buttonText={false ? "Locating..." : "View stores nearby"}
                    handleOnClick={handleOnBannerBtnClick}
                />
            </main>
        </div>
    );
}

