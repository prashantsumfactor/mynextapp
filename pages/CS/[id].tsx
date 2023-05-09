import { useRouter } from "next/router";
import Link from "next/link"

const Coffee = () => {
    const router = useRouter();
    console.log("router",router);
    return <div>Coffee store page : {router.query.id} 
        <Link href="/"> back to parent </Link>
        <Link href="/CS/dynamic"> Move to next</Link>
    </div>;
};

export default Coffee;