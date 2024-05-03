import React, { ImgHTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames';

import DEFAULT_IMAGE from "@/assets/images/default-image.gif";

type Props = ImgHTMLAttributes<HTMLImageElement> & { defaultSrc?: string };

const Image: React.FC<Props> = ({ src, alt, defaultSrc, ...props }) => {
  const [source, setSource] = useState<any>(src || DEFAULT_IMAGE);
  
  useEffect(() => {
    setSource(src);
  }, [src])
  const handleError = () => {
    setSource(defaultSrc || DEFAULT_IMAGE);
  };

  return (
    <span className={classNames("block", props.className)}>
      <img src={source} alt={alt || "Saman GRC"} onError={handleError} {...props} />
    </span>
  );
};

export default Image;