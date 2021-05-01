import React, { useState } from 'react'

export const AuthContext = React.createContext(null)

export function AuthProvider(props) {
    const [user, setUser] = useState({})

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}
