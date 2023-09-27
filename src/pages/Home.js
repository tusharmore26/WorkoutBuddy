import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom'
import WorkoutForm from '../component/WorkoutForm'
import WorkoutDetails from '../component/WorkoutDetails'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'



const Home = () => {

    const {workouts, dispatch}  = useWorkoutsContext()
    const {user} = useAuthContext()
    useEffect(() =>{
        const fetchWorkouts = async () => {
            const response = await fetch('https://workoutbuddy-yeon.onrender.com/api/workout',{
              headers: {
                'Authorization':`Bearer ${user.token}`
              }
            })    
            // const responseClone= await response      
            const jason= await response.json()
            console.log(jason)

            if(response.ok)
            {
               dispatch({type: 'SET_WORKOUTS',payload: jason})               
            }
            
        }

     if(user)
     {
      fetchWorkouts()
     }

    },[dispatch,user])
  return (
   <div className="home">
    <div className="workouts">
      {workouts && workouts.map((work)=>{
        console.log(work._id)

         return <WorkoutDetails key={work._id} workout={work}/>
        
})}
    </div>
    <WorkoutForm/>
   </div>
  )
}

export default Home
