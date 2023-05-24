import { useRouter } from "next/router";
import Link from "next/link"
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStore } from '../../lib/coffee-stores'
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from '../../utils/index';

export async function getStaticProps(staticProps) {

    const params = staticProps.params;
    const coffeeStores = await fetchCoffeeStore();
    console.log("param_id", params);

    const findCoffeeStoreByID = coffeeStores.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id;
    });

    return {
        props: {
            coffeeStore: findCoffeeStoreByID ? findCoffeeStoreByID : {},
        },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStore();
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            },
        };
    });

    return {
        paths,
        fallback: true,
    };
}

function handleUpvoteButton() {

}


const Coffee = (initialProps) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    const pageId = router.query.id;

    const [getCoffeeStore, setCoffeeStores] = useState(initialProps.coffeeStore)

    const { state: { coffeeStores } } = useContext(StoreContext);

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const findCoffeeStoreByID = coffeeStores.find(coffeeStore => {
                    return coffeeStore.id.toString() === pageId;
                });
                setCoffeeStores(findCoffeeStoreByID);
            }
        }
    }, [pageId]);

    const { name, address, neighbourhood, imgUrl } = getCoffeeStore;
    console.log("props", initialProps);
    return <div className={styles.layout}>
        <Head>
            <title>{name}</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.col1}>
                <div className={styles.backToHomeLink}>
                    <Link href="/">← Back to Home</Link>
                </div>

                <div className={styles.nameWrapper}>
                    <p className={styles.name}>{name}</p>
                </div>

                <Image
                    src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                    alt={name}
                    width={600}
                    height={360}
                    className={styles.storeImg}
                />
            </div>

            <div className={cls("glass", styles.col2)}>
                {address && (
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/icons/places.svg"
                            width="24"
                            height="24"
                            alt="places icon"
                        />
                        <p className={styles.text}>{address}</p>
                    </div>
                )}
                {neighbourhood && (
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/icons/nearMe.svg"
                            width="24"
                            height="24"
                            alt="near me icon"
                        />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                )}
                <div className={styles.iconWrapper}>
                    <Image
                        src="/icons/star.svg"
                        width="24"
                        height="24"
                        alt="star icon"
                    />
                    <p className={styles.text}>{3}</p>
                </div>

                <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
                    Up vote!
                </button>
            </div>
        </div>

    </div>;
};

export default Coffee;