
 import next from "next/types";
 import Image from 'next/image';


 const Card =  (props) =>{
    return <div>
        <h2>{props.name}</h2>;
        <Image src={props.imgUrl} alt="imahe" width={260} height={160}/>
    </div>
 }

 export default Card;