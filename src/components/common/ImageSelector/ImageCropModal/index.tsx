import React, { useState } from "react";
import Modal from "@/components/base/Modal";
import Button from "@/components/base/Button";
import ImageCrop from "../ImageCrop";
import { useTranslation } from "react-i18next";

interface Props {
    file: any;
    onChange: (props: { file: any; src: any }) => void;
    onClose: () => void;
}

const ImageCropModal: React.FC<Props> = ({ file, onClose, onChange }) => {
    const [croppedImage, setCroppedImage] = useState<any>(null);
    const { t } = useTranslation();

    const handleSubmit = () => {
        if (croppedImage) {
            const reader = new FileReader();
            reader.readAsDataURL(croppedImage);
            reader.onloadend = () => {
                onChange({ file: croppedImage, src: reader.result });
                onClose();
            };
        }
    }

    return (
        <Modal
            open
            title={t("fileSelector.editImage")}
            onClose={onClose}
            footer={(
                <>
                    <Button onClick={handleSubmit}>{t("fileSelector.select")}</Button>
                    <Button variant="outlined" onClick={onClose}>{t("general.close")}</Button>
                </>
            )}
        >
            <div className="w-full max-h-[85vh] flex items-center justify-center">
                <ImageCrop src={file} onChange={setCroppedImage} />
            </div>
        </Modal>
    );
}

export default ImageCropModal


