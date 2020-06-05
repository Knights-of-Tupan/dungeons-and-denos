/**
 * This class is a helper class with a bunch of useful methods.
 * Specially random number generating, including dices.
 *
 * @class Utils
 */
export default class Utils {
  // Math operations
  static add: Function = (a: number, b: number): number => a + b;
  static subtract: Function = (a: number, b: number): number => a - b;
  static divide: Function = (a: number, b: number): number => a / b;
  static multiply: Function = (a: number, b: number): number => a * b;

  // map symbols to math operations
  static operations: { [index: string]: Function } = {
    '+': Utils.add,
    '-': Utils.subtract,
    '*': Utils.multiply,
    '/': Utils.divide,
  };

  /*
     * TODO: solve using expression tree:
       https://blog.socratic.org/stepping-into-math-open-sourcing-our-step-by-step-solver-9b5da066ae36
     * Roll dices based on a expression, following the format: 
     * [# dice]d[# sides] [operator] [modifiers]
     * Valid operators:
     *  - +, -, *, /
     * Modifiers:
     *  - floor()
     *  TODO: add more advanced rolling mechanics
     *  ref: https://wiki.roll20.net/Dice_Reference 
    */
  static rollDicesExpression(expression: string) {
    // split the characters
    const chars = [...expression];
    // every element is a object {function_pointer: args_list[]}
    const operationsStack = [];
    let currentTotal = 0;
    let currentOperator: string;
    let currentChar = '';
    let lastOperator: string;
    // Is by default 1 so d20 == 1d20
    let leftOperand: number = 1;
    let rightOperand: number = 0;
    let operandObject: { index: number; operand: number };
    let output: number[] = [];

    for (let i = 0; i < chars.length; i++) {
      // console.log(c, i);
      operandObject = Utils.consumeNumber(i, chars);
      i = operandObject.index;
      leftOperand = operandObject.operand;
      currentChar = chars[i];
      // it's a roll
      if (currentChar === 'd') {
        operandObject = Utils.consumeNumber(i, chars);
        i = operandObject.index;
        rightOperand = operandObject.operand;

        const rolls = Utils.roll(leftOperand, rightOperand);
        currentTotal += rolls.total;
        output.concat(rolls.rolls);

        leftOperand = rolls.total;
        rightOperand = 0;
      }
      // it's a floor
      else if (currentChar.startsWith('f')) {
        if (this.checkFloor(i, chars)) {
          i = i + 5;
          // solve expression inside floor
          // match closing parenthesis
        } else {
          console.log('incorrect formula');
          return [];
        }
      }
      // it's an operator
      else if (Utils.isOperator(currentChar)) {
        i++;
        // wait for the right operand to be ready
      }
    }

    return output;
  }

  static checkFloor(index: number, chars: string[]) {
    // f was already figure out before calling this method
    if (chars.slice(index, index + 5) === ['l', 'o', 'o', 'r', '('])
      return true;
    else return false;
  }

  static consumeNumber(index: number, chars: string[]) {
    let operand = '';
    let currentChar = chars[index];
    while (Utils.isNumeric(currentChar)) {
      operand += currentChar;
      currentChar = chars[++index];
    }
    return { index: index, operand: Number(operand) };
  }

  static isOperator(char: string) {
    return Utils.operations[char] != undefined ? true : false;
  }

  static isNumeric(c: string): boolean {
    return !isNaN(parseInt(c));
  }

  /**
   * Rolls a given number of dices of given number of sides.
   *
   * @static
   * @param {number} rollsQuantity
   * @param {number} numberOfSides
   * @returns {total, rolls}
   */
  static roll(
    rollsQuantity: number,
    numberOfSides: number
  ): { total: number; rolls: number[] } {
    let rolls = [];
    while (rollsQuantity-- > 0) {
      rolls.push(Utils.getRandomInteger(1, numberOfSides));
    }
    const total = rolls.reduce((acc, cur) => acc + cur);

    return { total, rolls };
  }

  /**
   * @param {number} min
   * @param {number} max
   * @returns a random number between min and max (both included):
   */
  static getRandomInteger = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * @param {array} list
   * @return random key.
   */
  static getRandomKeyInList = function (list = []) {
    const max = list.length;
    const randomIndex = Utils.getRandomInteger(0, max - 1);
    const randomKey = list[randomIndex];
    return randomKey;
  };
}
