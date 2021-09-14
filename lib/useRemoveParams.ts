import Router from 'next/router'

const useRemoveFilterParams = (type: string) => {
  let newSearchParams: string
  const searchParam = Router.query

  const objectToQueryString = (objectParams) => {
    return Object.keys(objectParams).map((key) => {
      return key + '=' + objectParams[key];
    }).join('&');
  }

  if (type === "filter") {
    const res = {}
    if (searchParam['sort']) res['sort'] = searchParam['sort'];
    newSearchParams = objectToQueryString(res)
  }

  if (type === "sort") {
    let { lng, sort, ...resetSearchParams } = searchParam
    newSearchParams = objectToQueryString(resetSearchParams)
  }

  return newSearchParams
}

export default useRemoveFilterParams;