import React from "react";
import { 
    Box, 
    Drawer, 
    DrawerBody, 
    DrawerHeader, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    useDisclosure,
    Icon,
 } from "@chakra-ui/core";


const SettingsDrawer = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  
  return (
    <Box display={{ sm: "block", md: "none" }} onClick={onOpen}>

      {
        props.iconImage === 'none' ?
          <Box size="18px" color="brand.900" />
        :
          <Icon name={props.iconImage} size="18px" color="brand.900" />
      }
      
      <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          initialFocusRef={props.firstField}
      >
        <DrawerOverlay />
        <DrawerContent bg='#292929' width="60%">
          <DrawerCloseButton border='none' color='brand.900' backgroundColor='brand.800' />
          <DrawerHeader color="#fff">Settings</DrawerHeader>
          <DrawerBody p={0}> 
            {props.children}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SettingsDrawer