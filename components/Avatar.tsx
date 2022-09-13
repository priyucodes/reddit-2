import { useSession } from 'next-auth/react';
import Image from 'next/image';
type Props = {
  seed?: string;
  large?: boolean;
};
const Avatar = ({ seed, large }: Props) => {
  const { data: session } = useSession();

  return (
    <div
      className={`relative h-10 w-10 rounded-full border-gray-300 bg-slate-300 ${
        large && 'h-20 w-20'
      } overflow-hidden`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || 'placeholder'
        }.svg`}
        alt="avatar"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};
export default Avatar;
