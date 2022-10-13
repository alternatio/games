import React, {FC, useState} from "react";
import style from "../../styles/roulette.module.css";
import {AnimatePresence, motion} from "framer-motion";
import chipsNumbers from "./data/chipData";
import rouletteNumbers from "./data/rouletteNumbersData";

import ButtonChip from "./ButtonChip";
import Cell from "./Cell";
import OuterButton from "./OuterButton";

interface ControllerProps {
	bets: {mass: number, bet: number}[]
	setBets: Function
	money: number
	setMoney: Function
	answerMoney: number
	setAnswerMoney: Function
	blockSelected: number
	setBlockSelected: Function
	themeIsLight: boolean
	handleThemeIsLight: Function
	rotateRoulette: Function
	spinArray: number[]
	spinIsEnd: boolean
	historySpins: number[]
}

const Controller: FC<ControllerProps> = (props ) => {
	const [selectedChip, setSelectedChip] = useState<number>(0)
	const [infoVisible, setInfoVisible] = useState<boolean>(false)

	const addBet: Function = (num: number, bet: number) => {
		if (props.money >= chipsNumbers[selectedChip]) {
			const copyBets: {mass: number, bet: number}[] = [...props.bets]
			props.setMoney(props.money - chipsNumbers[selectedChip])
			copyBets[num].bet += bet
			props.setBets(copyBets)
		}
	}

	const removeBets: Function = () => {
		const copyBets: {mass: number, bet: number}[] = [...props.bets]
		let copyBet = 0
		copyBets.map((value) => {
			copyBet += value.bet
			value.bet = 0
		})
		props.setMoney(props.money + copyBet)
		props.setBets(copyBets)
	}

	const addCell = (value: number) => {
		if ((value >= 1 && value <= 10) || (value >= 19 && value <= 28)) {
			return value % 2 === 0 ?
				<Cell
					key={value}
					selectedChip={selectedChip}
					addBet={addBet}
					bets={props.bets}
					setBets={props.setBets}
					cellValue={value}
					className={style.redCell} /> :
				<Cell
					key={value}
					selectedChip={selectedChip}
					addBet={addBet}
					bets={props.bets}
					setBets={props.setBets}
					cellValue={value}
					className={style.blackCell} />
		}
		if ((value >= 11 && value <= 18) || (value >= 29 && value <= 36)) {
			return value % 2 === 0 ?
				<Cell
					key={value}
					selectedChip={selectedChip}
					addBet={addBet}
					bets={props.bets}
					setBets={props.setBets}
					cellValue={value}
					className={style.blackCell} /> :
				<Cell
					key={value}
					selectedChip={selectedChip}
					addBet={addBet}
					bets={props.bets}
					setBets={props.setBets}
					cellValue={value}
					className={style.redCell} />
		}
		else {
			return (
				<Cell
					key={value}
					selectedChip={selectedChip}
					addBet={addBet}
					bets={props.bets}
					setBets={props.setBets}
					cellValue={value}
					className={style.greenCell} />
			)
		}
	}

	return (
		<motion.div
			initial={{width: '100%'}}
			animate={props.blockSelected === 0 ?
				{width: '100%'} :
				{width: '5rem'}}
			className={style.controller}>
			<AnimatePresence>
				{props.spinIsEnd &&
					<motion.button
						initial={{opacity: 0}}
            animate={props.blockSelected === 0 ?
							{opacity: 0, pointerEvents: 'none'} :
							{opacity: 1, pointerEvents: 'auto'}}
						exit={{opacity: 0}}
						onClick={() => {
							props.setBlockSelected(0)
						}}
						className={style.head}>
						controller
					</motion.button>
				}
			</AnimatePresence>
			<AnimatePresence>
				{props.blockSelected === 0 &&
				<motion.div
					className={style.controllerMain}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}>
          <motion.div
	          layoutScroll
	          className={style.controllerHead}>
            <span className={style.money}>{props.money}$</span>
	          {chipsNumbers.map((value, index) => {
		          return (
			          <ButtonChip
				          key={index}
				          setSelectedChip={setSelectedChip}
				          selectedChip={selectedChip}
				          money={props.money}
				          index={index}
				          value={value}/>
		          )
	          })}
	          <AnimatePresence>
		          {(props.bets.find(obj => obj.bet > 0)) && (
			          <motion.button
				          initial={{width: '0rem', height: '2.5rem'}}
				          animate={{width: '10.5rem'}}
				          exit={{height: '0rem'}}
				          onClick={() => removeBets()}
				          className={style.buttonHead}>
				          <div>
					          Сбросить ставки
				          </div>
			          </motion.button>
		          )}
	          </AnimatePresence>
          </motion.div>
          <div className={style.controllerBody}>
            <div className={style.controllerOutside}>
	            <OuterButton
                bets={props.bets}
                addBetNumber={37}
		            selectedChip={selectedChip}
		            addBet={addBet}>
                manque (1-18)
	            </OuterButton>
              <OuterButton
                bets={props.bets}
                addBetNumber={38}
                selectedChip={selectedChip}
                addBet={addBet}>
                impair (нечётный)
              </OuterButton>
              <OuterButton
	              bets={props.bets}
                addBetNumber={39}
                selectedChip={selectedChip}
                addBet={addBet}>
                <span className={style.buttonOutsideRed}></span>
              </OuterButton>
            </div>
            <div className={style.controllerEnter}>
              <div className={style.controllerCells}>
								{rouletteNumbers.map((value, index) => addCell(index))}
              </div>
	            <div className={style.controllerLines}>
                <OuterButton
                  bets={props.bets}
                  addBetNumber={40}
                  selectedChip={selectedChip}
                  addBet={addBet}>
                  ◀
                </OuterButton>
                <OuterButton
                  bets={props.bets}
                  addBetNumber={41}
                  selectedChip={selectedChip}
                  addBet={addBet}>
                  ◀
                </OuterButton>
                <OuterButton
                  bets={props.bets}
                  addBetNumber={42}
                  selectedChip={selectedChip}
                  addBet={addBet}>
                  ◀
                </OuterButton>
	            </div>
            </div>
            <div className={style.controllerOutside}>
              <OuterButton
                bets={props.bets}
                addBetNumber={43}
                selectedChip={selectedChip}
                addBet={addBet}>
                passe (19-36)
              </OuterButton>
              <OuterButton
                bets={props.bets}
                addBetNumber={44}
                selectedChip={selectedChip}
                addBet={addBet}>
                pair (чётный)
              </OuterButton>
              <OuterButton
                bets={props.bets}
                addBetNumber={45}
                selectedChip={selectedChip}
                addBet={addBet}>
                <span className={style.buttonOutsideBlack}></span>
              </OuterButton>
            </div>
          </div>
					<div className={style.bottom}>
						<button
							onClick={() => {
								console.table(props.bets)
								props.rotateRoulette()
							}}
							className={style.bottomButton}>
							Крутить
						</button>
					</div>
					<div className={style.footer}>
						<button
							onClick={() => {
								props.handleThemeIsLight(!props.themeIsLight)
							}}
							className={style.infoButton}>
							Тема: {props.themeIsLight ? 'light' : 'dark'}
						</button>
						<button
							onClick={() => {
								setInfoVisible(true)
							}}
							className={style.infoButton}>
							Информация
						</button>
						<div className={style.history}>
							{props.historySpins.length > 0 &&
								<p className={style.historyHead}>
									История:
								</p>
							}
							{props.historySpins.map((value, index) => {
								if ((value >= 1 && value <= 10) || (value >= 19 && value <= 28)) {
									if (value % 2 === 0)
										return <div key={index} className={style.historyBlockRed}>{value}</div>
									else
										return <div key={index} className={style.historyBlockBlack}>{value}</div>
								}
								if ((value >= 11 && value <= 18) || (value >= 29 && value <= 36)) {
									if (value % 2 === 0)
										return <div key={index} className={style.historyBlockBlack}>{value}</div>
									else
										return <div key={index} className={style.historyBlockRed}>{value}</div>
								}
								else {
									return <div key={index} className={style.historyBlockGreen}>{value}</div>
								}
							})}
						</div>
					</div>
					<AnimatePresence>
						{infoVisible &&
							<motion.div
								initial={{opacity: 0, scaleX: 0, scaleY: .9}}
								animate={{opacity: 1, scaleX: 1, scaleY: 1}}
								exit={{opacity: 0, scaleX: 0, scaleY: .9}}
								transition={{type: 'easy-out'}}
								className={style.infoBlock}>
								<div className={style.infoBlockWrapper}>
									<button
										onClick={() => {
											setInfoVisible(false)
										}}
										className={style.cross}>
										⨉
									</button>
									<div className={style.infoLeftPart}>
										<h2 className={style.infoHead}>
											Коэффициент выплат:
										</h2>
										<ul className={style.infoList}>
											<li>Красное/чёрное, чётное/нечётное, 1-18/19-36: ×2</li>
											<li>Колонна (ряд): ×3</li>
											<li>Число: ×36</li>
										</ul>
									</div>
									<div className={style.infoRightPart}>
										<p>
                      В этой рулетке отключены ставки на 2, 4 и 6 номеров, но также отключены всякие ограничения на сумму ставки.
											<br />
											<b>Не является азартной игрой.</b>
										</p>
									</div>
								</div>
							</motion.div>
						}
					</AnimatePresence>
				</motion.div>}
			</AnimatePresence>
		</motion.div>
	)
}

export default React.memo(Controller)