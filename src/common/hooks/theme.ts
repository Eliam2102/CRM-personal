import { useThemeStore } from '../../store/theme/themeStore'
import { darkTheme } from '../themes/dark'
import { lightTheme } from '../themes/light'

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme)
  return theme === 'dark' ? darkTheme : lightTheme
}