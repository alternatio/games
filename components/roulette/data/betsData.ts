const betsData: {mass: number, bet: number}[] = []

for (let i = 0; i < 46; i++) {
	let mass = 1
	if (i <= 36) {
		mass = 36
	} else if (i <= 39) {
		mass = 2
	} else if (i <= 42) {
		mass = 3
	} else {
		mass = 2
	}

	betsData.push({
		mass: mass,
		bet: 0
	})
}

// bets 0 - 36 - enter
// bets 37 - 45 - out
// 37 - manque (1 - 18)
// 38 - impair
// 39 - red
// 40 - line 1
// 41 - line 2
// 42 - line 3
// 43 - passe (19 - 36)
// 44 - pair
// 45 - black

export default betsData