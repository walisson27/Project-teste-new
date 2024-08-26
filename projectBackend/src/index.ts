import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432', 10),
});

app.use(cors());
app.use(express.json());

app.get('/demos', async (req, res) => {
  const result = await pool.query('SELECT * FROM demos');
  res.json(result.rows);
});

app.post('/demos', async (req, res) => {
    const { name } = req.body; 
    try {
      const result = await pool.query('INSERT INTO demos (name) VALUES ($1) RETURNING *', [name]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao adicionar demo:', error);
      res.status(500).json({ error: 'Erro ao adicionar demo' });
    }
  });

app.put('/demos/:demoId', async (req, res) => {
    const { demoId } = req.params;
    const { name } = req.body;
    try {
      await pool.query('UPDATE demos SET name = $1 WHERE id = $2', [name, demoId]);
      res.sendStatus(200);
    } catch (error) {
      console.error('Erro ao editar demo:', error);
      res.status(500).json({ error: 'Erro ao editar demo' });
    }
  });

app.delete('/demos/:demoId', async (req, res) => {
  const { demoId } = req.params;
  try {
    await pool.query('DELETE FROM demos WHERE id = $1', [demoId]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao deletar demo:', error);
    res.status(500).json({ error: 'Erro ao deletar demo' });
  }
});


app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
