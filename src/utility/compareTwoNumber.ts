const compareTwoNumber = (value1: number, value2: number, direction = 1) => {
    if (direction === 1) {
        return Math.sign(value1 - value2);
    } else {
        return Math.sign(value2 - value1);
    }
};

export default compareTwoNumber;
