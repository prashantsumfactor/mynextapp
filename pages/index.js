import styles from '../styles/index.module.css';
import Banner from '../component/banner';
import Card from '../component/card';
import Head from 'next/head';
import Image from 'next/image';
import { fetchCoffeeStore } from '../lib/coffee-stores'
import useTrackLocartion from '../hooks/use-track-location'
import { useEffect, useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../pages/_app';


export async function getStaticProps(context) {
    const coffeeStores = await fetchCoffeeStore();
    return {
        props: { coffeeStores },
    }
}

export default function Home(props) {
    //console.log("props", props);
    // const { useEffect, useState, useContext } = React;

    const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocartion();

    // const [coffeeStores, setCoffeeStores] = useState('');
    const [coffeeStoresError, setCoffeeStoresError] = useState(null);
    const { dispatch, state } = useContext(StoreContext);
    const {coffeeStores, latLong} =state;

    useEffect(() => {
        async function fetchData() {
            if (latLong) {
                try {
                    console.log("latlongY",latLong);
                    const getCoffeeStore = await fetchCoffeeStore(latLong, 30);
                    console.log({ getCoffeeStore });
                    // setCoffeeStores(getCoffeeStore); // no need now
                    dispatch({
                        type: ACTION_TYPES.SET_COFFEE_STORES,
                        payload: { coffeeStores: getCoffeeStore, },
                    });
                }
                catch (error) {
                    console.log({ error });
                    setCoffeeStoresError(error.message);
                }
            }
        }
        fetchData();
    }, [latLong]);

    /*useEffect( async () => {
            if (latLong) {
                try {
                    const getCoffeeStore = await fetchCoffeeStore(latLong, 30);
                    console.log({ getCoffeeStore });
                }
                catch (error) {
                    console.log({ error });
                }
            }
      
    },[latLong]);*/

    const handleOnBannerBtnClick = () => {
        console.log('Hi, Button click event');
        handleTrackLocation();
    }

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
                    buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
                    handleOnClick={handleOnBannerBtnClick}
                />
                {locationErrorMsg && <p>Something went wrong : {locationErrorMsg}</p>}
                {coffeeStoresError && <p>Something went wrong : {coffeeStoresError}</p>}

                <div className={styles.heroImage}>
                    <Image
                        src="/hero-image.png"
                        alt="hero image"
                        height={400}
                        width={700}
                    />
                </div>

                {coffeeStores?.length > 0 &&
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Stores near me</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((coffeeStoreItem) => {
                                return (
                                    <Card
                                        key={coffeeStoreItem.id}
                                        name={coffeeStoreItem.name}
                                        imgUrl={coffeeStoreItem.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                                        href={`/CS/${coffeeStoreItem.id}`}
                                        className={styles.card} />
                                );
                            })}
                        </div>
                    </div>
                }

                {props.coffeeStores.length > 0 &&
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Toronto stores</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map((coffeeStore) => {
                                return (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                                        href={`/CS/${coffeeStore.id}`}
                                        className={styles.card} />
                                );
                            })}
                        </div>
                    </div>
                }
            </main>
        </div>
    );
}


// v - s11 start
// s - s9, 3 left
// a - s11 strt
// an- s10, 1 left
// r - s10