import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

import Amplify from 'aws-amplify'
import AwsConfig from './aws-exports'
import { Authenticator} from '@aws-amplify/ui-react'
Amplify.configure(AwsConfig)

const App = ({ children }) => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Authenticator
        hideSignUp={true}
        variation='modal'
      >
        {({ signOut, user }) => (
          <div className="bg-slate-200 min-h-screen overflow-hidden">
            <Header signOut={signOut} user={user} />
            <div className="w-full mx-auto flex mt-16">
              <div className="w-80 bg-white min-h-screen p-5 shadow-sm mr-1 flex flex-col gap-4 fixed left-0">
                <Button type="primary" onClick={() => navigate('/addproduct')}>Add Product</Button>
                <Button onClick={() => navigate('/orders')}>Orders</Button>
                <Button onClick={() => navigate('/products')}>Products</Button>
                <Button onClick={signOut} danger>SignOut</Button>

              </div>
              <div className="py-5 px-3 z-10 w-full  shadow-sm ml-80 ">
                {children}
              </div>
            </div>
          </div>
        )}
      </Authenticator>
    </>
  )
}
export default App;