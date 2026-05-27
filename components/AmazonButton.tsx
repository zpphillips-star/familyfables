'use client';

import React from 'react';
import { trackAmazonClick } from '@/lib/analytics';

interface AmazonButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  bookSlug: string;
  bookTitle: string;
  href: string;
}

/**
 * Drop-in replacement for <a href={amazonUrl}> that also fires an analytics
 * event when clicked. Accepts all the same props as a regular anchor.
 */
export default function AmazonButton({
  bookSlug,
  bookTitle,
  href,
  onClick,
  children,
  ...rest
}: AmazonButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackAmazonClick(bookSlug, bookTitle);
    onClick?.(e);
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
