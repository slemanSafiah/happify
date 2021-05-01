import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/Context'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={props => {
                return user?.token ? <Component {...props} /> : <Redirect to='/login' />
            }}
        />
    )
}