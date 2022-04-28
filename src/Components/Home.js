import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../Contexts/GlobalState';
import '../styles/Home.css';
import SinglePerson from './SinglePerson';
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';

const Home = props => {

    const {profile, setProfile, connection, setConnection} = useContext(ProfileContext);
    const [addName, setAddName] = useState("");
    const [firstPerson, setFirstPerson] = useState("");
    const [secondPerson, setSecondPerson] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        var opt = [];
        for(var i = 0;i<profile.length;i++){
            opt.push({value : profile[i], label : profile[i]});
        }
        setOptions(opt);
    },[profile]);

    const handleAdd = e => {
        e.preventDefault();
        if(!addName){
            alert("You need to add a name first.");
            return;
        }
        var check = true;
        var check2 = true;
        for(var i = 0;i<addName.length;i++){
            if(addName[i] == ' '){
                check = false;
                break;
            }
            if(addName[i] > 'z' || addName[i]<'A'){
                check2 = false;
                break;
            }
        }
        var check3 = true;
        for(var i = 0;i<profile.length;i++){
            if(profile[i] == addName){
                check3 = false;
                break;
            }
        }
        if(!check){
            alert("Entered name should be single word.");
            return;
        }
        if(!check2){
            alert("Name can have only english letters.");
            return;
        }
        if(!check3){
            alert("Person with entered name already exist.")
            return;
        }

        setProfile([...profile, addName]);
        setAddName("");
    }

    const handleRemove = (name) => {
        var v = [];
        for(var i = 0;i<profile.length;i++){
            if(profile[i] != name){
                v.push(profile[i]);
            }
        }
        var con = [];
        for(var i = 0;i<connection.length;i++){
            if(connection[i][0]==name || connection[i][1] == name)continue;
            con.push(connection[i]);
        }
        setProfile(v);
        setConnection(con);
    }

    const handleConnect = (e) => {
        e.preventDefault();
        if(!firstPerson || !secondPerson){
            alert("Choose name of both the person first");
            return;
        }
        if(firstPerson == secondPerson){
            alert("Connection can only be made between different person");
            return;
        }
        for(var i = 0;i<connection.length;i++){
            if((connection[i][0] == firstPerson && connection[i][1] == secondPerson) || (connection[i][0] == secondPerson && connection[i][1] == firstPerson)){
                alert("Connection already exist");
                return;
            }
        }

        var v = [firstPerson, secondPerson];
        setConnection([...connection, v]);
        setFirstPerson("");
        setSecondPerson("");
        alert("Congratulations connection has been made");
    }

    return (
        <div className='home'>
            <div className='home__left'>
                <div className='home__left__top'>
                    <h2>Add a Person</h2>
                    <form className='add__form' onSubmit={handleAdd}>
                        <input type = "text" placeholder='Enter first name' value = {addName} onChange = {e => setAddName(e.target.value)}/>
                        <button>Add</button>
                    </form>
                </div>
                <div className='home__left__bottom'>
                    <h2>Make a Connection</h2>
                    <form className='connection__form' onSubmit={handleConnect}>
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
                        <button className='connect__btn'>Connect</button>
                    </form>
                </div>
            </div>
            <div className='home__right'>
                <div className='list'>List of people</div>
                {profile.map(person => (
                    <SinglePerson name = {person} handleRemove = {handleRemove}/>
                ))}
            </div>
        </div>
    );
};

export default Home;