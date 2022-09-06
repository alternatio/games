import type { NextPage } from 'next'
import style from '../../styles/roulette.module.css'
import {FC, useState} from "react";
import MainContainer from "../components/MainContainer";

interface ControllerProps {
	money: number
}

const Controller: FC<ControllerProps> = (props ) => {
	return (
		<div className={style.controller}>
			<div className={style.controllerHead}>
				<p>{props.money}$</p>
			</div>
		</div>
	)
}

const RouletteBlock: FC = () => {
	return (
		<div className={style.roulette}>
			<div className={style.rouletteShadowTop}></div>
			<div className={style.rouletteShadowInner}></div>
			<div className={style.card}>
				24
			</div>
		</div>
	)
}

const Info: FC = () => {
	return (
		<div className={style.info}>
			<div className={style.history}>

			</div>
			<button className={style.button}>
				Крутить
			</button>
		</div>
	)
}

const Roulette: NextPage = () => {
	const [money, setMoney] = useState(3000)

	return (
		<MainContainer>
			<div className={style.wrapper}>
				<Controller money={money}/>
				<RouletteBlock />
				<Info />
			</div>
		</MainContainer>
	)
}

export default  Roulette