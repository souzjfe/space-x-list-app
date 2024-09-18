import { httpSpaceX } from ".";


type LauchesParams = {
  name: string
  page: number
}

export const getLacunches = async ({ name, page }: LauchesParams) => {
  const response = await httpSpaceX.post('/launches/query',{
    query: {
      name: { "$regex": name, "$options": "i" }
    },
    options: {
      page
    }
  });
  return {
    launches: response.data.docs,
    pagination: {
      totalPages: response.data.totalPages,
    }
  };
}