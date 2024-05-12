import { useCallback, useMemo, useRef } from "react";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import CloudUpload from "@mui/icons-material/CloudUpload";
import Close from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import FormLabel from "../FormLabel";
import { createLocale } from "@/config/translation/i18n";
import { twMerge } from "tailwind-merge";

export interface FileSelectorTextProps {
    isError: boolean;
}
  
export interface FileSelectorProps {
    label?: string;
    sm?: boolean;
    id?: string;
    name?: string;
    requiredInput?: boolean;
    errorMessage?: string;
    invalid?: boolean;
    multiple?: boolean;
    value?: any;
    className?: string;
    inputClassName?: string;
    onChangeFile?: (value: any) => void;
}

const FileSelector: React.FC<FileSelectorProps> = ({
    onChangeFile,
    className,
    label,
    requiredInput,
    multiple,
    invalid,
    errorMessage,
    inputClassName,
    value,
    ...props
}) => {
    const id = useMemo(() => props.id || props.name || uuidv4(), [props.id, props.name]);
    const inputRef = useRef<any>(null);

    const { t } = useTranslation();

    const handleSelectFile = useCallback((e: any) => {
        const files = e.target.files;
        if (onChangeFile) onChangeFile(files);
    }, [onChangeFile]);

    const clearInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [inputRef]);

    const handleRemove = useCallback(() => {
        clearInput();
        if (onChangeFile) onChangeFile(null);
    }, [clearInput, onChangeFile]);

    const infoLabel = useMemo(() => {
        if (value) {
            if (value.length > 1) return createLocale(t('fileSelector.multiFileSelected'), { length: value.length });
            return t('fileSelector.oneFileSelected');
        }

        return t('fileSelector.selectFile');
    }, [value]);

    return (
        <>
        <FormControl error={invalid} className={twMerge(classNames("w-full", className))} variant="standard">
            {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
            <div className={classNames("rounded-full bg-white border flex items-center px-3 outline-0 leading-none", inputClassName)}>
                <label htmlFor={id} className="w-full block py-2 placeholder:text-sm placeholder:capitalize text-base">
                    <span className={classNames("block w-full capitalize", { "text-gray-400": !value })}>
                        {infoLabel}
                    </span>
                    <input
                        multiple={multiple}
                        ref={inputRef}
                        id={id}
                        type="file"
                        className='hidden'
                        onChange={handleSelectFile}
                    />
                </label>
                {value && (
                    <div
                        className="cursor-pointer h-full text-gray-600 ml-1 z-2"
                        onClick={handleRemove}
                    >
                        <Close className="w-5 h-5" />
                    </div>
                )}
            </div>
            {errorMessage && <FormHelperText id={id} className="first-letter:uppercase">{errorMessage}</FormHelperText>}
            </FormControl>
        </>
    );
}

export default FileSelector;
