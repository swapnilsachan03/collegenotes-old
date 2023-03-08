import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { BsMoonStarsFill } from "react-icons/bs"
import { MdOutlineWbSunny,  } from "react-icons/md"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(BsMoonStarsFill, MdOutlineWbSunny)

  return (
    <IconButton
      size="sm"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}

export default ColorModeSwitcher