import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const addUser = (data, page, rowsPerPage) => async dispatch => {
    try {
        await axios.post(`http://localhost:4000/addUser`, data)
            .then(response => {
                if (response.status == 200) {
                    dispatch(getUserData(page, rowsPerPage))
                    alert("Successfully Added the record")
                }
                else {
                    alert("Error occured")
                }
            })
    }
    catch (e) {
        alert(e.message)
    }


};

export const editUser = (data, id, page, rowsPerPage) => async dispatch => {
    try {
        await axios.post(`http://localhost:4000/ediUser/${id}`, data)
            .then(response => {
                if (response.status == 200) {
                    dispatch(getUserData(page, rowsPerPage))
                    alert("Successfully Edited the record")
                }
                else {
                    alert("Error occured")
                }
            })
    }
    catch (e) {
        alert(e.message)
    }

};
export const deleteUser = (id, page, rowsPerPage) => async dispatch => {
    try {
        await axios.delete(`http://localhost:4000/deleteUser/${id}`)
            .then(response => {
                if (response.status == 200) {
                    dispatch(getUserData(page, rowsPerPage))
                    alert("Successfully Deleted the record")
                }
                else {
                    dispatch(setUserData([]));
                    alert("Error occured")
                }
            })
    }
    catch (e) {
        alert(e.message)
    }

};
export const getUserData = (page, rowsPerPage) => async dispatch => {
    debugger;
    try {
        await axios.get(`http://localhost:4000/getUserData/${page}/${rowsPerPage}`)
            .then(response => {
                debugger;
                if (response.status == 200) {
                    dispatch(setUserData(response.data));
                }
                else {
                    dispatch(setUserData([]));
                    alert("Error occured")
                }

            })
    }
    catch (e) {
        alert(e.message)
    }


};

export const SetPageValue = (data) => async dispatch => {
    dispatch(setPageValue(data));
}
export const SetRowsPerPageValue = (data) => async dispatch => {
    dispatch(setRowsPerPageValue(data));
}


const initialState = {
    userData: [],
    rowsPerPage: 10,
    page: 0,
    count: 0,
    success: true

};

const crudOperationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            debugger;
            state.userData = action.payload.usersList
            state.count = action.payload.count
            state.success = true
        },
        editTaskThroughSocket: (state, action) => {

        },
        deleteTaskThroughSocket: (state, action) => {
        },
        setPageValue: (state, action) => {
            debugger;
            state.page = action.payload
        },
        setRowsPerPageValue: (state, action) => {
            debugger;
            state.rowsPerPage = action.payload
        },
    }
});

export const {
    setUserData,
    editTaskThroughSocket,
    deleteTaskThroughSocket,
    setPageValue,
    setRowsPerPageValue
} = crudOperationSlice.actions;

export default crudOperationSlice.reducer;

