import React from 'react';
import classNames from 'classnames';
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied';
import { Typography } from '@mui/material';

interface Props {
    sm?: boolean;
    label: string;
}

const TableEmpty: React.FC<Props> = ({ sm, label }) => (
    <div
        className={classNames("flex text-slate-600 flex-col items-center gap-3 justify-center w-full", {
            "min-h-[22rem]": !sm,
            "min-h-[10rem]": sm
        })}
    >
        {/* <Image className={sm ? "w-20 h-20" : "w-28 h-28"} src={EmptyIcon} /> */}
        <SentimentVeryDissatisfied className={sm ? "w-12 h-12" : "w-16 h-16"} />
        <Typography className='font-semibold' variant="h6" component="h2">{label}</Typography>
    </div>
);

export default TableEmpty