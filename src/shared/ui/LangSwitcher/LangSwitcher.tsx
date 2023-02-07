import {useTranslation} from "react-i18next";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./LangSwitcher.module.scss"
import {BaseButton, ThemeButton} from "shared/ui/BaseButton/BaseButton";

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {
  const {t, i18n} = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
  }

  return (
      <BaseButton
        className={classNames(cls.LangSwitcher, {}, [className])}
        theme={ThemeButton.CLEAR}
        onClick={toggle}
      >
        {t("lang")}
      </BaseButton>
  );
};