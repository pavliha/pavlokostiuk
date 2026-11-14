import pino from "pino"

const logger = pino({ base: { service: "pavlokostiuk-internal" } })

export const traced = async <T>(event: string, fields: Record<string, string | number | boolean>, work: () => Promise<T>): Promise<T> => {
  const started = performance.now()
  const durationMs = () => Math.round(performance.now() - started)
  try {
    const result = await work()
    logger.info({ event, ...fields, outcome: "ok", durationMs: durationMs() })
    return result
  } catch (error) {
    logger.error({ event, ...fields, outcome: "error", durationMs: durationMs(), err: error })
    throw error
  }
}
