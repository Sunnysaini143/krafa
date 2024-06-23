import {configureStore} from '@reduxjs/toolkit'
import React from 'react'
import counterReducer from './productslices/counterslice'
import apihandlingReducer from './productslices/apihandling';
import authenticateReducer from './productslices/authenticateSlice'
import signedinReducer from './productslices/signedinslice';
import credentialReducer from './productslices/credentialSlice';
export const store=configureStore({
    reducer:{
        counter:counterReducer,
        Products:apihandlingReducer,
        authentication:authenticateReducer,
        signedin:signedinReducer,
        credential:credentialReducer
    },
});
