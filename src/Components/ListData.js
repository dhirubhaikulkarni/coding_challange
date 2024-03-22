import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import React, {
    forwardRef,
    useRef,
    useImperativeHandle,
    useEffect,
} from "react";
import { SetPageValue, SetRowsPerPageValue, deleteUser, getUserData } from '../Store/crudOperationSlice';
import UserDialog from '../Dialogs/UserDialog';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';


const columns = [
    { id: 'Name', label: 'Name', minWidth: 170 },
    { id: 'Phone', label: 'Phone', minWidth: 100 },
    { id: 'Gender', label: 'Gender', minWidth: 100 },
    { id: 'Email', label: 'Email', minWidth: 100 },
    { id: 'DOB', label: 'DOB', minWidth: 100 },

    {
        id: 'action',
        label: 'Action',

    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}


export default function StickyHeadTable() {
    const userData = useSelector((state) => state.user.userData);
    const success = useSelector((state) => state.user.success);

    const rowsPerPage = useSelector((state) => state.user.rowsPerPage);
    const page = useSelector((state) => state.user.page);
    const count = useSelector((state) => state.user.count);
    const dispatch = useDispatch();
    const userRef = useRef();

    const [removeID, setRemoveID] = React.useState(0);
    const [open, setOpen] = React.useState(0);

    useEffect(() => {
        dispatch(getUserData(page * rowsPerPage, rowsPerPage))
    }, []);


    useEffect(() => {
        dispatch(getUserData(page * rowsPerPage, rowsPerPage))
    }, [rowsPerPage, page]);


    function handleChangePage(event, value) {
        dispatch(SetPageValue(value))
    }

    function handleChangeRowsPerPage(event) {
        dispatch(SetRowsPerPageValue(event.target.value))
    }

    const deleteRecord = (id) => {
        setOpen(true);
        setRemoveID(id)

    };

    const handleClose = (newValue) => {
        setOpen(false);
        if (newValue) {
            dispatch(deleteUser(removeID, page * rowsPerPage, rowsPerPage))
        }
    };

    const handleDateString = (timestamp) => {
        const date = new Date(timestamp);

        // Extracting only the date part
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    };



    return (
        <>
            <div className="flex flex-row-reverse m-4">
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => userRef.current.handleClickOpen({})}
                >
                    Add User
                </Button>
            </div>
            <Paper sx={{ width: '100%' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                let value = row[column.id];
                                                if (column.id == "DOB") {
                                                    value = handleDateString(value)
                                                }
                                                return (
                                                    <>
                                                        <TableCell key={column.id} >
                                                            {value}
                                                            <>
                                                                {column.id == "action" &&
                                                                    <>
                                                                        <EditIcon onClick={() => userRef.current.handleClickOpen(row)} />
                                                                        <DeleteIcon onClick={() => deleteRecord(row._id)} />
                                                                    </>
                                                                }
                                                            </>
                                                        </TableCell>

                                                    </>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    className="tablePaging"
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                ></TablePagination>
            </Paper>
            <UserDialog ref={userRef} />
            <ConfirmationDialog
                id="ringtone-menu"
                keepMounted
                open={open}
                text={"Are you sure you want to delete this record?"}
                onClose={handleClose}
                value={removeID}
            ></ConfirmationDialog>
        </>
    );
}
