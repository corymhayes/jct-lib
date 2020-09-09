import React from "react"
import { 
    Box, 
    Text,
    Drawer, 
    DrawerBody, 
    DrawerHeader, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    useDisclosure,
    List,
    ListItem,
    Link
 } from "@chakra-ui/core"
// import { Link as RouterLink } from 'react-router-dom'



const NavigationDrawer = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const firstField = React.useRef()

  return (
    <>
      <Box display={{ sm: "block", md: "none" }} onClick={onOpen}>
        <svg
          fill="#ff7e3c"
          width="24px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            initialFocusRef={""}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent bg='#292929' width='60%'>
              <DrawerCloseButton border='none' color='brand.900' />
              <DrawerHeader color='#fff'>Sites</DrawerHeader>

              <DrawerBody as="nav">
                <List pl={0}>
                  <ListItem>
                    <Link ref={firstField} to="/christopher">
                      <Text color="#fff" textDecor="none">christopher</Text>
                    </Link>
                  </ListItem>
                </List>
              </DrawerBody>
            </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default NavigationDrawer