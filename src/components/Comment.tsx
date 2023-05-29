import React from 'react'

type Props = {
    content:string,
    username:string,
    id:string,
    createdAt:string,
}

export const Comment = (props: Props) => {
  return (
    <div className='bg-gray-900 border border-slate-700 rounded-lg px-5 py-2 flex flex-col gap-2'>
        <h3 className='text-md text-slate-300'>{props.username}</h3>
        <p className='text-lg text-slate-100'>{props.content}</p>
        <span className='text-sm text-slate-400'>Just Now</span>
    </div>
  )
}