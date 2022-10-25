import React, { useState } from 'react'
import { Input, Form, Button, Space, Upload } from 'antd'
import { Helmet } from 'react-helmet'
import { HOST } from '../config'

export default function Checkout() {
  const [product, setProduct] = useState({})
  const [file, setFile] = useState(null)


  async function handleImage(e) {
    const file = e.target.files[0]
    setFile(file)
  }

  const [form] = Form.useForm()
  
  async function handleSubmit() {
    if(!file) return
    // get secure url
    const { url } = await fetch(`${HOST}/s3url`).then(res => res.json())
    await fetch(url,{
      method:'PUT',
      body:file,
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })

    const imageUrl = url.split('?')[0]

    const payload = {
      ...product,
      price: +(product.price),
      img: imageUrl
    }

    await fetch(`${HOST}/products`,{
      method:'POST',
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(payload)
    })
    setProduct({})
    setFile(null)
    form.resetFields()
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }



  return (
    <div className='bg-white p-2 shadow-sm border border-red-300 w-full'>
      <Helmet>
        <title>Add New Product</title>
      </Helmet>
      <div
        className='w-2/3 mx-auto'
      >
        <Form
        form={form}
          name="basic"
          labelCol={{ span: 5 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name='name'
            rules={[{ required: true, message: 'Please enter product name!' }]}
          >
            <Input name='name' onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Description"
            name='description'
            rules={[{ required: true, message: 'Please enter product description!' }]}
          >
            <Input.TextArea style={{ resize: 'none', height: 90 }} name='description' onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Image"
            name='img'
            rules={[{ required: true, message: 'Please select product image!' }]}
          >
            <Input name='img' type='file' accept='image/*' onChange={handleImage} />
          </Form.Item>
          <Form.Item
            label="Price"
            name='price'
            rules={[{ required: true, message: 'Please enter product price!' }]}
          >
            <Input name='price' onChange={handleChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8 }}>
            <Space>
              <Button onClick={handleSubmit}>
                Back To Cart
              </Button>
              <Button type="primary" htmlType="submit" >
                Confirm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
