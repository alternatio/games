import type { NextPage } from 'next'
import style from '../../styles/roulette.module.css'
import {FC, useState} from "react";
import MainContainer from "../components/MainContainer";
import { motion } from 'framer-motion';

interface ControllerProps {
	money: number
	setMoney: Function
	answerMoney: number
	setAnswerMoney: Function
}

interface ButtonChipProps {
	value: number
}

const rouletteNumbers: number[] = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]

const chipsNumbers: number[] = [10, 25, 50, 100, 500]

const Controller: FC<ControllerProps> = (props ) => {
	const [chipSelect, setChipSelect] = useState<number>(0)

	const ButtonChip: FC<ButtonChipProps> = ({value}) => {
		return (
			<motion.button
				onClick={() => {
					if (chipSelect === value) {
						setChipSelect(0)
					}
					else if (value <= props.money) {
						setChipSelect(value)
					}
				}}
				// attribute={`${chipSelect === value}`}
				initial={{y: 0}}
				animate={(chipSelect === value) ? {y: '-.5rem'} : {y : '0rem'}}
				className={style.chip}>
				{value}
			</motion.button>
		)
	}

	const addAnswerMoney = (money: number) => {
		if (props.money >= money) {
			props.setAnswerMoney(props.answerMoney + money)
			props.setMoney(props.money - money)
		}
	}

	const addCell = (value: number, chipMass?: number) => {
		if ((value >= 1 && value <= 10) || (value >= 19 && value <= 28)) {
			console.log(value)
			return value % 2 === 0 ?
				<div className={style.redCell}>
					<span>{value}</span>
					{chipMass && <div className={style.chipOnCell}>{chipMass}</div>}
				</div> :
				<div className={style.blackCell}>
					<span>{value}</span>
					{chipMass && <div className={style.chipOnCell}>{chipMass}</div>}
				</div>
		}
		if ((value >= 11 && value <= 18) || (value >= 29 && value <= 36)) {
			return value % 2 === 0 ?
				<div className={style.blackCell}>
					<span>{value}</span>
					{chipMass && <div className={style.chipOnCell}>{chipMass}</div>}
				</div> :
				<div className={style.redCell}>
					<span>{value}</span>
					{chipMass && <div className={style.chipOnCell}>{chipMass}</div>}
				</div>
		}
		else {
			return <div className={style.greenCell}>
				<span>{value}</span>
				{chipMass && <div className={style.chipOnCell}>{chipMass}</div>}
			</div>
		}
	}

	return (
		<div className={style.controller}>
			<h1 className={style.head}>ROULETTE</h1>
			<div className={style.controllerHead}>
				<span className={style.money}>{props.money}$</span>
				{/*<span className={style.answerMoney}>{props.answerMoney}$</span>*/}
				<div className={style.chips}>
					{chipsNumbers.map(value => <ButtonChip value={value} />)}
				</div>
				<button
					onClick={() => addAnswerMoney(-props.answerMoney)}
					className={style.controllerButtonReset}>
					отмена
				</button>
			</div>
			<div className={style.controllerBody}>
				<div className={style.controllerOutside}>

				</div>
				<div className={style.controllerEnter}>
					<div className={style.controllerCells}>
						{rouletteNumbers.map((value, index) => addCell(index))}
					</div>
					<div>

					</div>
				</div>
				<div className={style.controllerOutside}>

				</div>
			</div>
		</div>
	)
}

const RouletteBlock: FC = () => {
	return (
		<div className={style.centerBlock}>
			<div className={style.roulette}>
				<div className={style.rouletteShadowTop}></div>
				<div className={style.rouletteShadowInner}></div>
				<div className={style.card}>
					24
				</div>
			</div>
			<button className={style.button}>
				крутить
			</button>
		</div>
	)
}

const Info: FC = () => {
	return (
		<div className={style.info}>
			<div className={style.history}>

			</div>
		</div>
	)
}

const Roulette: NextPage = () => {
	const [money, setMoney] = useState<number>(3000)
	const [answerMoney, setAnswerMoney] = useState<number>(0)

	return (
		<MainContainer>
			<div className={style.wrapper}>
				<Controller
					setAnswerMoney={setAnswerMoney}
					answerMoney={answerMoney}
					setMoney={setMoney}
					money={money}/>
				<RouletteBlock />
				{/*<Info />*/}
			</div>
		</MainContainer>
	)
}

export default  Roulette