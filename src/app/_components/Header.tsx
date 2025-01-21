'use client';

import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-support-100 text-sub-400 p-4 font-bold flex justify-between items-center sticky top-0 z-50">
      {/* 左のアイコン */}
      <Link href="/tree">
        <FontAwesomeIcon icon={faLeaf} className="text-sub-400 w-8 h-8" />
      </Link>

      {/* 中央のテキスト */}
      <Link href="/" className="text-xl">
        ありがとうの木
      </Link>

      {/* 右のアイコン */}
      <Link href="/">
        <FontAwesomeIcon icon={faEnvelope} className="text-sub-400 w-8 h-8" />
      </Link>
    </header>
  );
};
