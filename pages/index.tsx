import type { NextPage } from 'next'
import style from '../styles/Home.module.css'

import data, { valuesOfGames } from '../data/Home.data'
import Link from "next/link";
import {FC} from "react";

interface GameProps {
  index: number
  value: valuesOfGames
}

const Game: FC<GameProps> = ({index, value}) => {
  return (
    <div className={style.game}>
      <div className={style.gameID}>
        {index + 1}
      </div>
      <div className={style.gameCell}>
        {value.name}
      </div>
      <div className={style.gameCell}>
        {value.date}
      </div>
      <div className={style.gameCell}>
        {value.techs}
      </div>
      <Link href={`/games/${value.name}`}>
        <a className={style.gameButton}>
          play
        </a>
      </Link>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className={style.horizontalWrapper}>
      <div className={style.verticalWrapper}>
        <header className={style.header}>
          Games by Alternatio
        </header>
        <main className={style.main}>
          <div className={style.mainTop}>
            <div className={style.mainTopID}>id</div>
            <div className={style.mainTopCell}>name</div>
            <div className={style.mainTopCell}>date</div>
            <div className={style.mainTopCell}>tech's</div>
          </div>
          <div className={style.games}>
            {
              data.map((value, index) => {
                return (
                  <Game
                    key={index}
                    index={index}
                    value={value}/>
                )
              })
            }
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
