// starting json server : npx json-server -p 3500 -w data/db.json

import React from 'react';
import Header from './Header';
import SearchGoal from './SearchGoal';
import AddGoals from './AddGoals';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

const App = () => {
    const API_URL = 'http://localhost:3500/items';

    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error('Didn`t receive expected data')
                const listGoals = await response.json();
                setGoals(listGoals);
                setFetchError(null);
            } catch (error) {
                setFetchError(error.message);
            } finally{
                setIsLoading(false);
            }
        }
        setTimeout(()=>{(async () => await fetchGoals())();}, 2000) // Simulating long loading time 
    }, [])

    const handleCheck = async (id) => {
        const listGoals = goals.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
        setGoals(listGoals);

        const myGoal = listGoals.filter((item) => item.id === id);

        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({checked: myGoal[0].checked})
        }
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) setFetchError(result);
    }

    const handleDelete = async (id) => {
        const listGoals = goals.filter((item) => item.id !== id);
        setGoals(listGoals);

        const deleteOptions = { method: 'DELETE'};
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) setFetchError(result);
    }
    const addGoal = async (item) => {
        const id = goals.length ? goals[goals.length - 1].id + 1 : 1;
        const myNewGoal = { id, checked: false, item }
        const listGoals = [...goals, myNewGoal];
        setGoals(listGoals);

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myNewGoal)
        }
        const result = await apiRequest(API_URL, postOptions);
        if (result) setFetchError(result);

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newGoal) return;
        addGoal(newGoal);
        setNewGoal('');
    };


    return (
        <div className='App'>
            <Header
                title='To Do list' />
            <AddGoals
                newGoal={newGoal}
                setNewGoal={setNewGoal}
                handleSubmit={handleSubmit} />
            <SearchGoal
                search={search}
                setSearch={setSearch} />
            <main>
                {isLoading && <p>Loading Items...</p>}
                {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
                {!fetchError && !isLoading &&
                    <Content
                        goals={goals.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete} />
                }
            </main>

            <Footer length={goals.length} />
        </div>
    );
};

export default App;