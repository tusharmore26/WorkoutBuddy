import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    const [title,setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [err,setErr] = useState(null)
    const [emptyField, setEmptyField] = useState([])


    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!user)
        {
            setErr("you must be logged in")
            return
        }

        const workout = {title,load,reps}

        const response = await fetch('https://workoutbuddy-yeon.onrender.com/api/workout',{
            method:'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setErr(json.err)
            setEmptyField(json.emptyFields)
        }
        else if(response.ok){

            setTitle('')
            setLoad('')
            setReps('')
            setErr(null)
            setEmptyField([])
            console.log("new Woekout add ",json)
            dispatch({type: 'CREATE_WORKOUT',payload: json})
        }
    }
  return (
    <form className='create' onSubmit={handleSubmit}>
        <h1>Add a New Workout</h1>

        <label>Excersize Title</label>
        <input type="text" 
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        className={emptyField.includes('title')? 'error':''}/>

        <label>Load (in KG)</label>
        <input type="number" 
        onChange={(e)=>setLoad(e.target.value)}
        value={load}
        className={emptyField.includes('load')? 'error':''}/>

        <label>Reps</label>
        <input type="number" 
        onChange={(e)=>setReps(e.target.value)}
        value={reps}
        className={emptyField.includes('reps')? 'error':''}/>

        <button>Add Workout</button>
        {err && <div className='error'>{err}</div>}

    </form>
  )
}

export default WorkoutForm
