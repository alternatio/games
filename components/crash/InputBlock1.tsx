import { motion } from "framer-motion";
import React, { FC } from "react";
import style from "../../styles/pages/Home.module.scss";

interface InputBlock1Interface {
	bet: number
	money: number
	setBet: Function
}

const InputBlock1: FC<InputBlock1Interface> = (props) => {
	return (
		<div className={style.inputBlock}>
			<div className={style.title}>
				Ставка:
			</div>
			<motion.label
				initial={{boxShadow: '0 0 0 0 #FF1144'}}
				animate={(props.bet <= props.money) ?
					{boxShadow: '0 0 0 0 #FF1144'} :
					{boxShadow: '0 0 0 .2rem #FF1144'}}
				transition={{duration: .1, type: 'tween'}}
				className={style.label}>
				<input
					onChange={(e) => {
						const value = Number(e.target.value)
						props.setBet(value)
					}}
					value={props.bet}
					min={0}
					className={style.input}
					type="number"/>
			</motion.label>
		</div>
	)
}

export default React.memo(InputBlock1)