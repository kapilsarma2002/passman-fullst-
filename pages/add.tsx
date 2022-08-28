import { Box, Flex, FormControl, FormLabel, Input, Button} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SendData } from '../lib/addData'
import { auth } from '../lib/mutations'

const Add = () => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [usermail, setUsermail] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')

  async function handleAdd(e: any) {
    e.preventDefault()
    setIsLoading(true)
    
    await auth('add', {username, usermail, password, url})
    setIsLoading(false)
    router.push('/')
  }

  return (
    <form onSubmit={handleAdd}>

      <Flex height='calc(100vh - 65px)' align='center' justify='center'>

        <FormControl
          height='80%'
          border='2px solid gray.500'
          borderRadius='30px'
          paddingX='500px'
          >
          <Flex 
            height='100%'
            color='gray.500'
            flexFlow='column'
            align='center'
            justify='space-evenly'  
          >
            <Box>
              <FormLabel>Username</FormLabel>
              <Input type='text' onChange={(e) => setUsername(e.target.value)}></Input>
            </Box>

            <Box>
              <FormLabel>Account Mail</FormLabel>
              <Input type='email' onChange={(e) => setUsermail(e.target.value)}></Input>
            </Box>

            <Box>
              <FormLabel>Account Password</FormLabel>
              <Input type='password' onChange={(e) => setPassword(e.target.value)}></Input>
            </Box>

            <Box>
              <FormLabel>Application / Webiste URL</FormLabel>
              <Input type='url' onChange={(e) => setUrl(e.target.value)}></Input>
            </Box>

            <Button
              type='submit'
              isLoading={isLoading}
              bg='green.400'
              color='black'
            >
              Add
            </Button>

          </Flex>
        </FormControl>

        
      </Flex>
    </form>
  )
}

export default Add