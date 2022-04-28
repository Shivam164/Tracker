import {useState, createContext} from 'react';

export const ProfileContext = createContext();

export const ProfileContextProvider = (props) => {
    const [profile, setProfile] = useState([]);
    const [connection, setConnection] = useState([]);

    return (
        <ProfileContext.Provider value = {{profile, setProfile, connection, setConnection}}>
            {props.children}
        </ProfileContext.Provider>
    )
}