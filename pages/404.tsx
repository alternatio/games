import {NextPage} from "next";
import style from '../styles/Error404.module.css'
import Link from "next/link";

const Error404: NextPage = () => {
	return (
		<div className={style.wrapper}>
			<h1>
				Error 404!
			</h1>
			<Link href={'/'}>
				<a>
					Back to home
				</a>
			</Link>
		</div>
	)
}

export default Error404