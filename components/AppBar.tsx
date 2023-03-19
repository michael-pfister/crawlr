import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  faCircleChevronLeft,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect } from "react";

export default function AppBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", colorMode === "dark");
  }, [colorMode]);
  return (
    <header>
      <Flex justify={"space-between"} gap={2} padding={4}>
        <Flex align={"center"} gap={2}>
          <Link href="/">
            <Logo />
          </Link>
          <button aria-label="switch theme" onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <FontAwesomeIcon icon={faMoon} size="xl" color="black" />
            ) : (
              <FontAwesomeIcon icon={faSun} size="xl" color="white" />
            )}
          </button>
        </Flex>
        <Flex align={"center"} gap={2}>
          <Link href="/app">
            <Button bgColor={"red"} textColor={"#000"}>
              Crawl A Website
            </Button>
          </Link>
          <IconButton
            aria-label="open navigation menu"
            onClick={onOpen}
            className="invert dark:invert-0 dark:bg-white"
          >
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              size="xl"
              className="dark:invert"
            />
          </IconButton>
        </Flex>
      </Flex>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("white", "black")}>
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </header>
  );
}
