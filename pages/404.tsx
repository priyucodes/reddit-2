import { ChevronLeftOutline } from 'heroicons-react';
import Head from 'next/head';
import Link from 'next/link';

const PageNotFound = () => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] space-y-4">
      <Head>
        <title>Page Not Found</title>
      </Head>
      <h3 className="font-bold text-red-500 text-5xl">404- Page not found</h3>
      <div className="text-blue-400 underline cursor-pointer text-xl">
        <Link href="/">
          <p className="flex items-center">
            <ChevronLeftOutline className="w-6 h-6" />
            Go back where you came from
          </p>
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
