import { Flex, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Pagination({ prevDisabled, nextDisabled, handlePrev, handleNext }) {
  const { t } = useTranslation();

  return (
    <Flex w='100%' py={0} mt={5} justifyContent='center'>
      <Button mr={2} isDisabled={prevDisabled} onClick={handlePrev}>{t('actions.prev')}</Button>
      <Button ml={2} isDisabled={nextDisabled} onClick={handleNext}>{t('actions.next')}</Button>
    </Flex>
  );
}
