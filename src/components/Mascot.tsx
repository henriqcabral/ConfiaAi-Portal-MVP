import React from 'react';
import Image from 'next/image';

const Mascot = () => (
  <div className="flex justify-center items-center">
    <Image
      src="/mascote-confiaai.png"
      alt="Mascote Confia AI"
      width={260}
      height={380}
      className="w-full max-w-xs h-auto drop-shadow-xl"
      priority
    />
  </div>
);

export default Mascot; 