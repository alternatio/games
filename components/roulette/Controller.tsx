import {FC, useState} from "react";
import style from "../../styles/roulette.module.css";
import {AnimatePresence, motion} from "framer-motion";

import ButtonChip from "./ButtonChip";
import Cell from "./Cell";

const rouletteNumbers: number[] = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
const chipsNumbers: number[] = [1, 10, 25, 50, 100, 500, 1000, 2000]

interface ControllerProps {
	money: number
	setMoney: Function
	answerMoney: number
	setAnswerMoney: Function
	blockSelected: number
	setBlockSelected: Function
}

const Controller: FC<ControllerProps> = (props ) => {
	const [selectedChip, setSelectedChip] = useState<number>(1)
	const [infoVisible, setInfoVisible] = useState<boolean>(false)

	const addCell = (value: number) => {
		if ((value >= 1 && value <= 10) || (value >= 19 && value <= 28)) {
			console.log(value)
			return value % 2 === 0 ?
				<Cell
					cellValue={value}
					className={style.redCell} /> :
				<Cell
					cellValue={value}
					className={style.blackCell} />
		}
		if ((value >= 11 && value <= 18) || (value >= 29 && value <= 36)) {
			return value % 2 === 0 ?
				<Cell
					cellValue={value}
					className={style.blackCell} /> :
				<Cell
					cellValue={value}
					className={style.redCell} />
		}
		else {
			return (
				<Cell
					cellValue={value}
					className={style.greenCell} />
			)
		}
	}

	return (
		<div
			attribute={(props.blockSelected === 0).toString()}
			className={style.controller}>
			<button
				attribute={(props.blockSelected === 0).toString()}
				onClick={() => props.setBlockSelected(0)}
				className={style.head}>
				controller
			</button>
			<AnimatePresence>
				{props.blockSelected === 0 &&
				<motion.div
					className={style.controllerMain}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}>
          <div
	          className={style.controllerHead}>
            <span className={style.money}>{props.money}$</span>
            <div className={style.chips}>
							{
								chipsNumbers.map(value => {
									return (
										<ButtonChip
											setSelectedChip={setSelectedChip}
											selectedChip={selectedChip}
											setMoney={props.setMoney}
											money={props.money}
											value={value}/>
									)
								})
							}
            </div>
          </div>
          <div className={style.controllerBody}>
            <div className={style.controllerOutside}>
							<button className={style.buttonOutside}>
								manque (1-18)
							</button>
              <button className={style.buttonOutside}>
                impair (нечётный)
              </button>
              <button className={style.buttonOutside}>
                <span className={style.buttonOutsideRed}></span>
              </button>
            </div>
            <div className={style.controllerEnter}>
              <div className={style.controllerCells}>
								{rouletteNumbers.map((value, index) => addCell(index))}
              </div>
	            <div className={style.controllerLines}>
		            <button className={style.controllerLine}>
			            ◀
		            </button>
                <button className={style.controllerLine}>
                  ◀
                </button>
                <button className={style.controllerLine}>
                  ◀
                </button>
	            </div>
            </div>
            <div className={style.controllerOutside}>
              <button className={style.buttonOutside}>
                passe (19-36)
              </button>
              <button className={style.buttonOutside}>
                pair (чётный)
              </button>
              <button className={style.buttonOutside}>
                <span className={style.buttonOutsideBlack}></span>
              </button>
            </div>
          </div>
					<div className={style.bottom}>
						<button className={style.bottomButton}>
							Крутить
						</button>
					</div>
					<div className={style.footer}>
						<button
							onClick={() => {
								setInfoVisible(true)
							}}
							className={style.infoButton}>
							Информация
						</button>
						<div className={style.history}>

						</div>
					</div>
					<AnimatePresence>
						{infoVisible &&
							<motion.div
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								exit={{opacity: 0}}
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
											<li>Красное/чёрное, чётное/нечётное, 1-18/19-36: ×1</li>
											<li>Дюжина, колонна (ряд): ×2</li>
											<li>Число: ×35</li>
										</ul>
									</div>
									<div className={style.infoRightPart}>
										<p>
                      В этой рулетке отключены ставки на 2, 4 и 6 номеров, но также отключены всякие ограничения на сумму ставки.
										</p>
									</div>
								</div>
							</motion.div>
						}
					</AnimatePresence>
				</motion.div>}
			</AnimatePresence>
		</div>
	)
}

export default Controller