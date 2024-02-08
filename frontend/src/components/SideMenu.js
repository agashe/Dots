import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "./NavigationMenu";

export function SideMenu({ isOpen, onClose }) {
  const { t } = useTranslation();

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>
        <DrawerBody>
          <NavigationMenu />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
