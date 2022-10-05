import {FC, useState} from "react";
import {motion} from "framer-motion";
import style from "../../styles/roulette.module.css";

interface ButtonChipProps {
	value: number
	setMoney: Function
	money: number
	setSelectedChip: Function
	selectedChip: number
}

const ButtonChip: FC<ButtonChipProps> = (props) => {
	return (
		<motion.label className={style.chipLabel}>
			<input
				onClick={() => {
					if ((props.money >= props.value) && (props.selectedChip != props.value)) {
						props.setSelectedChip(props.value)
					}
				}}
				checked={props.value === props.selectedChip}
				className={style.chipInput}
				name={'chipInput'}
				value={props.value}
				type={"radio"}/>
		</motion.label>
	)
}

export default ButtonChip