const homeData: valuesOfGames[] = [
  // {
  // 	name: 'monopoly',
  // 	date: '29.09.2022',
  // 	techs: 'ReactTS'
  // },
  {
    name: "roulette",
    date: "15.09.2022",
    techs: "Next, React, TS, SCSS, framer-motion",
  },
  {
    name: "crash",
    date: "21.09.2022",
    techs: "Next, React, SCSS, TS",
  },
];

export interface valuesOfGames {
  name: string;
  date: string;
  techs: string;
}
export default homeData;
