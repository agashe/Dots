import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Flex,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SearchModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [searchKeyword, setSearchKeyword] = useState("");

  function handleSearchInput(el) {
    setSearchKeyword(el.target.value);
  }

  function submitSearch() {
    window.location.href = "/s/" + searchKeyword;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign='center'>
        <ModalHeader>{t('search')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <FormControl>
            <Flex>
              <Input id='search-input' placeholder={t('search')} onChange={handleSearchInput} />
              <IconButton
                colorScheme='brand'
                icon={<Icon as={MdSearch} boxSize={6} />}
                ml='2'
                onClick={submitSearch}
              />
            </Flex>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
