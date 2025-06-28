import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//react router dom added
import { BrowserRouter } from "react-router";

//tanstack query for query control - connecting frontend to backend by sending requests
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
   
  <StrictMode>

<BrowserRouter> 
<QueryClientProvider client={queryClient}>  
    <App /> 
    </QueryClientProvider>             
  </BrowserRouter>
   
  </StrictMode>,
)