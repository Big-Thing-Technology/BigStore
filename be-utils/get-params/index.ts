import { logger } from '../logger'
import { PipelineResult } from '../pipeline'

export const getPageSize = (req: any): PipelineResult<{ page: number; pageSize: number }> => {
  const pageProps = req.nextUrl.searchParams.get('page')
  const pageSizeProps = req.nextUrl.searchParams.get('pageSize')
  logger.info('page-pageSize-params', 'value from url', { pageProps, pageSizeProps })
  if (pageProps === null || pageSizeProps === null) {
    logger.error('page-pageSize-params', 'is required', { pageProps, pageSizeProps })
    return {
      status: 400,
      message: 'pageRequired',
      data: {
        page: 0,
        pageSize: 0,
      },
    }
  }
  if (Number.isNaN(pageProps) || Number.isNaN(pageSizeProps)) {
    logger.error('page-pageSize-params', 'not number', { pageProps, pageSizeProps })
    return {
      status: 400,
      message: 'pageIsNumber',
      data: {
        page: 0,
        pageSize: 0,
      },
    }
  }
  const page = Number(pageProps)
  const pageSize = Number(pageSizeProps)
  logger.info('page-pageSize-params', 'ok', {
    page,
    pageSize,
  })
  return {
    status: 200,
    message: 'ok',
    data: {
      page,
      pageSize,
    },
  }
}

export const getSortValue = (
  req: any
): PipelineResult<{ field: string | null; sort: 'desc' | 'asc' | null }> => {
  const fieldProps = req.nextUrl.searchParams.get('fieldSort')
  const sortProps = req.nextUrl.searchParams.get('sortValue')
  logger.info('page-sort-params', 'value from url', JSON.stringify({ fieldProps, sortProps }))
  if ((sortProps !== null && sortProps == null) || (sortProps == null && sortProps !== null)) {
    logger.error('page-sort-params', 'invalid value', JSON.stringify({ fieldProps, sortProps }))
    return {
      status: 400,
      message: 'invalidSortParam',
      data: {
        field: '',
        sort: 'asc',
      },
    }
  }
  if (sortProps !== null && sortProps !== null && sortProps !== 'asc' && sortProps !== 'desc') {
    logger.error('page-sort-params', 'invalid value', JSON.stringify({ fieldProps, sortProps }))
    return {
      status: 400,
      message: 'invalidSortParam',
      data: {
        field: '',
        sort: 'asc',
      },
    }
  }
  const field = fieldProps
  const sort = sortProps
  return {
    status: 200,
    message: 'ok',
    data: {
      field,
      sort,
    },
  }
}

export const getFilterParams = (req: any): PipelineResult<{ filter: object }> => {
  const filterProps = req.nextUrl.searchParams.get('filter')
  const filter = filterProps === null ? {} : JSON.parse(filterProps)
  logger.info('page-filter-params', 'value from url', JSON.stringify(JSON.stringify(filter)))
  return {
    status: 200,
    message: 'ok',
    data: {
      filter,
    },
  }
}
