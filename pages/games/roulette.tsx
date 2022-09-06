import type { NextPage } from 'next'
import style from '../../styles/roulette.module.css'
import {useState} from "react";

const Roulette: NextPage = () => {
	const [money, setMoney] = useState(3000)

	return (
		<div className={style.wrapper}>
			<div className={style.roulette}>

			</div>
			<div className={style.controller}>
				<div>Всего денег: {money}</div>
			</div>
		</div>
	)
}

export default  Roulette