import React, { useCallback, useState } from 'react'
import CheckBox from '@/components/base/Form/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetPermissionsAllQuery } from '@/redux/apiSlice/permissionsSlice';
import { Permission, PermissionActions } from '@/@types/permission.type';

interface Props {
    selectedIds: string[];
    onSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const RolePermissions: React.FC<Props> = ({ selectedIds, onSelectedIds }) => {
    const { data } = useGetPermissionsAllQuery();

    const listActions = useCallback((row: Permission[]) => {
        const read = row.find((permission) => permission.action === PermissionActions.Read);
        const create = row.find((permission) => permission.action === PermissionActions.Create);
        const update = row.find((permission) => permission.action === PermissionActions.Update);
        const deleteItem = row.find((permission) => permission.action === PermissionActions.Delete);
        const manage = row.find((permission) => permission.action === PermissionActions.Manage);

        return [
            read,
            create,
            update,
            deleteItem,
            manage,
        ]
    }, []);

    const handleOnCheck = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const id = event.target.id;
        onSelectedIds((prev) => {
            const updatePrev = [...prev];
            const indx = updatePrev.indexOf(id);
            if (checked) {
                if (indx === -1) updatePrev.push(id);
            } else if (indx !== -1) {
                updatePrev.splice(indx, 1);
            }
            return updatePrev;
        });
    }, []);

    return (
        <TableContainer>
            <Table sx={{ maxWidth: '100%' }} size='small' aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Module</TableCell>
                    <TableCell align="center">Read</TableCell>
                    <TableCell align="center">Create</TableCell>
                    <TableCell align="center">Update</TableCell>
                    <TableCell align="center">Delete</TableCell>
                    <TableCell align="center">Manage</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {(data || []).map((row: any) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.label}
                            </TableCell>
                            {listActions((row?.data || []) as any).map((action) => action ? (
                                <TableCell align="center">
                                    <CheckBox onChange={handleOnCheck} id={action.id} defaultChecked={selectedIds.includes(action.id)} />
                                </TableCell>
                            ) : (
                                <TableCell align="center" />
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RolePermissions