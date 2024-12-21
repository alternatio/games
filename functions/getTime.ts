export const getTime = (): number => {
	const variant = Math.round(Math.random() * 10)

	const randomize = (min: number, max: number): number => {
		return Math.random() * (max - min) + min
	}
	if (variant <= 4) return randomize(5000, 20)
	if (variant <= 7) return randomize(11000, 3000)
	if (variant <= 9) return randomize(13000, 6000)
	if (variant <= 10) return randomize(15000, 12000)

	return 1000
}