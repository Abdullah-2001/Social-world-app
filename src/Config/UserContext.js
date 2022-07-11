import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserAsync, setUsersAsync } from '../Store/Users/AsyncUser';

export const CurrentUserContext = () => {
    const [currentUser, setCurrentUser] = useState()
    const dispatch = useDispatch()
    const state = useSelector((state) => state.users.currentUser)
    useEffect(() => {
        dispatch(setCurrentUserAsync())
        setCurrentUser(state)
    }, [])
    return {
        currentUser,
    }
}

export const UsersContext = () => {
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    const state = useSelector((state) => state.users.users)
    useEffect(() => {
        dispatch(setUsersAsync())
        setUser(state)
    }, [])
    return {
        user,
    }
}