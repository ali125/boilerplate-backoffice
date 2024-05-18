import React from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import ImageSelector, { ImageUSelectorProps } from "..";

export type ImageSelectorControllerProps = Omit<ImageUSelectorProps, "onChange"> & {
  name: string;
  control: any;
  rules?: RegisterOptions;
}

const ImageSelectorController: React.FC<ImageSelectorControllerProps> = ({
    control,
    name,
    rules,
    ...props
}) => {
  return (
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange } }) => (
            <ImageSelector {...props} onChange={onChange} />
        )}
    />
  )
}

export default ImageSelectorController;
