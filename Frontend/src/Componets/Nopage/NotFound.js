import React from 'react'
import imgs from '../Assets/no-course-found.png';
export default function NotFound() {
  return (
        <div className="bg-gray-900 text-white overflow-hidden mt-2" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'55vh',width:'100%'}}>
          <img src={imgs} alt='no_course_found'/>
        </div>
  )
}
