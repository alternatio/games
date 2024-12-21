import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";
import style from "../../styles/pages/Home.module.scss";

interface ButtonsInterface {
  bet: number;
  money: number;
  isCrash: boolean;
  moneyIsSeized: boolean;
  targetCoefficientIsEnable: boolean;
  startGame: Function;
  giveMoney: Function;
}

const Buttons: FC<ButtonsInterface> = (props) => {
  return (
    <motion.div layout className={style.buttons}>
      <div className={style.money}>{props.money.toFixed(2)}$</div>
      <AnimatePresence>
        {(props.isCrash ||
          !props.targetCoefficientIsEnable ||
          props.moneyIsSeized) && (
          <motion.button
            initial={{ x: "2rem", marginLeft: "0rem" }}
            animate={{ x: "0rem", marginLeft: "1rem" }}
            exit={{ x: "2rem", marginLeft: "0rem" }}
            onClick={() => {
              props.isCrash && props.bet <= props.money
                ? props.startGame()
                : !props.moneyIsSeized && props.giveMoney();
            }}
            transition={{ duration: 0.2, type: "linear" }}
            className={style.buttonStart}
          >
            {props.isCrash
              ? "Старт"
              : props.moneyIsSeized
              ? "Ожидайте"
              : "Забрать"}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default React.memo(Buttons);
