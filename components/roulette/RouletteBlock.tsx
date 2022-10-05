import {FC} from "react";
import style from "../../styles/roulette.module.css";
import {AnimatePresence, motion} from "framer-motion";

interface RouletteBlockProps {
	blockSelected: number
	setBlockSelected: Function
}

const RouletteBlock: FC<RouletteBlockProps> = (props) => {
	return (
		<div
			attribute={(props.blockSelected === 1).toString()}
			className={style.rouletteBlock}>
			<div className={style.roulette}>
				<button
					attribute={(props.blockSelected === 1).toString()}
					onClick={() => props.setBlockSelected(1)}
					className={style.head}>
					roulette
				</button>
				<AnimatePresence>
					{props.blockSelected === 1 &&
						<motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
							className={style.rouletteField}>
							<div className={style.rouletteSlider}>
                <div className={style.card}>
                  24
                </div>
                <div className={style.card}>
                  24
                </div>
                <div className={style.card}>
                  24
                </div>
                <div className={style.card}>
                  24
                </div>
                <div className={style.card}>
                  24
                </div>
                <div className={style.card}>
                  24
                </div>
                <div className={style.card}>
                  24
                </div>
							</div>
						</motion.div>}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default RouletteBlock