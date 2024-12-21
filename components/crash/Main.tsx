import React, { FC } from "react";
import style from "../../styles/pages/Home.module.scss";
import Buttons from "./Buttons";
import History from "./History";
import InputBlock1 from "./InputBlock1";
import InputBlock2 from "./InputBlock2";

interface MainInterface {
  money: number;
  setBet: Function;
  bet: number;
  targetCoefficient: number;
  targetCoefficientIsEnable: boolean;
  setTargetCoefficient: Function;
  handleTargetCoefficient: Function;

  isCrash: boolean;
  history: number[];
  moneyIsSeized: boolean;
  startGame: Function;
  giveMoney: Function;
}

const Main: FC<MainInterface> = (props) => {
  return (
    <main className={style.main}>
      <Buttons
        bet={props.bet}
        isCrash={props.isCrash}
        money={props.money}
        targetCoefficientIsEnable={props.targetCoefficientIsEnable}
        moneyIsSeized={props.moneyIsSeized}
        startGame={props.startGame}
        giveMoney={props.giveMoney}
      />
      <InputBlock1 money={props.money} setBet={props.setBet} bet={props.bet} />
      <InputBlock2
        isCrash={props.isCrash}
        targetCoefficient={props.targetCoefficient}
        targetCoefficientIsEnable={props.targetCoefficientIsEnable}
        setTargetCoefficient={props.setTargetCoefficient}
        handleTargetCoefficient={props.handleTargetCoefficient}
      />
      <History history={props.history} />
    </main>
  );
};

export default React.memo(Main);
