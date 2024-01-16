import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerContext } from '../components/ContextShare';
import { useNavigate, useParams } from 'react-router-dom';
import { editUser, getUsers } from '../service/allapi';
import { BASE_URL } from '../service/baseurl';

function Edit() {
  const{registerData,setregisterData}=useContext(registerContext)
  const navigate=useNavigate()
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
    
  ];
  // to hold normal inputs
  const[normalInputs,setnormalInput]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })
  // to hold status
  const[status,setStatus]=useState("")
  // to hold file uploading content
  const[profile,setProfile]=useState("")
  const[preview,setpreview]=useState("")
  useEffect(() => {
    if(profile){
      setexistingImg("")
        URL.createObjectURL(profile)
        setpreview( URL.createObjectURL(profile))
    }
  }, [profile])
  // to get single item
  const{id}=useParams()
  const[existingImg,setexistingImg]=useState("")
  console.log(id);
  useEffect(() => {
    getUser()
  }, [])
  
  const getUser=async()=>{
   const{data}= await getUsers("")
   console.log(data);
   let existingUser=data.find(item=>item._id===id);
   setnormalInput(existingUser)
   setStatus(existingUser.status)
   setexistingImg(existingUser.profile)
  }
  
  // to get normal inputs from textbox
  const getandsetInput=(e)=>{
    const{name,value}=e.target
    setnormalInput({...normalInputs,[name]:value})
  }
  console.log(normalInputs);
  // to get status
  console.log(status);
  // to get profile
const getandsetprofile=(e)=>{
  console.log(e.target.files[0]);
  setProfile(e.target.files[0])
}
console.log(profile);
 const handleSubmit=async(e)=>{
  e.preventDefault()
  const{fname,lname,email,mobile,gender,location}=normalInputs
  if(!fname||!lname||!email||!mobile||!gender||!location||!status||!profile){
    toast.warning("please fill the form completely")
  }
  else{
    // toast.success("form filled completely")
    const data=new FormData()
    data.append("fname",fname)
    data.append("lname",lname)
    data.append("email",email)
    data.append("mobile",mobile)
    data.append("gender",gender)
    data.append("location",location)
    data.append("status",status)
    profile? data.append("profile",profile):data.append("profile",existingImg)
    if(profile){
      var headers={
        "content-type":"multipart/form-data"
    }
    }
    else{
      var headers=""
    }
    //  make api call
      const result=await editUser(id,data,headers)
      console.log(result);
      if(result.status===200){
      navigate('/')
     }
     else{
      toast.error("request failed")
     }
  }
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
<div className='container'>
<h1 className='text-center fw-bolder'> update Employee Details</h1>
<div className='shadow border rounded p-2 mt-3'>
<div className='text-center'>
  <img style={{width:"70px"}} src={preview ? preview:`${BASE_URL}/uploads/${existingImg}`} alt="no image" />
</div>
<Form className="mt-3">
  <Row>
    {/* first name */}
  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputfname" label="First Name">
  <Form.Control type="text" name='fname' value={normalInputs.fname} onChange={e=>getandsetInput(e)} placeholder="First Name" />
</FloatingLabel>
{/* last name */}
<FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputlname" label="Last Name">
  <Form.Control type="text" name='lname' value={normalInputs.lname} onChange={e=>getandsetInput(e)} placeholder="Last Name" />
</FloatingLabel>
{/* email */}
<FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
  <Form.Control type="e-mail" name='email' value={normalInputs.email} onChange={e=>getandsetInput(e)} placeholder="Email" />
</FloatingLabel>
{/* mobile number*/}
<FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputmobile" label="Mobile Number">
  <Form.Control type="text" name='mobile'value={normalInputs.mobile} onChange={e=>getandsetInput(e)} placeholder="Mobile Number" />
</FloatingLabel>
{/* gender */}
<Form.Group className='mb-3 col-lg-6'>
<Form.Label>Select Gender</Form.Label>
<Form.Check
     type={"radio"}
     value="Male"
     label="Male"
     name='gender'
     onChange={e=>getandsetInput(e)}
     checked={normalInputs.gender==="Male"?true:false}
    />
    <Form.Check
     type={"radio"}
     value="Female"
     label="Female"
     name='gender'
     onChange={e=>getandsetInput(e)}
     checked={normalInputs.gender==="Female"?true:false}
    />
</Form.Group>
{/* status */}
<Form.Group className='mb-3 col-lg-6'>
<Form.Label>Select Employee Status</Form.Label>
<Select placeholder={status} options={options} onChange={e=>setStatus(e.value)}/>
</Form.Group>
{/* profile photo */}
<Form.Group className='mb-3 col-lg-6'>
<Form.Label>Choose a Profile Picture</Form.Label>
<Form.Control type="file" onChange={e=>getandsetprofile(e)} name='user_profile'/>
</Form.Group>
{/* location */}
<FloatingLabel className='mb-3 col-lg-6 mt-4' controlId="floatingInputlocation" label="Location">
  <Form.Control type="text" name='location' value={normalInputs.location} onChange={e=>getandsetInput(e)} placeholder="Location" />
</FloatingLabel>
<Button type='submit' variant='primary' onClick={e=>handleSubmit(e)}>Submit</Button>
  </Row>
  
</Form>
</div>
</div>
   }
   <ToastContainer />
    
    </>
  )
}

export default Edit