import React, { useState, useLayoutEffect } from 'react';
import { IMG_PLACEHOLDER } from '@src/utils/constants';
import styles from './Poster.module.scss';

type Props = {
  url: string;
  className?: string;
};

const Poster = ({ url, className }: Props) => {
  const [hasLoadImgError, setLoadImgError] = useState(false);

  useLayoutEffect(() => {
    setLoadImgError(false);
  }, [url]);

  const handleError = () => {
    setLoadImgError(true);
  };

  return (
    <picture className={className}>
      {hasLoadImgError && <img src={IMG_PLACEHOLDER} className={styles.img} alt="Movie poster" />}
      {!hasLoadImgError && (
        <img src={url} className={styles.img} alt="Movie poster" onError={handleError} />
      )}
    </picture>
  );
};

export default Poster;
