import React, { useState, useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const getCroppedImage = (image: any, crop: any, { type, extension }: { type: string; extension: string }) => {
  const canvas = document.createElement('canvas');
  const imageRef = image.target;
  const scaleX = imageRef.naturalWidth / imageRef.width;
  const scaleY = imageRef.naturalHeight / imageRef.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(
    imageRef,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  const date = new Date().getTime();
  const fileNameDate = date.toString();
  const fileName = `${fileNameDate}.${extension || 'jpeg'}`;

  return new Promise((resolve) => {
    try {
      canvas.toBlob(
        (blob: any) => {
          if (blob) {
            const name = fileName.split('.')[0];
            const nameExt = fileName.split('.')[1];
            const blobExt = blob.type.split('/')[1];
            blob.name = nameExt === blobExt ? fileName : `${name}.${blobExt}`;
            resolve(blob);
          }
        },
        type,
        1,
      );
    } catch (e) {
      console.log('Canvas Blob Failed:', e);
    }
  });
};

interface Props {
    src: any;
    onChange: (e: any) => void;
}

const ImageCrop: React.FC<Props> = ({ src = null, onChange }) => {
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    unit: 'px',
    x: 0,
    y: 0,
    width: 120,
    height: 120
  });
  const imageRef = useRef(null);
  const [imageData, setImageData] = useState({ type: 'image/jpeg', extension: 'jpeg' });

  useEffect(() => {
    if (src) {
      if (src?.type && src?.name) {
        const imgSplit = src.name.split('.');
        const extension = imgSplit[imgSplit.length - 1];
        setImageData({ type: src.type, extension });
      }
    }
  }, [src]);

  const makeClientCrop = () => {
    const image = imageRef.current as any;
    if (image) {
        getCroppedImage(image, crop, imageData).then((e) => {
            onChange(e);
        });
    }
  };
  const handleImageLoaded = (image: any) => {
    imageRef.current = image;
    makeClientCrop();
  };

  if (src === null) return null;
  return (
    <ReactCrop crop={crop as any} onChange={setCrop as any} onComplete={makeClientCrop}>
      <img src={src} onLoad={handleImageLoaded} style={{ maxHeight: '75vh' }} />
    </ReactCrop>
  );
};

export default ImageCrop;
