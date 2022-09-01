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
import { AddIcon, DeleteIcon, ViewIcon, EditIcon } from '@chakra-ui/icons'
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import { useEffect, useState } from 'react'
import prisma from '../lib/prisma'
import process from 'process'
import { validateToken } from '../lib/auth'


const Home = ({ data }: any) => {
  
  const { onClose } = useDisclosure()
  const [index, setIndex] = useState(1)
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState({})
  const key = 'MySuPeRsEcReTpASsWoRd'
  
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
          reqRow.password = val.encryptedPassword,
          reqRow.url = val.websiteURL
        }
      })
      return reqRow
    }
    setInfo(getProps())
  }, [index])

  const decrypt = () => {

    // const { REACT_APP_SUPER_KEY } = process.env
    // console.log(REACT_APP_SUPER_KEY)
    // const key = REACT_APP_SUPER_KEY as string
    // console.log(key)

    let decryptedPassword: string
    let pass: string

    data.map((val: any, _: any) => {
      pass = val.encryptedPassword
      decryptedPassword =  CryptoAES.decrypt(pass, key).toString(CryptoENC)
      val.encryptedPassword = decryptedPassword
    })

    setIndex(0)

  }

  const encrypt = () => {

    let encryptedPass: string
    let pass: string

    data.map((val: any, _: any) => {
      pass = val.encryptedPassword
      encryptedPass =  CryptoAES.encrypt(pass, key).toString()
      val.encryptedPassword = encryptedPass
    })

    setIndex(-1)
  }

  const editRow = async (idx: any) => {
    // let user = await prisma.userInfo.findFirst({
    //   where: {
    //     id: idx,
    //   }
    // })

    // console.log(user)
  }

  const deleteRow = (idx: any) => {

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
                E-mail
                <Input defaultValue={info.email} />
              </Box>
              <Box width='auto' margin='20px'>
                Password 
                <Flex>
                  <Input defaultValue={info.password} marginRight='5px'/>
                </Flex>
              </Box>
              <Box width='auto' margin='20px'>
                Website
                <Input defaultValue={info.url} />
              </Box>
            </ModalBody>

            <ModalFooter alignContent='center'>
              <Button 
                bg='red.500'
                color='black'
                mr={3}
                sx={{
                  '&:hover': {
                    bg: 'red.600'
                  }
                }}
                onClick={() => setOpen(!open)}
              >
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
        {/* <Input placeholder='Search Passwords' width='500px'></Input> */}
        <Button
          colorScheme='green'
          size='md'
          onClick={decrypt}
        >
          De-Crypt
        </Button>
        <Button
          colorScheme='pink'
          size='md'
          onClick={encrypt}
        >
          En-Crypt
        </Button>
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
                  <Flex alignItems='row-reverse'>
                    <Button 
                      marginLeft='5px'
                      onClick={() => {
                        handleClick(val.id)
                      }}
                      colorScheme='blue'
                      rightIcon={<ViewIcon />}
                      >
                      View
                    </Button>
                    <Button
                      marginLeft='5px'
                      marginRight='5px'
                      onClick={() => {
                        editRow(val.id)
                      }}
                      colorScheme='orange'
                      rightIcon={<EditIcon />}
                      >
                    </Button>
                    <Button
                      marginLeft='5px'
                      marginRight='5px'
                      onClick={() => {
                        deleteRow(val.id)
                      }}
                      colorScheme='red'
                      rightIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>

    </Box>
  )
}

export const getServerSideProps =  async ({ req }: any) => {

  let user

  try { 
    user = validateToken(req.cookies.PASS)
  } catch(e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      }
    }
  }

  const data = await prisma.userInfo.findMany({
    where: {
      userId: user.id,
    }
  })

  return {
    props: {data},
  }
}

export default Home