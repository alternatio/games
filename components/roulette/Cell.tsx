import {FC, useState} from "react";
import style from "../../styles/roulette.module.css";

interface CellProps {
	className?: string
	cellValue: number
}

const Cell: FC<CellProps> = (props) => {
	const [chipMass, setChipMass] = useState<number | null>(null)

	return (
		<div
			onClick={() => {

			}}
			className={props.className}>
			<span>{props.cellValue}</span>
			{chipMass &&
        <div className={style.chipOnCell}>
					{chipMass}
        </div>
			}
		</div>
	)
}

export default Cell