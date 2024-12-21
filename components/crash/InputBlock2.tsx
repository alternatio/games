import { motion } from "framer-motion";
import React, { FC } from "react";
import style from "../../styles/pages/Home.module.scss";

interface InputBlock2Interface {
	setTargetCoefficient: Function
	targetCoefficient: number
	targetCoefficientIsEnable: boolean
	handleTargetCoefficient: Function
	isCrash: boolean
}

const InputBlock2: FC<InputBlock2Interface> = (props) => {
	return (
		<div className={style.inputBlock}>
			<div className={style.title}>
				Целевой коэффициент:
			</div>
			<div className={style.inputWithHandler}>
				<label
					className={style.label}>
					<input
						disabled={!props.targetCoefficientIsEnable}
						onChange={(e) => {
							const value = Number(e.target.value)
							props.setTargetCoefficient(value)
						}}
						value={props.targetCoefficient.toFixed(2)}
						className={style.input}
						step={.01}
						min={1}
						type="number"/>
				</label>
				<div
					onClick={() => {
						props.isCrash && props.handleTargetCoefficient(!props.targetCoefficientIsEnable)
					}}
					className={style.handler}>
					<motion.div
						initial={{background: '#000', x: '0%'}}
						animate={props.targetCoefficientIsEnable ?
							{background: '#000', x: '100%'} :
							{background: '#000', x: '0%'}}
						transition={{type: 'spring', stiffness: 700, damping: 30}}
						className={style.handlerCircle}>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(InputBlock2)