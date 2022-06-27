import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import Card from "../components/Card";
import coffeeStores from "../data/coffee-stores.json";
export default function Home() {
   const handleOnClick = () => {};
   return (
      <div className={styles.container}>
         <Head>
            <title>Coffee Connnoisseur</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            <Banner
               handleOnClick={handleOnClick}
               buttonText={"View stors nearby"}
            />
            <div className={styles.heroImage}>
               <Image
                  src="/static/undraw_coffee_with_friends_3cbj.svg"
                  width={650}
                  height={350}
               />
            </div>
            <div className={styles.cardLayout}>
               {coffeeStores.map((coffeeStore) => 
                  <Card
                     name={coffeeStore.name}
                     imgUrl={coffeeStore.imgUrl}
                     href={`/coffee-store/${coffeeStore.id}`}
                     className={styles.card}
                  />
               )}
            </div>
         </main>
      </div>
   );
}
