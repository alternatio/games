import React, {FC} from "react";
import style from "../../styles/roulette.module.css";
import {AnimatePresence, motion} from "framer-motion";
import {cubicBezier} from "popmotion";

interface RouletteBlockProps {
	blockSelected: number
	setBlockSelected: Function
	spinArray: number[]
	setSpinArray: Function
	handleSpinIsEnd: Function
	bets: {mass: number, bet: number}[]
	setBets: Function
	money: number
	setMoney: Function
}

const Card: FC<{ num: number }> = ({num}) => {
	if (num === 0) {
		return (
			<div className={style.cardGreen}>
				{num}
			</div>
		)
	} else if ((num >= 1 && num <= 10) || (num >= 19 && num <= 28)) {
		return num % 2 ?
			<div className={style.cardBlack}>
				{num}
			</div> :
			<div className={style.cardRed}>
				{num}
			</div>
	} else if ((num >= 11 && num <= 18) || (num >= 29 && num <= 36)) {
		return num % 2 ?
			<div className={style.cardRed}>
				{num}
			</div> :
			<div className={style.cardBlack}>
				{num}
			</div>
	} else {
		return <>ого!</>
	}
}

const RouletteBlock: FC<RouletteBlockProps> = (props) => {

	const checkWin: Function = (num: number) => {
		let totalWin = 0
		// for enter
		totalWin += props.bets[num].mass * props.bets[num].bet

	  // for outer
		// black / red
		const checkWinBlackRed: Function = () => {
			if ((num >= 1 && num <= 10) || (num >= 19 && num <= 28)) {
				num % 2 === 0 ?
					totalWin += props.bets[39].mass * props.bets[39].bet :
					totalWin += props.bets[45].mass * props.bets[45].bet
			}
			if ((num >= 11 && num <= 18) || (num >= 29 && num <= 36)) {
				num % 2 === 0 ?
					totalWin += props.bets[45].mass * props.bets[45].bet :
					totalWin += props.bets[39].mass * props.bets[39].bet
			}
		}

		// passe / impair
		const checkWinPainImpair: Function = () => {
			if (num % 2) {
				totalWin += props.bets[44].mass * props.bets[44].bet
			} if (!(num % 2)) {
				totalWin += props.bets[38].mass * props.bets[38].bet
			}
		}

		// line
		const checkWinLine: Function = () => {
			if (num % 3 === 1) {
				totalWin += props.bets[40].mass * props.bets[40].bet
			} if (num % 3 === 2) {
				totalWin += props.bets[41].mass * props.bets[41].bet
			} if (num % 3 === 0) {
				totalWin += props.bets[42].mass * props.bets[42].bet
			}
		}

		// manque / passe
		const checkManquePasse: Function = () => {
			num <= 18 ?
				totalWin += props.bets[37].mass * props.bets[37].bet :
				totalWin += props.bets[43].mass * props.bets[43].bet
		}

		checkWinBlackRed()
		checkWinPainImpair()
		checkManquePasse()
		checkWinLine()

		return totalWin
	}

	const removeBets = () => {
		const copyBets: {mass: number, bet: number}[] = [...props.bets]
		let copyBet = 0
		copyBets.map((value) => {
			copyBet += value.bet
			value.bet = 0
		})
		props.setBets(copyBets)
	}

	return (
		<div
			attribute={(props.blockSelected === 1).toString()}
			className={style.rouletteBlock}>
			<div className={style.roulette}>
				<button
					attribute={(props.blockSelected === 1).toString()}
					onClick={() => {
						props.setBlockSelected(1)
						props.setSpinArray([props.spinArray[props.spinArray.length - 1]])
					}}
					className={style.head}>
					roulette
				</button>
				<AnimatePresence>
					{props.blockSelected === 1 &&
						<motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
							className={style.rouletteField}>
							<motion.div
								onAnimationStart={() => props.handleSpinIsEnd(false)}
								onAnimationComplete={() => {
									const lastNumber = props.spinArray[props.spinArray.length - 1]
									props.handleSpinIsEnd(true)

									const win = checkWin(lastNumber)
									removeBets()
									console.log(win)
									props.setMoney(props.money + win)


								}}
								initial={{translateY: '0%'}}
								animate={props.spinArray.length !== 1 ? {translateY: `-${props.spinArray.length - 1}00%`} : false}
								transition={{
									duration: (props.spinArray.length === 1) ? 0 : 4,
									type: cubicBezier(.35, .35, .2, .7)
							}}
								className={style.rouletteSlider}>
								{props.spinArray.map(value => {
									return (
										<Card num={value}/>
									)
								})}
							</motion.div>
						</motion.div>}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default React.memo(RouletteBlock)