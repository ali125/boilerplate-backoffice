import Input from '@/components/base/Form/Input';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react'

const SearchHeader: React.FC = () => {
    const [searchText, setSearchText] = useState<string>("");
    return (
        <form className='block'>
            <Input
                value={searchText}
                onChangeValue={setSearchText}
                placeholder='Search data, Name or ID ...'
                inputClassName="pr-0"
                endAdornment={
                    <IconButton>
                        <SearchIcon className='text-slate-500' />
                    </IconButton>
                }
            />
        </form>
    )
}

export default SearchHeader 