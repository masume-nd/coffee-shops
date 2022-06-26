import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
        Coffee store page!{router.query.id}
        <Link href='/'><a>Back to home</a></Link>
    </div>
  );
}

export default CoffeeStore;
