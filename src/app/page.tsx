import styles from './page.module.css';
import Banner from './component/banner';

const Hello = () =>{
    return <div className={styles.container}>
        
        

        <main>

        <h1>HEllo World!!</h1>

        <Banner/>

        </main>

        </div>
}

export default Hello;