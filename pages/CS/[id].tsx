import { useRouter } from "next/router";
import Link from "next/link"
import coffeeStoresData from '../../data/coffee-stores.json';


export function getStaticProps(staticProps) {
    const params = staticProps.params;
    return {
        props: {
            coffeeStore: coffeeStoresData.find(coffeeStore => {
                return coffeeStore.id.toString() === params.id;// dynamic id
            }),
        },
    };
}

export function getStaticPaths() {
    return {
        paths: [
            { params: { id: "0" } },
            { params: { id: "1" } },
            { params: { id: "2" } }
        ],
        fallback :false,
    };
}


const Coffee = (props) => {
    const router = useRouter();
    console.log("props", props);
    return <div>Coffee store page : {router.query.id}
        <Link href="/"> back to parent </Link>
        <Link href="/CS/dynamic"> Move to next</Link>


        <p>{props.coffeeStore.address}</p>
        <p>{props.coffeeStore.name}</p>
    </div>;
};

export default Coffee;