import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ThemeSwitcher.module.scss"
import {Theme, useTheme} from "app/providers/ThemeProvider";
import {BaseButton, ThemeButton} from "shared/ui/BaseButton/BaseButton";
import DarcIcon from "shared/assets/icons/theme-dark.svg"
import LightIcon from "shared/assets/icons/theme-light.svg"

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  const {theme, toggleTheme} = useTheme()

  return (
    <BaseButton
      theme={ThemeButton.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarcIcon/> : <LightIcon/>}
    </BaseButton>
  );
};