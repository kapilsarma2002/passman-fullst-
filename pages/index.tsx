import { Link, Box, Button, Flex, Table, Text, Thead, Tbody, Input, Tr, Th, Td } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Nav from '../components/navBar'

const arr = new Array(50).fill(1).map((_,i) => `password ${i+1}`)

const Home = () => {

  return (
    <Box height='100%' width='100%' color='white' bg='gray.900'
      borderRadius='30px' border='1px solid gray' overflowY='scroll'
    >

      <Flex align='center' justify='space-evenly' padding='20px'>
        <Text> {arr.length} Apps and Websites</Text>
          <Link href='/add'>
            <Button
              bg='green.400'
              rightIcon={<AddIcon/ >}
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
            arr.map((val, idx) => (
              <Tr key={idx}>
                <Td>{idx+1}</Td>
                <Td>name</Td>
                <Td>email</Td>
                <Td>{val}</Td>
                <Td>website</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>

    </Box>
  )
}

export default Home