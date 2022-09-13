import Image from 'next/image';
import {
  ChevronDown,
  Home,
  Search,
  BellOutline,
  ChatOutline,
  GlobeOutline,
  PlusOutline,
  SparklesOutline,
  SpeakerphoneOutline,
  VideoCameraOutline,
  Menu,
} from 'heroicons-react';
// import { StarIcon } from '@heroicons/react/outline';
import { signIn, useSession, signOut } from 'next-auth/react';
const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-16 w-32 flex-shrink-0 cursor-pointer">
        <Image
          src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png"
          alt="Reddit"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <Home className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDown className="h-5 w-5" />
      </div>

      {/* Search */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <Search className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        {/* hidden form submit */}
        <button type="submit" hidden />
      </form>

      <div className="text-gray-500 space-x-2 items-center mx-5 hidden lg:inline-flex">
        <SparklesOutline className="icon" />
        <GlobeOutline className="icon" />
        <VideoCameraOutline className="icon" />
        <hr className="h-10 border border-gray-200" />
        <ChatOutline className="icon" />
        <BellOutline className="icon" />
        <PlusOutline className="icon" />
        <SpeakerphoneOutline className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <Menu className="icon" />
      </div>

      {session ? (
        <div
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
          onClick={() => signOut()}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              alt="redditLogo"
              layout="fill"
              // height&width='100%
              objectFit="contain"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDown className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
          onClick={() => signIn()}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              alt="redditLogo"
              layout="fill"
              // height&width='100%
              objectFit="contain"
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </header>
  );
};
export default Header;
