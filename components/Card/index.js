import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css"
import cls from "classnames"
const Card = (props) => {
   return (
      <Link href={props.href}>
         <a className={styles.cardLink}>
            <div className={cls("glass",styles.container)}>
               <div className={styles.cardHeaderWrapper}>
                  <h3 className={styles.cardHeader}>{props.name}</h3>
               </div>
               <div className={styles.cardImageWrapper}>
                  <Image
                     className={styles.cardImage}
                     src={props.imgUrl}
                     width={260}
                     height={160}
                  />
               </div>
            </div>
         </a>
      </Link>
   );
};

export default Card;
