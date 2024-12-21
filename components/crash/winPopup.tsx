import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";
import style from "../../styles/pages/Home.module.scss";

interface WinPopupInterface {
  handleWinPopup: Function;
  winPopupIsVisible: boolean;
  totalWin: number;
}

const WinPopup: FC<WinPopupInterface> = (props) => {
  setTimeout(() => {
    props.handleWinPopup(false);
  }, 5000);

  return (
    <AnimatePresence>
      {props.winPopupIsVisible && (
        <motion.div
          initial={{ y: "-7.5rem" }}
          animate={{ y: "0rem" }}
          exit={{ y: "-7.5rem" }}
          transition={{
            duration: 3,
            type: "spring",
            stiffness: 400,
            damping: 100,
          }}
          className={style.popup}
        >
          Ты забрал: {props.totalWin.toFixed(2)}$
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(WinPopup);
