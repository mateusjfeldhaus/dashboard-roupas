/**
 * Keep-alive interno — roda dentro do Railway, independente do GitHub Actions.
 * Supabase pausa projetos após 7 dias sem atividade de banco de dados.
 * A cada 4 dias fazemos uma query real no Supabase (via PostgREST) e no Neon.
 */
import cron from 'node-cron'
import { db } from '../db/client'
import { sql } from 'drizzle-orm'
import { supabase } from './supabase'

async function pingDatabases() {
  const ts = new Date().toISOString()

  // Neon
  try {
    await db.execute(sql`SELECT 1`)
    console.log(`[keep-alive] ${ts} — Neon: OK`)
  } catch (err) {
    console.error(`[keep-alive] ${ts} — Neon: ERRO`, err)
  }

  // Supabase — chamada à Storage API mantém o projeto ativo
  try {
    await supabase.storage.listBuckets()
    console.log(`[keep-alive] ${ts} — Supabase: OK`)
  } catch (err) {
    console.error(`[keep-alive] ${ts} — Supabase: ERRO`, err)
  }
}

export function startKeepAlive() {
  // Roda de 4 em 4 dias às 08:00 UTC (margem segura antes dos 7 dias)
  // Cron: minuto hora * * dia_semana — usando "a cada 4 dias" via intervalo de dias do mês
  // node-cron não suporta */4 em dias diretamente de forma confiável; usamos dias fixos:
  // 1, 5, 9, 13, 17, 21, 25, 29 de cada mês às 08:00 UTC
  cron.schedule('0 8 1,5,9,13,17,21,25,29 * *', pingDatabases, {
    timezone: 'UTC',
  })

  console.log('[keep-alive] cron registrado — pings a cada 4 dias às 08:00 UTC')

  // Ping imediato na inicialização para validar conexões
  pingDatabases()
}
