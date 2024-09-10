import { logger } from '../logger'

export interface PipelineProps<T> {
  execFunc: () => Promise<PipelineResult<T>>
  authenFunc?: () => Promise<PipelineResult<T>>
}

export interface PipelineResult<T> {
  message: string
  status: number
  data: T
}

export const pipeline = async <T>({
  execFunc,
  authenFunc,
}: PipelineProps<T>): Promise<PipelineResult<T>> => {
  logger.enableColor()
  if (typeof authenFunc !== 'undefined') {
    try {
      logger.info(
        `start-processing-auth`,
        '---------------------------------------------------------'
      )
      const resultAuthen = await authenFunc()
      logger.info(
        `success-${authenFunc.toString()}`,
        resultAuthen.message,
        JSON.stringify(resultAuthen.data)
      )
      if (resultAuthen.status !== 200) {
        return resultAuthen
      }
    } catch (err: any) {
      logger.error(`error-${authenFunc.toString()}`, err.message, JSON.stringify(err))
      return {
        status: 500,
        message: err.message,
        data: err,
      }
    } finally {
      logger.info(
        `finish-processing-auth`,
        '---------------------------------------------------------'
      )
    }
  }
  try {
    logger.info(
      `start-processing-func`,
      '---------------------------------------------------------'
    )
    const result = await execFunc()
    logger.info(`success-${execFunc.toString()}`, result.message, JSON.stringify(result.data))
    return result
  } catch (err: any) {
    logger.error(`error-${execFunc.toString()}`, err.message, JSON.stringify(err))
    return {
      status: 500,
      message: err.message,
      data: err,
    }
  } finally {
    logger.info(
      `finish-processing-func`,
      '---------------------------------------------------------'
    )
  }
}
