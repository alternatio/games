import React, {FC} from "react";
import style from "/styles/roulette.module.css";
import chipData from "./data/chipData";
import {AnimatePresence, motion} from "framer-motion";

interface CellProps {
	className?: string
	cellValue: number
	bets: {mass: number, bet: number}[]
	setBets: Function
	addBet: Function
	selectedChip: number
}

const Cell: FC<CellProps> = (props) => {

	return (
		<div
			onClick={() => {
				props.addBet(props.cellValue, chipData[props.selectedChip])
			}}
			className={props.className}>
			<span>{props.cellValue}</span>
			<AnimatePresence>
				{props.bets[props.cellValue].bet !== 0 &&
          <motion.div
	          initial={{transform: 'translateY(-2rem) scale(0)'}}
	          animate={{transform: 'translateY(0rem) scale(1)'}}
	          exit={{transform: 'translateY(-2rem) scale(0)'}}
	          className={style.chipOnCell}>
						{props.bets[props.cellValue].bet}
          </motion.div>
				}
			</AnimatePresence>
		</div>
	)
}

export default React.memo(Cell)