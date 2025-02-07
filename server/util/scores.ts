// rl is min challenge points
// rh is max challenge points
// maxSolves is usually 800 and honestly after that point it doesn't matter too much
// solves is number of solves chall has
//
// formula im using (one curve for hard challs, one curve for easy challs:
// min(max(428 * (0.995) ** solves + 75, 428 * (0.9978) ** solves, 100), 500)
//
// put below into desmos to see curve:
// y_{2}=428\left(.995\right)^{x}+75
// y_{3}=428\left(.9978\right)^{x}
// y=\min\left(\max\left(y_{2},\ y_{3},\ 100\right),\ 500\right)
export const getScore = (rl: number, rh: number, maxSolves: number, solves: number): number => {
  const hardCurve = 428 * (0.995) ** solves + 75;
  const easyCurve = 428 * (0.9978) ** solves;
  const veryEasyCurve = -0.055 * solves + 150;
  return Math.round(Math.min(Math.max(hardCurve, easyCurve, veryEasyCurve, rl), rh));
}
