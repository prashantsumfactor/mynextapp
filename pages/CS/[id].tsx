import { useRouter } from "next/router";
import Link from "next/link"
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import coffeeStoresData from '../../data/coffee-stores.json';
import styles from '../../styles/coffee-store.module.css';


export function getStaticProps(staticProps) {

    const params = staticProps.params;
    return {
        props: {
            coffeeStore: coffeeStoresData.find(coffeeStore => {
                return coffeeStore.id.toString() === params.id; // dynamic id
            }),
        },
    };
}

export function getStaticPaths() {

    const paths = coffeeStoresData.map((coffeeStore) => {
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

function handleUpvoteButton(){

}


const Coffee = (props) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

    console.log("props", props);
    return <div className={styles.layout}>
        <Head>
            <title>{name}</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.col1}>
                <div className={styles.backToHomeLink}>
                    <Link href="/">Back to Home</Link>
                </div>

                <div className={styles.nameWrapper}>
                    <p className={styles.name}>{name}</p>
                </div>

                <Image
                    src={imgUrl}
                    alt={name}
                    height="160"
                    width="400"
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