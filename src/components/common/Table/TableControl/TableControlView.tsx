import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MoreVert from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@/components/base/Tooltip";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TableHeadItemType } from '../TableHead/TableHead.interface';
import Dropdown from '@/components/base/Dropdown';

interface Props {
  data: TableHeadItemType[];
  onChange: (data: TableHeadItemType[]) => void;
}

const TableControlView: React.FC<Props> = ({ data, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleChange = (id: string | number, checked: boolean) => {
    const newData = [...data]
    const indx = data.findIndex((i) => i.id.toString() === id.toString());
    newData[indx].hidden = !checked;
    onChange(newData);
  }

  const menuList = useMemo(() => {
    const actives = data.filter((i) => !i.hidden);
    return data.map((head) => ({
      id: head.id.toString(),
      label: (
        <FormControlLabel
          classes={{ label: "!text-xs text-left", root:"block text-left ml-0" }}
          label={head.label}
          className="block"
          control={
            <Checkbox
              className='py-0'
              size='small'
              disabled={actives.length === 1 && !head.hidden}
              defaultChecked={!head.hidden}
              onChange={(_e, checked) => handleChange(head.id, checked)}
            />
          }
        />
      )
    }))
  }, [data]);
  
  return (
    <>
      <Tooltip title={t("general.settings")}>
        <IconButton ref={ref} onClick={handleOpen}>
          <MoreVert fontSize='small' />
        </IconButton>
      </Tooltip>
      <Dropdown
        isOpen={isOpen}
        menuClassName="!w-auto min-w-[8rem]"
        onClose={handleClose}
        anchorRef={ref.current}
        placement='bottom-start'
        closeable={false}
        menuList={menuList}
      />
    </>
  )
}

export default TableControlView;
