import { NextApiRequest, NextApiResponse } from 'next'

type Company = {
  id: number
  name: string
}

const testCompanies: Company[] = [
  {
    id: 1,
    name: '株式会社その壱',
  },
  {
    id: 2,
    name: '株式会社その弐',
  },
  {
    id: 3,
    name: '株式会社その参',
  },
]

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await sleep(1)
  const { id } = req.query

  const company: Company = testCompanies.find(
    (company) => String(company.id) === id
  )

  if (company) {
    res.status(200).json(company)
    return
  }

  res.status(404).json({ message: 'Not found.' })
}

function sleep(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000))
}

export default handler
