import React from 'react'
import { Table} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../service/baseurl';
function Hometable({displayData,removeUser}) {
  console.log(displayData);
  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Fullname</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Profile</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          displayData.length>0?
          displayData.map((item,index)=>(
            <tr>
          <td>{index+1}</td>
          <td>{item.fname} {item.lname}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td><button className={item.status==="Active"?"btn btn-success":"btn btn-danger"}>{item.status}</button></td>
          <td><img style={{width:'70px',height:'70px'}} src={`${BASE_URL}/uploads/${item.profile}`} alt="" /></td>
          <td>
            <Link to={`/view/${item._id}`}><i class="fa-solid fa-eye fs-4 me-2"></i></Link>
            <Link to={`/edit/${item._id}`}><i class="fa-solid fa-pen fs-4 me-2"></i></Link>
            <span onClick={()=>removeUser(item._id)}><i class="fa-solid fa-trash text-success fs-4"></i></span>
          </td>
        </tr>
          )):(<tr className='fw-bolder mt-5 text-danger w-100'>
            Nothing to display!!!
          </tr>
          )
        }
        
      </tbody>
    </Table></>
  )
}

export default Hometable