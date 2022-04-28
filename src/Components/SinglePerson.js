import React, { useContext } from 'react';
import '../styles/SinglePerson.css';
import DeleteIcon from '@mui/icons-material/Delete';

const SinglePerson = ({ name, handleRemove }) => {

    return (
        <div className='single__person'>
            <p>{name}</p>
            <button onClick = {() => handleRemove(name)}><DeleteIcon/></button>
        </div>
    );
};

export default SinglePerson;