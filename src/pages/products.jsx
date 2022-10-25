import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'
import { HOST } from '../config'

function Products() {
    const fetchProducts = async () => {
        const res = await fetch(`${HOST}/products`)
        return res.json()
    }
    const { data, status } = useQuery('products', fetchProducts)

    if (status === 'loading') return <h1>Loading...</h1>
    if (status === 'error') return <h1>Error!</h1>

    const products = data.Items.sort((a, b) => b.createdAt - a.createdAt)

    function handleDelete(id) {
        fetch(`${HOST}/products`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        }).then(res=>console.log(res.json()))
    }

    return (
        <main className='flex flex-col gap-5'>
            <Helmet>
                <title>Products</title>
            </Helmet>
            {products.map((product, index) => (
                <div className='bg-white p-2 shadow-sm h-44 w-full flex space-x-3 items-center justify-between'
                    key={product.id + index}>
                    <div className='h-36 flex justify-center items-center overflow-hidden'>
                        <img src={product.img} alt={product.id} className='w-48 rounded-sm object-contain shadow-md transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer my-auto' />
                    </div>
                    <div className='flex-auto flex flex-col h-full p-2 '>
                        <p className='text-xl font-semibold'>{product.name}</p>
                        <p className='font-semibold text-red-400 -mt-3'>${product.price}</p>
                        <p className='text-sm text-gray-400 '>{product.description}</p>

                    </div>
                    <div className='flex justify-end flex-col h-full p-2'>
                        <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(product.id)}>Delete</Button>
                    </div>
                </div>
            ))}
        </main>
    )
}

export default Products