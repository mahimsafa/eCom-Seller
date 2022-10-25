import { Tooltip } from 'antd'
import moment from 'moment'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet' 
import {HOST} from '../config'

export default function Home() {
  const fetchOrders = async () => {
    const res = await fetch(`${HOST}/orders`)
    return res.json()
  }

  const { data, status } = useQuery('orders', fetchOrders)

  if (status === 'loading') return <h1>Loading...</h1>
  if (status === 'error') return <h1>Error!</h1>
  const orders = data.Items.sort((a, b) => b.createdAt - a.createdAta || a.delivered - b.delivered)

  return (
    <main className='flex flex-col gap-5'>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {orders.map((order, index) => {
        return (
          <div className='w-full h-60  bg-white rounded-sm shadow-sm p-5' key={index}>
            <div className='flex gap-5 justify-between border'>
              <div className='my-auto z-10 bg-white w-60 h-44 flex justify-center items-center '>
                <div className={`px-5 pt-3 my-auto h-10 rounded-full flex justify-center items-center border uppercase ${order.delivered ? 'border-green-500 bg-green-400/20' : 'border border-orange-500 bg-orange-400/20'}`}>
                  <p className='text-center tracking-widest'>{order.delivered ? 'Delivered' : 'Pending'}</p>
                </div>
              </div>
              <div className='flex-1 space-y-2 py-1'>
                <div>
                  <p className='-ml-4 font-semibold'>Details: <Link to={`/orders/${order.id}`} className='ml-2'>{order.id}</Link></p>
                </div>
                <div className='flex flex-row'>
                  {order.products.slice(0, 5).map((product, i) => (
                    <div className={`h-40 opacity-70 ${order.products.length > 1 ? '-ml-20' : ''} z-0 transition-all duration-100 ease-in 
                    hover:z-10 hover:opacity-100`} key={i}>
                      <Tooltip placement="bottom" title={`${product.name} ($${product.totalprice})`}>
                        <img src={product.img} alt="" className={`w-48 rounded-sm object-contain shadow-md transition-all duration-200 ease-in-out hover:-mt-3 hover:scale-110 cursor-pointer`} />
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
              <div className='px-5 my-auto text-[1rem]'>
                <p>Name:<span className='text-red-400 mx-2'>{order.customer.name}</span></p>
                <div className='max-w-lg'>
                  <p className='text-ellipsis'>Address:<span className='text-red-400 mx-2'>{order.customer.address}</span></p>
                </div>
                <p>Price:<span className='text-red-400 mx-2'>${order.price}</span><sup>&#40;{order.products.length}&#41;</sup></p>
                <p>{moment(+(order.createdAt)).format('MMMM Do YYYY, h:mm A')}</p>
              </div>
            </div>
          </div>
        )
      })}
    </main>
  )
}
