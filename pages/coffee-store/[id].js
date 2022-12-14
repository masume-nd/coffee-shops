import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Coffee-style.module.css";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";


export async function getStaticProps(staticProps) {
   const params = staticProps.params;
   const coffeeStores = await fetchCoffeeStores();
   const findCoffeeStoresById = coffeeStores.find((coffeeStore) => {
      return coffeeStore.fsq_id.toString() === params.id;
   });
   return {
      props: {
         coffeeStore: findCoffeeStoresById ? findCoffeeStoresById : {},
      },
   };
}

export async function getStaticPaths() {
   const coffeeStores = await fetchCoffeeStores();
   const paths = coffeeStores.map((coffeeStore) => {
      return {
         params: {
            id: coffeeStore.fsq_id.toString(),
         },
      };
   });
   return {
      paths,
      fallback: true,
   };
}

const CoffeeStore = (initialProps) => {
   const router = useRouter();
   if (router.isFallback) {
      return <div>Loading...</div>;
   }

   const id = router.query.id;

   const [coffeeshop, setCoffeeShop] = useState(initialProps.coffeeStore);

   const {
      state: { coffeeShops },
   } = useContext(StoreContext);

   useEffect(() => {
      if (isEmpty(initialProps.coffeeStore)) {
         if (coffeeShops.length > 0) {
            const findCoffeeStoresById = coffeeShops.find((coffeeShop) => {
               return coffeeShop.fsq_id.toString() === id;
            });
            setCoffeeShop(findCoffeeStoresById);
         }
      }
   }, [id]);

   const { location, name, address, imgUrl } = coffeeshop;

   const handleUpvoteButton = () => {};
   return (
      <div className={styles.layout}>
         <Head>
            <title>{name}</title>
         </Head>
         <div className={styles.container}>
            <div className={styles.col1}>
               <div className={styles.backToHomeLink}>
                  <Link href="/">
                     <a>&#11013; Back to home</a>
                  </Link>
               </div>
               <div className={styles.nameWrapper}>
                  <h1 className={styles.name}>{name}</h1>
               </div>
               <Image
                  src={
                     imgUrl ||
                     "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                  width={600}
                  height={360}
                  className={styles.storeImg}
                  alt={name}
               />
            </div>
            <div className={cls("glass", styles.col2)}>
               <div className={styles.iconWrapper}>
                  {/* <Image className={styles.icons} src="/static/icons/map.svg" width="24" height="24" /> */}
                  <p className={styles.text}>
                     {location?.formatted_address || location?.address}
                  </p>
               </div>
               <div className={styles.iconWrapper}>
                  {/* <Image src="/static/icons/star.svg" width="24" height="24" /> */}
                  <p className={styles.text}>{1}</p>
               </div>
               <button
                  className={styles.upVoteButton}
                  onClick={handleUpvoteButton}
               >
                  Up Vote!
               </button>
            </div>
         </div>
      </div>
   );
};

export default CoffeeStore;
