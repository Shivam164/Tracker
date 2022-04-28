import React, { useContext, useState } from 'react';
import { ProfileContext } from '../Contexts/GlobalState';
import '../styles/Connection.css';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const Connection = props => {

    const {profile, connection} = useContext(ProfileContext);
    const [firstPerson, setFirstPerson] = useState("");
    const [secondPerson, setSecondPerson] = useState("");
    const [connectionChain, setConnectionChain] = useState([]);

    var visited = [];
    var path = [];

    const visitedOrNot = (NAME) => {
        for(var i = 0;i<visited.length;i++){
            if(visited[i] == NAME){
                return true;
            }
        }
        return false;
    }

    const findConnection = (currentName, lastName) => {
        if(currentName == lastName){
            path.push(currentName);
            return true;
        }
        visited.push(currentName);
        
        for(var i = 0;i<connection.length;i++){
            if(connection[i][0] == currentName && !visitedOrNot(connection[i][1])){
                if(findConnection(connection[i][1],lastName)){
                    path.push(currentName);
                    return true;
                }
            }else if(connection[i][1] == currentName && !visitedOrNot(connection[i][0])){
                if(findConnection(connection[i][0],lastName)){
                    path.push(currentName);
                    return true;
                }
            }
        }
        return false;
    }

    const handleFind = (e) => {
        e.preventDefault();
        if(!firstPerson || !secondPerson){
            alert("You have to select both person first.");
            return;
        }
        if(firstPerson == secondPerson){
            alert("Selected persons should be different");
            return;
        }

        path = [];
        visited = [];

        if(findConnection(firstPerson, secondPerson)){
            path.reverse();
            setConnectionChain(path);
        }else{
            alert("NO CONNECTION EXIST BETWEEN SELECTED PEOPLE :( .");
        }

    }


    return (
        <div className='connections'>
            <h2>Find Connection</h2>
            <form className='find__connection__form'>
                <div className='options'>
                    <select value = {firstPerson} onChange = {e => setFirstPerson(e.target.value)}>
                        <option value = "">None</option>
                        {profile.map(person => (
                            <option value = {person} >{person}</option>
                        ))}
                    </select>
                    <select value = {secondPerson} onChange = {e => setSecondPerson(e.target.value)}>
                        <option value = "">None</option>
                        {profile.map(person => (
                            <option value = {person}>{person}</option>
                        ))}
                    </select>   
                </div>
                <button className='find__btn' onClick={handleFind}>Find</button>
            </form>
            <div className='outer__connection__container'>
            <div className='connection__chain'>
                {connectionChain && connectionChain.map(person => (
                    <>
                        <div className='person__chain'>{person}</div>
                        {connectionChain[connectionChain.length - 1] != person && <ExpandCircleDownIcon/>}
                    </>
                ))}
            </div>
            </div>
        </div>
    );
};

export default Connection;