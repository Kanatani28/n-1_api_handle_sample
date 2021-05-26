import { NextApiRequest, NextApiResponse } from 'next'

type User = {
  id: number
  name: string
  companyId: number
}

const testUsers: User[] = [
  {
    id: 1,
    name: '山田太郎',
    companyId: 1,
  },
  {
    id: 2,
    name: '田中二郎',
    companyId: 3,
  },
  {
    id: 3,
    name: '佐藤三郎',
    companyId: 2,
  },
  {
    id: 4,
    name: '鈴木四郎',
    companyId: 3,
  },
  {
    id: 5,
    name: '高橋吾郎',
    companyId: 2,
  },
]

function sleep(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000))
}

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await sleep(1)
  res.status(200).json(testUsers)
}

export default handler
