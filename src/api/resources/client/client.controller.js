import Joi from 'joi';
import HttpStatus, { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import clientService from './client.service';
import Client from './client.model';

export default {
  async create(req, res) {
    try {
      const { value, error } = clientService.validateCreateSchema(req.body);

      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const client = await Client.create(value);

      return res.json(client);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json(error);
    }
    // Invoice.create(value)
    //   .then(invoice => res.json(invoice))
    //   .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  async findAll(req, res) {
    try {
      const clients = await Client.find();
      return res.json(clients);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
  async findOne(req, res) {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(NOT_FOUND).json({
          err: 'Could not find client',
        });
      }
      return res.json(client);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
  async delete(req, res) {
    try {
      const client = await Client.findByIdAndRemove({
        _id: req.params.id,
      });
      if (!client) {
        return res.status(NOT_FOUND).json({
          err: 'Could not delete client',
        });
      }
      return res.json(client);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
  async update(req, res) {
    try {
      const { value, error } = clientService.validateUpdateSchema(req.body);

      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const client = await Client.findOneAndUpdate({ _id: req.params.id }, value, { new: true });

      return res.json(client);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
};
