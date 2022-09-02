import { Box, Flex, FormControl, FormLabel, Input, Button} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth, editAuth } from '../../lib/mutations'

const Edit = () => {

  const router = useRouter()
  const { id } = router.query
  const [isLoading, setIsLoading] = useState(false)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  async function handleEdit(e: any) {
    e.preventDefault()
    setIsLoading(true)

    if(password1 !== password2) {
      alert('Passwords do not match!')
      setIsLoading(false)
      router.push(`/edit/${id}`)
    }
    
    await editAuth('edit', {id, password1, password2})
    setIsLoading(false)
    router.push('/')
  }

  return (
    <form onSubmit={handleEdit}>

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
              <FormLabel>New Password</FormLabel>
              <Input width='500px' type='password' onChange={(e) => setPassword1(e.target.value)}></Input>
            </Box>

            <Box>
              <FormLabel>Confirm Password</FormLabel>
              <Input width='500px' type='password' onChange={(e) => setPassword2(e.target.value)}></Input>
            </Box>

            <Button
              type='submit'
              isLoading={isLoading}
              bg='green.400'
              color='black'
              sx={{
                '&:hover' : {
                  bg: 'green.600',
                }
              }}
            >
              Change
            </Button>

          </Flex>
        </FormControl>

        
      </Flex>
    </form>
  )
}

export default Edit