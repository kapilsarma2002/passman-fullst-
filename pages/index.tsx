import {
  Link, 
  Box, 
  Button,
  Flex, 
  Table,
  Text,
  Thead, 
  Tbody, 
  Input, 
  Tr, Th, Td, 
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  propNames,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import CryptoJS from 'crypto-js'
import { useEffect, useState, useRef } from 'react'
import prisma from "../lib/prisma"
import process from "process"


const Home = ({ data }: any) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [index, setIndex] = useState(1)
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState({})
  const { REACT_APP_SUPER_KEY } = process.env;
  const key = REACT_APP_SUPER_KEY as string

  const handleClick = (idx: any) => {
    setIndex(idx)
    setOpen(!open)
  }

  useEffect(() => {
    const getProps = () => {
  
      let reqRow : any = {}
      let hasChanged: boolean = false
  
      data.map((val: any, _: any) => {
        if(hasChanged) return reqRow;
        if(val.id === index) {
          hasChanged = true
          reqRow.name = val.accountName,
          reqRow.email = val.accountEmail,
          reqRow.password = CryptoJS.AES.decrypt(val.encryptedPassword, key).toString(),
          reqRow.url = val.websiteURL
        }
      })
      return reqRow
    }
    setInfo(getProps())
  }, [index])

  // useEffect(() => {
  //   const pass = info.password
  //   info.password = CryptoJS.AES.decrypt(pass, key).toString()
  // }, [info.password])

  const decrypt = () => {
    
    // console.log(pass)
  }

  return (
    <Box height='100%' width='100%' color='white' bg='gray.900' fontSize='lg'
      borderRadius='17px' border='1px solid gray' overflowY='scroll'
    >

      <Modal isOpen={open} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg='gray.900'>
            <ModalHeader>Website Info</ModalHeader>
            <ModalCloseButton onClick={() => setOpen(!open)} />
            <ModalBody color={'white'}>
              <Box width='auto' margin='20px'>
                Name
                <Input defaultValue={info.name} />
              </Box>
              <Box width='auto' margin='20px'>
                e-mail
                <Input defaultValue={info.email} />
              </Box>
              <Box width='auto' margin='20px'>
                Password 
                <Flex>
                  <Input defaultValue={info.password} marginRight='5px'/>
                  <Button size='md'onClick={decrypt}>de-crypt</Button>
                </Flex>
              </Box>
              <Box width='auto' margin='20px'>
                Website
                <Input defaultValue={info.url} />
              </Box>
            </ModalBody>

            <ModalFooter alignContent='center'>
              <Button colorScheme='red' mr={3} onClick={() => setOpen(!open)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      <Flex align='center' justify='space-evenly' padding='20px'>
        <Text> {data.length} Apps and Websites</Text>
          <Link href='/add'>
            <Button
              bg='green.400'
              color='black'
              rightIcon={<AddIcon/ >}
              sx={{
                '&:hover' : {
                  bg: 'green.600',
                }
              }}
            >
              Add
            </Button>
          </Link>
        <Input placeholder='Search Passwords' width='500px'></Input>
      </Flex>

      <Table variant='unstyled'>
        <Thead borderBottom='1px solid' borderColor= 'rgba(255,255,255,0.2)'>
          <Tr fontSize='xl' fontWeight='bold'>
            <Th>id</Th>
            <Th>Name</Th>
            <Th>E-Mail</Th>
            <Th>Password</Th>
            <Th>Website</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data.map((val: any,idx: any) => (
              <Tr key={idx}>
                <Td>{val.id}</Td>
                <Td>{val.accountName}</Td>
                <Td>{val.accountEmail}</Td>
                <Td>{val.encryptedPassword}</Td>
                <Td>{val.websiteURL}</Td>
                <Td>
                  <Button 
                    onClick={() => {
                      handleClick(val.id)
                    }}
                    colorScheme='blue'
                    >
                      view
                  </Button>
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>

    </Box>
  )
}

export const getStaticProps =  async () => {
  const data = await prisma.userInfo.findMany({})

  return {
    props: {data},
  }
}

export default Home