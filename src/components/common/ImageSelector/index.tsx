import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageCropModal from "./ImageCropModal";
import Image from "@/components/base/Image";
import Button from "@/components/base/Button";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export type ImageUSelectorProps = {
    image?: any;
    imageClassName?: string;
    wrapperClassName?: string;
    btnGroupClassNames?: string;
    onRemove?: () => void;
    onChange: (file: any) => void;
}

const ImageUSelector: React.FC<ImageUSelectorProps> = ({ image, imageClassName, wrapperClassName, btnGroupClassNames, onRemove, onChange }) => {
    const [imagePic, setImagePic] = useState<string | null>(image);
    const [imageCropped, setImageCropped] = useState<any>(null);
    const [originFile, setOriginFile] = useState<any>(null);
    const { t } = useTranslation();

    const inputRef = useRef<any>(null);

    const handleSelectFile = useCallback((e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setOriginFile(reader.result);
            };
        }
    }, [setOriginFile]);

    const clearInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [inputRef]);

    const handleClose = useCallback(() => {
        clearInput();
        setOriginFile(null)
    }, [clearInput, setOriginFile]);

    const handleCrop = ({ file, src }: { file: any; src: any }) => {
        setImageCropped(null);
        setTimeout(() => {
            setImageCropped(src);
            onChange(file);
            clearInput();
        }, 1);
    }

    const handleRemove = () => {
        setImagePic(null);
        onChange("");
        setImageCropped(null);
        clearInput();
        if (onRemove) onRemove();
    };

  return (
    <>
        {originFile && <ImageCropModal file={originFile} onChange={handleCrop} onClose={handleClose} />}
        <div className={twMerge(classNames("w-full h-full flex flex-col", wrapperClassName))}>
            <label
                className={twMerge(classNames("flex-1 rounded aspect-square overflow-hidden bg-gray-200 block", imageClassName))}
                htmlFor='file-input'
            >
                {(imageCropped || imagePic) && (
                    <Image className="w-full h-full object-contain" src={imageCropped || imagePic} />
                )}
            </label>
            <div className={twMerge(classNames("flex items-center gap-3 mt-3", btnGroupClassNames))}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    className="flex-1"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    {t('fileSelector.upload')}
                    <input
                        ref={inputRef}
                        id="file-input"
                        type="file"
                        className='hidden'
                        accept=".jpg, .jpeg, .png"
                        onChange={handleSelectFile}
                    />
                </Button>
                {(imageCropped || imagePic) && (
                    <Button
                        type="button"
                        color="error"
                        variant="outlined"
                        className="flex-1"
                        onClick={handleRemove}
                    >
                        {t('general.remove')}
                    </Button>
                )}
            </div>
        </div>
    </>
  )
}

export default ImageUSelector;
