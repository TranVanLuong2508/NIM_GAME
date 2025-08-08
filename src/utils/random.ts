const randomNumberInRange = (minNumber: number, maxNumber: number): number => {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber; //random from [min-max]
}

export default randomNumberInRange