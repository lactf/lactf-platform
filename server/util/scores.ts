// rl is min challenge points
// rh is max challenge points
// maxSolves is usually 500-800 and honestly after that point it doesn't matter too much
// solves is number of solves chall has
//
// formula im using (one curve for hard challs, one curve for easy challs:
// min(max(rh * (0.96) ** (solves-1), rl + (rh*0.7 - rl) * (0.987) ** (solves-10), 100), 500)
//
// this formula lets you easily configure the max/min points such that
// 1) For 0/1 solves, challenges are worth the max points
// 2) For the first 10 solves, we use the hard curve which decays fast
// 3) For the remainder of the solves, we use the easy curve which decays slowly. It bottoms out to the min points around the max solve count.

// put below into desmos to see curve:
// h=500
// l=100
// f_{1}\left(x\right)=h\left(0.96\right)^{\left(x-1\right)}
// f_{2}\left(x\right)=l\ +\ \left(h\cdot0.7\ -\ l\right)\left(0.987\right)^{\left(x-10\right)}
// f\left(x\right)\ =\ \min\left(\max\left(f_{1}\left(x\right),f_{2}\left(x\right),l\right),h\right)
export const getScore = (
  rl: number,
  rh: number,
  maxSolves: number,
  solves: number
): number => {
  const hardCurve = rh * 0.96 ** (solves - 1);
  const easyCurve = rl + (rh * 0.7 - rl) * 0.987 ** (solves - 10);
  return Math.round(Math.min(Math.max(hardCurve, easyCurve, rl), rh));
};
