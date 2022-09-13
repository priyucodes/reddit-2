import Image from 'next/image';

const Header = () => {
  return (
    <header>
      <div className="relative h-16 w-32 flex-shrink-0 cursor-pointer">
        <Image
          src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png"
          alt="Reddit"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div>
        
      </div>
    </header>
  );
};
export default Header;
