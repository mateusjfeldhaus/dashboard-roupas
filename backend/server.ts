import { app } from './app'

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`[wardrobe] servidor rodando em http://localhost:${PORT}`)
})
