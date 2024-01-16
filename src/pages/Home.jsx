import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from '../components/ContextShare'
import Alert from 'react-bootstrap/Alert';
import { deleteUser, getUsers } from '../service/allapi'
function Home() {
  const[alluserData,setalluserData]=useState([])
  const{registerData,setregisterData}=useContext(registerContext)
  const navigate=useNavigate()
  const[showspin,setshowspin]=useState(true)
  const[search,setSearch]=useState("")
  console.log(search);
  useEffect(() => {
    getAllEmployees()
    setTimeout(()=>{
      setshowspin(false)
    },1000);
  }, [search])
  // api call for get all employees
  const getAllEmployees=async()=>{
    const response=await getUsers(search)
    console.log(response);
    if(response.status==200){
      setalluserData(response.data)
    }
    else{
      alert('cannot fetch data')
    }
  }
  console.log(alluserData);
  // delete employee
  const removeUser=async(id)=>{
    const response=await deleteUser(id)
    if(response.status===200){
      getAllEmployees()
      alert('deleted successfully')
    }
    else{
      alert('operation failed !!! please try after some time')
    }
  }
  return (
    <>
    {
      registerData&&<Alert variant='success' onClose={()=>setregisterData("")} dismissible>
        {registerData.fname.toUpperCase()} registered sucessfully.....
      </Alert>
    }
    {
      showspin?
      <LoadingSpinner />:
      <div className='container'>
        <div>
          <div className='search d-flex align-items-center mt-3'>
            <span > Search:</span>
  
            <input className='form-control ms-3' style={{ width: '400px' }} type="text" onChange={e=>setSearch(e.target.value)} placeholder='search by Employee name...' />
  
            <Link to={'/add'} className='btn btn-primary ms-5'>
              <i class="fa-solid fa-user-plus"></i> Add
            </Link>
  
          </div>
  
          <div className="table mt-5">
            <h1 className='fw-bolder'>List Of All Employees</h1>
            <Hometable displayData={alluserData} removeUser={removeUser}/>
          </div>
        </div>
        </div>
    }
    </>
  )
}

export default Home