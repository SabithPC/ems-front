import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner'
import { useParams } from 'react-router-dom'
import { getUsers } from '../service/allapi'
import { BASE_URL } from '../service/baseurl'

function View() {
  const[user,setUser]=useState({})
  const{id}=useParams()
  console.log(id);
  useEffect(() => {
    getUser()
  }, [])
  
  const getUser=async()=>{
   const{data}= await getUsers("")
   console.log(data);
   setUser(data.find(item=>item._id===id));
  }
  const[showspin,setshowspin]=useState(true)
  useEffect(() => {
    setTimeout(()=>{
      setshowspin(false)
    },1000);
  }, [])
  return (
    <>
    {
showspin?
<LoadingSpinner />:
<div className='container' style={{height:'80vh'}}>
{
  user?
  <Card className='shadow ms-auto mt-5 p-3'>
  <div className='image text-center'>
  <img style={{width:"70px"}} src={`${BASE_URL}/uploads/${user.profile}`} alt="no image" />
  </div>
  <div className='text-center'>
    <h3>{user.fname}{user.lname}</h3>
    <h3>Email:{user.email}</h3>
    <h3>Mobile:{user.mobile}</h3>
    <h3>Gender:{user.gender}</h3>
    <h3>Status:{user.status}</h3>
    <h3>Location:{user.location}</h3>
  </div>
</Card>:""
}

</div>
    }
    
    </>
  )
}

export default View