import { Button, Select } from 'antd'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import {Helmet} from 'react-helmet' 
import {HOST} from '../config'


function Product() {
    const { orderId } = useParams()
    const [payload, setPayload] = useState({orderId})
    const [requesting,setRequesting] = useState(false)
    const fetchOrder = async () => {
        const res = await fetch(`${HOST}/orders/` + orderId)
        return res.json()
    }
    const handleUpdate = async () => {
        setRequesting(true)
        const res = await fetch(`${HOST}/orders/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        setRequesting(false)
        console.log(data)
    }
    const { data, status } = useQuery('order' + orderId, fetchOrder)
    if (status === 'loading') return <h1>Loding...</h1>
    if (status === 'error') return <h1>Error!</h1>
    return (
        <div className='flex flex-col gap-4'>
            <Helmet>
        <title>Order Details</title>
      </Helmet>
            <div className='w-full bg-white p-2 flex rounded-sm shadow-sm'>
                <div className='w-full'>
                    <h1 className='text-lg'>Customer Details:</h1>
                    <div className='flex text-lg text-gray-500 space-x-2'>
                        <div >
                            <p>Name:</p>
                            <p>Email:</p>
                            <p>Phone:</p>
                            <p>Address:</p>
                            <p>Price:</p>
                            <p>Time:</p>
                        </div>
                        <div>
                            <p>{data.Item.customer.name}</p>
                            <p>{data.Item.customer.email}</p>
                            <p>{data.Item.customer.phone}</p>
                            <p>{data.Item.customer.address}</p>
                            <p className='text-red-400'>{data.Item.price}</p>
                            <p className='text-sm'>{moment(+(data.Item.createdAt)).format('MMMM Do YYYY, h:mm A')}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between'>
                    <div className={`w-40 h-10 border rounded-md ${data.Item.delivered ? 'bg-green-400/50 border-green-400' : 'bg-red-400/40 border-red-400'}`}>
                        <p className='p-2 text-center uppercase tracking-widest'>{data.Item.delivered ? 'Delivered' : 'Pending'}</p>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <Select defaultValue={data.Item.delivered} className='w-40'
                            onChange={(val) => setPayload({ ...payload, action: val })}
                        >
                            <Select.Option value={true}>Delivered</Select.Option>
                            <Select.Option value={false}>Pending</Select.Option>
                        </Select>
                        <Button type='primary' ghost className='w-40' onClick={handleUpdate} disabled={requesting}>{requesting?'Updating...':'Update'}</Button>
                    </div>
                </div>
            </div>
            <div className='w-full bg-white p-2 grid grid-cols-7 rounded-sm shadow-sm'>
                {data.Item.products.map((product, index) => (
                    <div key={product.id + index} className='border m-1 rounded-sm p-2'>
                        <div className='h-36 flex justify-center items-center overflow-hidden '>
                            <img src={product.img} alt={product.name} className='w-48 rounded-sm object-contain shadow-md transition-all duration-200 ease-in-out hover:scale-105 my-auto' />
                        </div>
                        <div className='text-[1rem]'>
                            <h2>{product.name}</h2>
                            <p>{product.count} &times; $ {product.price} = $ {product.totalprice}</p>
                            <p className='text-gray-500'>{product.description}</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Product