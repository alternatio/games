import React, {FC, ReactNode} from "react";
import chipData from "./data/chipData";
import style from "../../styles/roulette.module.css";
import {AnimatePresence, motion} from "framer-motion";

interface outerButtonProps {
	addBet: Function
	addBetNumber: number
	selectedChip: number
	bets: {mass: number, bet: number}[]
	children?: ReactNode
}

const OuterButton: FC<outerButtonProps> = (props) => {
	return (
		<button
			onClick={() => props.addBet(props.addBetNumber, chipData[props.selectedChip])}
			className={style.buttonOutside}>
			{props.children}
			<AnimatePresence>
				{props.bets[props.addBetNumber].bet !== 0 &&
          <motion.div
            initial={{transform: 'translateY(-2rem) scale(0)'}}
            animate={{transform: 'translateY(0rem) scale(1)'}}
            exit={{transform: 'translateY(-2rem) scale(0)'}}
            className={style.chipOnCell}>
						{props.bets[props.addBetNumber].bet}
          </motion.div>
				}
			</AnimatePresence>
		</button>
	)
}

export default React.memo(OuterButton)