import styles from '../styles/index.module.css';
import Banner from '../component/banner';
import Card from '../component/card';
import Head from 'next/head';
import Image from 'next/image';
import coffeeStoresData from '../data/coffee-stores.json';

const handleOnBannerBtnClick = () => {
    console.log('Button click event');
}

export async function getStaticProps(context) {
    return {
        props: { coffeeStores : coffeeStoresData, },
    }
}

export default function Home(props) {
    console.log("props", props);
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


                <div className={styles.heroImage}>
                    <Image
                        src="/hero-image.png"
                        alt="hero image"
                        height={400}
                        width={700}
                    />
                </div>

                {props.coffeeStores.length > 0 &&
                    <>
                        <h2 className={styles.heading2}>Toronto stores</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map((coffeeStore) => {
                                return (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl}
                                        href={`/CS/${coffeeStore.id}`}
                                        className={styles.card} />
                                );
                            })}
                        </div>
                    </>
                }
            </main>
        </div>
    );
}

