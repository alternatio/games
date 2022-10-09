import React, {FC} from "react";
import {motion} from "framer-motion";
import style from "../../styles/roulette.module.css";
import chipsNumbers from './data/chipData'

interface ButtonChipProps {
	value: number
	setMoney: Function
	money: number
	setSelectedChip: Function
	selectedChip: number
	index: number
}

const ButtonChip: FC<ButtonChipProps> = (props) => {
	return (
		<motion.label className={style.chipLabel}>
			<input
				onClick={() => {
					if ((props.money >= props.value) && (chipsNumbers[props.selectedChip] != props.value)) {
						props.setSelectedChip(props.index)
					}
				}}
				checked={props.value === chipsNumbers[props.selectedChip]}
				className={style.chipInput}
				name={'chipInput'}
				value={props.value}
				type={"radio"}/>
		</motion.label>
	)
}

export default React.memo(ButtonChip)