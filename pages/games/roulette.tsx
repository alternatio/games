import type { NextPage } from 'next'
import style from '../../styles/roulette.module.css'
import {useState} from "react";
import MainContainer from "../layouts/MainContainer";
import betsData from "../../components/roulette/data/betsData";
import { motion, Variants } from 'framer-motion';
import rouletteNumbers from "../../components/roulette/data/rouletteNumbersData";

import RouletteBlock from '../../components/roulette/RouletteBlock'
import Controller from "../../components/roulette/Controller";

const Roulette: NextPage = () => {
	const [money, setMoney] = useState<number>(1000)
	const [answerMoney, setAnswerMoney] = useState<number>(0)
	const [blockSelected, setBlockSelected] = useState<number>(0)
	const [bets, setBets] = useState<{mass: number, bet: number}[]>(betsData)
	const [themeIsLight, handleThemeIsLight] = useState<boolean>(true)
	const [spinArray, setSpinArray] = useState<number[]>([0])
	const [spinIsEnd, handleSpinIsEnd] = useState<boolean>(true)
	const [historySpins, setHistorySpins] = useState<number[]>([])

	const rotateRoulette: Function = () => {
		if (bets.find(obj => obj.bet > 0)) {
			setBlockSelected(1)
			const copySpinArray: number[] = [spinArray[spinArray.length - 1]]
			const rouletteNumbersSorted: number[] = [...rouletteNumbers].sort((a, b) => a - b)
			const stopValue = 20

			for (let i = 0; i < stopValue; i += Math.round(Math.random() * (3 - 1) + 1)) {
				const index: number = rouletteNumbersSorted.findIndex((value, index) => value === copySpinArray[copySpinArray.length - 1]);
				const maxValue = Math.round((stopValue - i) + i / 4)
				const minValue = -Math.round((stopValue - i) / 3)
				let lineStep = index + Math.round(Math.random() * (maxValue + minValue) - minValue)

				// if step < 0
				if (
					lineStep < 0 &&
					copySpinArray[copySpinArray.length - 1] !== rouletteNumbersSorted[rouletteNumbersSorted.length - 1 + lineStep]
				) {
					const num = rouletteNumbersSorted[rouletteNumbersSorted.length - 1 + (lineStep % 36)]
					copySpinArray.push(num)
				}
				// if step > 0
				if (
					lineStep > 0 &&
					copySpinArray[copySpinArray.length - 1] !== rouletteNumbersSorted[lineStep]
				) {
					const num = rouletteNumbersSorted[lineStep % 36]
					copySpinArray.push(num)
				}
			}
			setSpinArray(copySpinArray)
			console.log(copySpinArray)

			const copySpinHistory: number[] = [...historySpins, copySpinArray[copySpinArray.length - 1]]
			if (copySpinHistory.length > 6) {
				copySpinHistory.shift()
			}
			setHistorySpins(copySpinHistory)
		}
	}

	const variantsTheme: Variants = {
		light: {
			filter: 'invert(0) hue-rotate(0) saturate(1) contrast(1)'
		},
		dark: {
			filter: 'invert(1) hue-rotate(-170deg) saturate(.9) contrast(.975)'
		}
	}

	return (
			<motion.div
				variants={variantsTheme}
				initial={false}
				animate={themeIsLight ? 'light' : 'dark'}

				className={style.horizontalWrapper}>
				<MainContainer>
				<div className={style.wrapper}>
					<Controller
						historySpins={historySpins}
						spinIsEnd={spinIsEnd}
						spinArray={spinArray}
						rotateRoulette={rotateRoulette}
						themeIsLight={themeIsLight}
						handleThemeIsLight={handleThemeIsLight}
						bets={bets}
						setBets={setBets}
						blockSelected={blockSelected}
						setBlockSelected={setBlockSelected}
						answerMoney={answerMoney}
						setAnswerMoney={setAnswerMoney}
						money={money}
						setMoney={setMoney}/>
					<RouletteBlock
						money={money}
						setMoney={setMoney}
						bets={bets}
						setBets={setBets}
						handleSpinIsEnd={handleSpinIsEnd}
						setSpinArray={setSpinArray}
						spinArray={spinArray}
						setBlockSelected={setBlockSelected}
						blockSelected={blockSelected}/>
				</div>
				</MainContainer>
			</motion.div>
	)
}

export default  Roulette