import type { NextPage } from 'next'
import style from '../../styles/roulette.module.css'
import {useState} from "react";
import MainContainer from "../layouts/MainContainer";

import RouletteBlock from '../../components/roulette/RouletteBlock'
import Controller from "../../components/roulette/Controller";

const bet: object = {}

const Roulette: NextPage = () => {
	const [money, setMoney] = useState<number>(290)
	const [answerMoney, setAnswerMoney] = useState<number>(0)
	const [blockSelected, setBlockSelected] = useState<number>(0)

	return (
		<MainContainer>
			<div className={style.horizontalWrapper}>
				<div className={style.wrapper}>
					<Controller
						setBlockSelected={setBlockSelected}
						blockSelected={blockSelected}
						setAnswerMoney={setAnswerMoney}
						answerMoney={answerMoney}
						setMoney={setMoney}
						money={money}/>
					<RouletteBlock
						setBlockSelected={setBlockSelected}
						blockSelected={blockSelected}/>
				</div>
			</div>
		</MainContainer>
	)
}

export default  Roulette