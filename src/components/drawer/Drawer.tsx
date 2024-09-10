import React from 'react'
import { Modal, ModalContent } from '@nextui-org/react'

interface Props extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
}

export const Drawer: React.FC<Props> = ({ ...props }) => {
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={props.isOpen}
      onClose={props.onClose}
      placement="center"
      backdrop="opaque"
      size="full"
      classNames={{
        wrapper: 'flex justify-end',
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            x: 50,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
      className="rounded-md w-max h-[calc(100dvh)] max-h-screen z-[120]"
    >
      <ModalContent className="z-[120]">{props.children}</ModalContent>
    </Modal>
  )
}
