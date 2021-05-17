import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Card from '../components/card.jsx'
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack, Wrap, Input, Button, HStack, useControllableState } from "@chakra-ui/react"
import Login from './login.jsx'
import React, {useState, useEffect} from 'react'
import cookies from 'js-cookies';
import { Redirect } from 'react-router-dom'



export default function Home() {
  
  const router = useRouter()
  const ThreadsContext = React.createContext({
    threads: [], fetchThreads: () => {}
  })

  const [threads, setThreads] = useState([])
  const [toPage, setToPage] = useState(false)
  const [pageUrl, setPageUrl] = useState()
const fetchThreads = async () => {
const response = await fetch("http://localhost:8080/threads", {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    })
const threads = await response.json()
console.log(threads);
setThreads(threads.data)
}
useEffect(() => {
fetchThreads()
}, [])

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
   
    router.push("/search/" + formData.get("search"))
    


  }


  return (
    <Flex width="full" align="center" justifyContent="center" mt="10px">
    <VStack>
    <HStack>
    

<Link href="/login"><Button ml="900" variant="outline">Sign In</Button></Link>
<Link href="/register"><Button ml="900" variant="outline">Sign Up</Button></Link>

</HStack>
<HStack width="full">
<form onSubmit={handleSearch}>
<Input variant="flushed" placeholder="Search" name="search" type="text" id="search" />
<Button ml="900" variant="outline"  type="submit" >Search</Button>
</form>
</HStack>
<ThreadsContext.Provider value={{threads, fetchThreads}}>
      
      {threads.map((thread) => (
          <Card title={thread.title} date={thread.date} threadId={thread.thread_id} username={thread.username}></Card>
        ))}      
      </ThreadsContext.Provider>



    </VStack>
    </Flex>
  )
}
