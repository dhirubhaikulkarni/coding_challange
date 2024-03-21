import React, {
    forwardRef,
    useRef,
    useImperativeHandle,
    useEffect,
} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../Store/crudOperationSlice";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


const UserDialog = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const rowsPerPage = useSelector((state) => state.user.rowsPerPage);
    const page = useSelector((state) => state.user.page);
    const [open, setOpen] = React.useState(false);
    const [gender, setGenderValue] = React.useState('Male');
    const [DOB, setDOB] = React.useState(dayjs(new Date()));

    const [userdata, setUserData] = React.useState([]);
    const { control, setValue, formState: { errors }, handleSubmit, reset, trigger, setError } = useForm({
        mode: 'onChange',
    });

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation function to check if the input is a valid email
    const validateEmail = (email) => {
        if (!email) return true; // No validation if field is empty
        return emailRegex.test(email) || "Invalid email address";
    };

    // Regular expression for phone number validation
    const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone number

    // Validation function to check if the input is a valid phone number
    const validatePhone = (phone) => {
        if (!phone) return true; // No validation if field is empty
        return phoneRegex.test(phone) || "Invalid phone number";
    };

    const handleClickOpen1 = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setValue("name", "")
        setValue("email", "")
        setValue("phone", "")
        setGenderValue("Male")
        setDOB(dayjs(new Date()))
        setOpen(false);
    };
    const formRef = useRef(null);
    useImperativeHandle(ref, () => ({
        handleClickOpen(Data) {
            setUserData(Data)
            setTaskData(Data)
            handleClickOpen1();
        },
    }));


    const setTaskData = (data) => {
        if (Object.keys(data).length !== 0) {
            setValue("name", data.Name)
            setValue("email", data.Email)
            setValue("phone", data.Phone)
            setGenderValue(data.Gender)
            setDOB(dayjs(new Date(data.DOB)))

        } else {
            setValue("name", "")
            setValue("email", "")
            setValue("phone", "")
            setGenderValue("Male")
            setDOB(dayjs(new Date()))

        }
    }
    function onSubmit(model) {
        debugger;
        let data = {
            "Name": model.name,
            "Email": model.email,
            "Phone": model.phone,
            "Gender": gender,
            "DOB": DOB,
        }
        if (userdata._id == undefined) {
            dispatch(addUser(data, page * rowsPerPage, rowsPerPage))
            handleClose()
        } else {
            dispatch(editUser(data, userdata._id, page * rowsPerPage, rowsPerPage))
            handleClose()
        }
    }

    const handleGenderChange = (event) => {
        setGenderValue(event.target.value);
    };

    const handleDateChange = (date) => {
        debugger;
        setDOB(date.$d);

    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth='xs'
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >

            <DialogTitle id="responsive-dialog-title">{'Add User'}</DialogTitle>
            <DialogContent dividers>
                <form
                    ref={formRef}
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Controller

                                type="text"
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Controller

                                type="text"
                                name="email"
                                control={control}
                                rules={{ validate: validateEmail }} // Adding validation rules
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : null}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Controller
                                type="number"
                                name="phone"
                                control={control}
                                rules={{ validate: validatePhone }} // Adding validation rules
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Phone Number"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={!!errors.phone}
                                        helperText={errors.phone ? errors.phone.message : null}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    defaultValue="Male"
                                    value={gender}
                                    onChange={handleGenderChange}
                                >
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        sx={{ width: '100%' }} // Make the DatePicker full width
                                        label="Basic date picker"
                                        value={DOB}
                                        onChange={handleDateChange}
                                        renderInput={(props) => <TextField {...props} fullWidth />} // Ensuring the TextField inside DatePicker takes full width
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                    </Grid>
                    <div className='flex flex-row-reverse' >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '16px' }}>
                            <Button type="submit" color="primary" autoFocus variant="contained" style={{ marginRight: '8px' }}>
                                {"SAVE"}
                            </Button>
                            <Button autoFocus onClick={handleClose} color="primary" variant="contained">
                                {"CANCEL"}
                            </Button>
                        </Grid>
                    </div>
                </form>
            </DialogContent>

        </Dialog>

    );
});

export default UserDialog;
