import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

import './index.css'
import 'antd/dist/antd.css';
import '@aws-amplify/ui-react/styles.css';

import App from './App'
import AddProduct from './pages/addproduct';
import Home from './pages';
import Products from './pages/products';
import Order from './pages/order';

const queryClient = new QueryClient()

function Main() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App><Home /></App>} />
          <Route path='/orders' element={<App><Home /></App>} />
          <Route path='addproduct' element={<App><AddProduct /></App>} />
          <Route path='products' element={<App><Products /></App>} />
          <Route path='orders/:orderId' element={<App><Order /></App>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
