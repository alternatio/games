import Head from "next/head";
import React, { useState } from "react";
import Header from "../../components/crash/Header";
import Main from "../../components/crash/Main";
import Scoreboard from "../../components/crash/Scoreboard";
import WinPopup from "../../components/crash/winPopup";
import { Wrapper } from "../../components/crash/Wrapper";
import { getTime } from "../../functions/getTime";

const Home = () => {
  const [isDarkTheme, handleIsDarkTheme] = useState<boolean>(false);
  const [coefficient, setCoefficient] = useState<number>(1);
  const [isCrash, handleIsCrash] = useState<boolean>(true);
  const [bet, setBet] = useState<number>(0);
  const [money, setMoney] = useState<number>(100);
  const [moneyIsSeized, handleMoneyIsSeized] = useState<boolean>(true);
  const [targetCoefficient, setTargetCoefficient] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([]);
  const [targetCoefficientIsEnable, handleTargetCoefficient] =
    useState<boolean>(false);
  const [winPopupIsVisible, handleWinPopup] = useState<boolean>(false);
  const [totalWin, setTotalWin] = useState<number>(0);

  const giveMoney: Function = (exponential?: number) => {
    let totalMoneyReceived = 0;

    if (exponential) {
      totalMoneyReceived = bet * exponential;
      setMoney(totalMoneyReceived + money - bet);
      console.log("1");
    } else {
      totalMoneyReceived = bet * coefficient;
      setMoney(totalMoneyReceived + money);
      console.log("2");
    }

    console.log(totalMoneyReceived);

    setTotalWin(totalMoneyReceived);
    handleWinPopup(true);
    handleMoneyIsSeized(true);
  };

  const startGame: Function = () => {
    const time = getTime();
    let step = 0;
    handleIsCrash(false);
    handleMoneyIsSeized(false);
    setMoney(money - bet);
    let innerMoneyIsSeized = false;

    let exponential = 1;

    const intervalFunction: Function = () => {
      step += 1;
      exponential = Math.exp((Math.exp(step / 400) - 1) / (step / (step / 2)));

      if (
        targetCoefficientIsEnable &&
        !innerMoneyIsSeized &&
        exponential >= targetCoefficient
      ) {
        handleMoneyIsSeized(true);
        innerMoneyIsSeized = true;
        giveMoney(exponential);
      }
      setCoefficient(exponential);
    };

    // interval of exponential value
    const interval = setInterval(() => {
      intervalFunction();
    }, 15);

    setTimeout(() => {
      handleIsCrash(true);
      if (history.length > 3) history.shift();
      setHistory([...history, exponential]);
      console.log(exponential);
      clearInterval(interval);
    }, time);
  };

  return (
    <>
      <Head>
        <title>Crash</title>
      </Head>
      <Wrapper isDarkTheme={isDarkTheme}>
        <Header
          handleIsDarkTheme={handleIsDarkTheme}
          isDarkTheme={isDarkTheme}
        />
        <WinPopup
          handleWinPopup={handleWinPopup}
          winPopupIsVisible={winPopupIsVisible}
          totalWin={totalWin}
        />
        <Scoreboard
          isCrash={isCrash}
          coefficient={coefficient}
          moneyIsSeized={moneyIsSeized}
        />
        <Main
          bet={bet}
          handleTargetCoefficient={handleTargetCoefficient}
          money={money}
          setBet={setBet}
          setTargetCoefficient={setTargetCoefficient}
          targetCoefficient={targetCoefficient}
          targetCoefficientIsEnable={targetCoefficientIsEnable}
          history={history}
          isCrash={isCrash}
          moneyIsSeized={moneyIsSeized}
          startGame={startGame}
          giveMoney={giveMoney}
        />
      </Wrapper>
    </>
  );
};

export default React.memo(Home);
