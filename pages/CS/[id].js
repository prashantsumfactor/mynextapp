import { useRouter } from "next/router";
import Link from "next/link"
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStore } from '../../lib/coffee-stores'
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context";
import { isEmpty, fetcher } from '../../utils/index';
import useSWR from "swr";

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    const coffeeStores = await fetchCoffeeStore();

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

const Coffee = (initialProps) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    const pageId = router.query.id;
    const [getCoffeeStore, setCoffeeStores] = useState(initialProps.coffeeStore)
    const { state: { coffeeStores } } = useContext(StoreContext);
    const handleCreateCoffeeStore = async (coffeeData) => {
        try {
            const { id, name, address, neighbourhood, voting, imgUrl } = coffeeData;
            const response = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting: 0,
                    imgUrl,
                    neighbourhood: neighbourhood || "",
                    address: address || "",
                }),
            });
            const dbCoffeeStore = response.json();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const coffeeStoreFromContext = coffeeStores.find(coffeeStore => {
                    return coffeeStore.id.toString() === pageId;
                });
                if (coffeeStoreFromContext) {
                    setCoffeeStores(coffeeStoreFromContext);
                    handleCreateCoffeeStore(coffeeStoreFromContext);
                }
            }
        } else {
            // SSG
            handleCreateCoffeeStore(initialProps.coffeeStore);
        }
    }, [pageId, initialProps, initialProps.coffeeStore]);

    const { name, address, neighbourhood, imgUrl } = getCoffeeStore;
    const [votingCount, setVotingCount] = useState(0);

    const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${pageId}`, fetcher);

    useEffect(() => {
        if (data && data.length > 0) {
            setVotingCount(data[0].voting)
            setCoffeeStores(data[0]);
        }
    }, [data])
    if (error) {
        return <div>Something went wrong retrieving coffee store page</div>;
    }

    const handleUpvoteButton = async () => {
        try {
            const response = await fetch("/api/favouriteCoffeeStoreById", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pageId,
                }),
            });
            const updateCoffeeStore =await response.json();
            if(updateCoffeeStore && updateCoffeeStore.length>0){
                let count = votingCount + 1;
                setVotingCount(count);
            }
        } catch (err) {
            console.error('Error upvoting the coffee store', err);
        }
    };

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
                    <p className={styles.text}>{votingCount}</p>
                </div>

                <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
                    Up vote!
                </button>
            </div>
        </div>

    </div>;
};

export default Coffee;