// Like.tsx
import React from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

interface Props {
  onClick: () => void;
  liked: boolean;
}

const Like: React.FC<Props> = ({ onClick, liked }) => {
  return liked ? (
    <IoIosHeart color="#ff6b81" size={20} onClick={onClick} />
  ) : (
    <IoIosHeartEmpty size={20} onClick={onClick} />
  );
};

export default Like;  