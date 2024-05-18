import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const dbUri = process.env.DATABASE_URI
const port = process.env.PORT

export default { dbUri, port }
