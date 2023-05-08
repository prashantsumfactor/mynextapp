import { useRouter } from "next/router";


const Dy = () => {
    const router = useRouter();
    console.log("router1",router);
    return <div>this is dynamic route from base</div>;
};

export default Dy;