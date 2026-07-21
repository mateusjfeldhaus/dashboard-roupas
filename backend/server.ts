import { app } from './app'
import { startKeepAlive } from './lib/keepAlive'

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`[wardrobe] servidor rodando em http://localhost:${PORT}`)
  startKeepAlive()
})
