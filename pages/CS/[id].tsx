import { useRouter } from "next/router";
import Link from "next/link"
import Head from "next/head";
import coffeeStoresData from '../../data/coffee-stores.json';


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


const Coffee = (props) => {
    const router = useRouter();

    if(router.isFallback){
        return <div>Loading...</div>;
    }

    const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

    console.log("props", props);
    return <div>
        <Head>
            <title>{name}</title>
        </Head>
        
        <p>Coffee store page : {router.query.id}</p>

        <Link href="/"> back to parent </Link>
        <Link href="/CS/dynamic"> Move to next</Link>

        <p>{address}</p>
        <p>{name}</p>
        <p>{neighbourhood}</p>
    </div>;
};

export default Coffee;