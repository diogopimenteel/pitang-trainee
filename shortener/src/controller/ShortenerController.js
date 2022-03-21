import mongoose from 'mongoose';
import crypto from 'crypto';
import parser from 'ua-parser-js';
import ShortenerModel from '../model/ShortenerModel.js';

export default class ShortenerController {
  async index(request, response) {
    const shorteners = await ShortenerModel.find();

    response.json(shorteners.length === 0 ? { message: 'Empty list' } : { data: shorteners });
  }

  async getOne(request, response) {
    const { id } = request.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const shortener = await ShortenerModel.findById(id);

      if (!shortener) {
        return response.status(404).json({ message: 'Shortener not found' });
      }

      return response.json({ message: 'Shortener found', data: shortener });
    }

    response.status(400).json({ message: 'Invalid id' });
  }

  async store(request, response) {
    const { link } = request.body;

    if (!link.trim()) {
      return response.status(400).json({ message: 'Link is missing' });
    }

    const shortener = await ShortenerModel.create({
      link: link.toLowerCase(),
      hash: crypto.randomUUID().split('-')[0],
      userId: request.loggedUser.id,
    });

    response.json({ message: 'Shortener created successfully', data: shortener });
  }

  async remove(request, response) {
    const { id } = request.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const shortener = await ShortenerModel.findById(id);

      if (!shortener) {
        return response.status(404).json({ message: 'Shortener not found' });
      }

      await shortener.remove();

      return response.json({ message: 'User removed' });
    }

    response.status(400).json({ message: 'Invalid id' });
  }

  async update(request, response) {
    const { id } = request.params;
    const { link } = request.body;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const shortener = await ShortenerModel.findByIdAndUpdate(
        id,
        {
          link,
        },
        { new: true },
      );

      if (!shortener) {
        return response.status(404).json({ message: 'Shortener not found' });
      }
      return response.json({
        message: 'Shortener updated successfully',
        data: shortener,
      });
    }

    response.status(400).json({ message: 'Invalid id!' });
  }

  async redirect(request, response) {
    const { hash } = request.params;
    const shortener = await ShortenerModel.findOne({ hash });

    if (!shortener) {
      return response.redirect('/');
    }

    const metadata = {
      ip: request.ip,
      parser: parser(request.headers['user-agent']),
    };

    shortener.hits++;
    shortener.metadata = [...shortener.metadata, metadata];
    await shortener.save();

    response.redirect(shortener.link);
  }
}
