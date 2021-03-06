import React, { useContext } from 'react';
import Link from 'next/link';
import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Text,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import { RiMovie2Line } from 'react-icons/ri';

import ColorModeSwitcher from './ColorModeSwitcher';
import LoginLink from './LoginLink';
import Searchbar from './Searchbar';
import UserAvatar from './UserAvatar';
import { UserContext } from '../contexts/userContext';

const NavbarResponsive = () => {
    const { user } = useContext(UserContext);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const buttonRef = React.useRef();

    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const backgroundColor = useColorModeValue('white', 'gray.800');

    return (
        <Flex
            justify="center"
            pos="sticky"
            zIndex={1}
            top="0px"
            borderBottom="1px"
            borderColor={borderColor}
            background={backgroundColor}
        >
            <Flex
                justify="space-between"
                w={['96%', '96%', '96%', '75%']}
                py="12px"
            >
                <Link href="/">
                    <Flex
                        justify="center"
                        align="center"
                        w="40px"
                        h="40px"
                        _hover={{ cursor: 'pointer' }}
                    >
                        <Icon as={RiMovie2Line} w="32px" h="32px" />
                    </Flex>
                </Link>
                <Searchbar />
                <Flex align="center">
                    <IconButton
                        variant="ghost"
                        icon={<FaBars />}
                        ref={buttonRef}
                        onClick={onOpen}
                    />
                </Flex>
                <Drawer
                    isOpen={isOpen}
                    placement="top"
                    onClose={onClose}
                    finalFocusRef={buttonRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Flex justify="space-between" align="center">
                                <Flex align="center" columnGap="8px">
                                    {user.isLoggedIn && <UserAvatar />}
                                    <ColorModeSwitcher />
                                </Flex>
                                <Text>Navigation</Text>
                                {user.isLoggedIn ? (
                                    <Flex w="80px" />
                                ) : (
                                    <Flex w="40px" />
                                )}
                            </Flex>
                        </DrawerHeader>
                        <Divider />
                        <DrawerBody>
                            <Flex flexDir="column">
                                {!user.isLoggedIn && <LoginLink />}
                                <Link href="/movies/popular?page=1">
                                    <Button variant="ghost">Movies</Button>
                                </Link>
                                {user.isLoggedIn && (
                                    <>
                                        <Link href="/favorites?page=1">
                                            <Button variant="ghost">
                                                Favorites
                                            </Button>
                                        </Link>
                                        <Link href="/watchlist?page=1">
                                            <Button variant="ghost">
                                                Watchlist
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Flex>
    );
};

export default NavbarResponsive;
