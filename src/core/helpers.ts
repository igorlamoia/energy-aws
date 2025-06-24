import { performance } from 'perf_hooks';
import { ITime } from './response.interface';

export async function debug<T>(
  queryFn: () => Promise<T>
): Promise<ITime<T>> {
  const startTime = performance.now(); // Start timing
  const data = await queryFn(); // Execute the query
  const endTime = performance.now(); // End timing

  const durationMs = endTime - startTime;
  const durationSeconds = durationMs / 1000;
  const humanizedDuration =
    durationSeconds >= 1
      ? `${durationSeconds.toFixed(4)} seconds`
      : `${durationMs.toFixed(3)} ms`;

  return {
    duration: +durationSeconds.toFixed(3),
    humanized: humanizedDuration,
    length: Array.isArray(data) ? data.length : (!data ? 0 : 1) ,
    data,
  };
}