import {NextPage} from "next";
import style from '../../styles/MainContainer.module.css'
import Link from "next/link";

interface MainContainerProps {
	children: JSX.Element
}

const MainContainer: NextPage<MainContainerProps> = (props) => {
	return (
		<>
			<header className={style.header}>
				<Link href={'/'}><a className={style.link}>&lt; Вернуться на главную</a></Link>
			</header>
			{props.children}
		</>
	)
}

export default MainContainer