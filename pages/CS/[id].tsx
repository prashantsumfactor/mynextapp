import { useRouter } from "next/router";

const Coffee = () => {
    const router = useRouter();
    console.log("router",router);
    return <div>Coffee store page</div>;
}

export default Coffee;