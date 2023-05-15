import styles from '../styles/index.module.css';
import Banner from '../component/banner';
import Card from '../component/card';
import Head from 'next/head';
import Image from 'next/image';
import coffeeStoresData from '../data/coffee-stores.json';

// Foursquare key : fsq32AWsFe3xYJbLJemwMxNS7RD9dSRsB6FAO+3bxQ37VQE=

const handleOnBannerBtnClick = () => {
    console.log('Button click event');
}

export async function getStaticProps(context) {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq32AWsFe3xYJbLJemwMxNS7RD9dSRsB6FAO+3bxQ37VQE='
        }
      };
      
    const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee-store&ll=43.653833032607096%2C-79.37896808855945&limit=6', options);
    const data = await response.json();

    console.log("data_res",data.results);

    return {
        props: { coffeeStores : data.results, },
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
                                        key={coffeeStore.fsq_id}
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
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

