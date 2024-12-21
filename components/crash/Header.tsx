import Image from "next/image";
import React, { FC } from "react";
import style from "../../styles/components/Header.module.scss";
import themeIcon from "/images/theme-icon.svg";

interface HeaderInterface {
  handleIsDarkTheme: Function;
  isDarkTheme: boolean;
}

const Header: FC<HeaderInterface> = (props) => {
  return (
    <div className={style.header}>
      <div className={style.logoPart}>
        CRASH
        <span className={style.accent}>*</span>
      </div>
      <div className={style.rightPart}>
        <button
          onClick={() => props.handleIsDarkTheme(!props.isDarkTheme)}
          className={style.themeButton}
        >
          <div className={style.image}>
            <Image src={themeIcon} alt={"theme-icon"} />
          </div>
        </button>
        <a
          className={style.link}
          rel={"noreferrer"}
          target={"_blank"}
          href="https://github.com/alternatio"
        >
          Github
        </a>
      </div>
    </div>
  );
};

export default React.memo(Header);
