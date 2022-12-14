import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import Card from "../components/Card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export async function getStaticProps(context) {
   const coffeeStores = await fetchCoffeeStores();

   return {
      props: {
         coffeeStores,
      },
   };
}

export default function Home(props) {
   // const [coffeeShops, setCoffeeShops] = useState("");
   const [error, setError] = useState(null);
   const { dispatch, state } = useContext(StoreContext);

   const { coffeeShops, latLong } = state;
   const { handleTrackLocation, locationErrorMsg } = useTrackLocation();

   const handleOnClick = () => {
      handleTrackLocation();
   };
   const myFunction = async () => {
      if (latLong) {
         try {
            // setCoffeeShops(fetchedCoffeeStores);
            const fetchedCoffeeStores = await fetch(
               `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
            );
            const coffeeShops = await fetchedCoffeeStores.json();
            dispatch({
               type: ACTION_TYPES.SET_COFFEE_SHOPS,
               payload: { coffeeShops },
            });
            setError("")
         } catch (err) {
            setError(err.message);
            console.log(error);
         }
      }
   };
   useEffect(() => {
      myFunction();
   }, [latLong]);
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
            {locationErrorMsg && <p>Somthing went wrong: {locationErrorMsg}</p>}
            {error && <p>Somthing went wrong: {error}</p>}

            <div className={styles.heroImage}>
               <Image
                  src="/static/undraw_coffee_with_friends_3cbj.svg"
                  width={650}
                  height={350}
               />
            </div>
            {coffeeShops.length > 0 && (
               <div className={styles.cartContainer}>
                  <h2 className={styles.heading2}>Coffee Shops near me</h2>
                  <div className={styles.cardLayout}>
                     {coffeeShops.map((coffeeStore) => {
                        return (
                           <Card
                              key={coffeeStore.fsq_id}
                              name={coffeeStore.name}
                              imgUrl={
                                 coffeeStore.imgUrl ||
                                 "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                              }
                              href={`/coffee-store/${coffeeStore.fsq_id}`}
                              className={styles.card}
                           />
                        );
                     })}
                  </div>
               </div>
            )}
            {props.coffeeStores.length > 0 && (
               <div className={styles.cartContainer}>
                  <h2 className={styles.heading2}>Toronto stores</h2>
                  <div className={styles.cardLayout}>
                     {props.coffeeStores.map((coffeeStore) => {
                        return (
                           <Card
                              key={coffeeStore.fsq_id}
                              name={coffeeStore.name}
                              imgUrl={
                                 coffeeStore.imgUrl ||
                                 "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                              }
                              href={`/coffee-store/${coffeeStore.fsq_id}`}
                              className={styles.card}
                           />
                        );
                     })}
                  </div>
               </div>
            )}
         </main>
      </div>
   );
}
