import express from 'express';
import mongoose from 'mongoose';

import { devConfig } from './config/env/development';
import { restRouter } from './api';
import { setGlobalMiddleware } from './api/middleware/global-middleware';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${devConfig.database}`);
const app = express();
const PORT = devConfig.port;

// Global middleware
setGlobalMiddleware(app);
app.use('/api', restRouter);
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: error.message,
  });
});

app.get('/failure', (req, res) => res.redirect('http://localhost:4200/login'));
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
