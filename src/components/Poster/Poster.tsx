import React, { useState, useEffect } from 'react';
import { IMG_PLACEHOLDER } from '@src/utils/constants';
import { PosterProps } from './Poster.types';
import styles from './Poster.module.scss';

const Poster = ({ url, className }: PosterProps) => {
  const [hasImageError, setLoadImgError] = useState(false);

  useEffect(() => {
    setLoadImgError(false);
  }, [url]);

  const handleError = () => {
    setLoadImgError(true);
  };

  return (
    <picture className={className}>
      {hasImageError && <img src={IMG_PLACEHOLDER} className={styles.img} alt="Movie poster" />}
      {!hasImageError && (
        <img src={url} className={styles.img} alt="Movie poster" onError={handleError} />
      )}
    </picture>
  );
};

export default Poster;
