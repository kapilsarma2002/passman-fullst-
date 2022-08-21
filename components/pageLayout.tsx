import {Box, Flex} from '@chakra-ui/react'
import Nav from '../components/navBar'

const PageLayout = ({ children }: any) => {
  return (
    <Box height='100vh' width='100vw' color='white' bg='rgb(0,0,25)'>

    {/* navbar */}
    <Box height='65px'>
      <Nav /> 
    </Box>

    {/* main page */}
    <Box 
      height='calc(100vh - 65px)' paddingY='80px' paddingX='200px' 
      borderRadius='30px'
    >
      <Flex 
        height='100%' justify="center" align="center"
      >
        {children}
          
      </Flex>
    </Box>

    </Box>
  )
}

export default PageLayout