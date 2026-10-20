import { useCountUp } from './types';

export function CountUp({ value, prefix = '', suffix = '', ms = 900 }: { value: number; prefix?: string; suffix?: string; ms?: number }) {
  const n = useCountUp(value, ms);
  return (
    <>
      {prefix}
      {n.toLocaleString('en-IN')}
      {suffix}
    </>
  );
}
