import app from './app';
import { env } from './config/env';
import { prisma } from './database';

async function startServer() {
  try {
    // Tenta conectar ao banco primeiro
    await prisma.$connect();
    console.log('✅ Banco de dados conectado via Prisma.');

    // Inicia o servidor Express
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${env.PORT}/api/v1`);
    });

    // Graceful Shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\nRecebido ${signal}. Encerrando o servidor de forma limpa...`);
      server.close(async () => {
        console.log('Servidor HTTP encerrado.');
        await prisma.$disconnect();
        console.log('Conexão com o banco encerrada.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  } catch (error) {
    console.error('❌ Erro fatal ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();
