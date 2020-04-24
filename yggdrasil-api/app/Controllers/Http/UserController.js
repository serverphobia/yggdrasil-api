'use strict'

const User = use('App/Models/User');

class UserController {
  async store ({ request, response }) {
    try {
      const data = request.only(['username', 'email', 'password']);
      const userExists = await User.findBy('email', data.email);
      if (userExists) {
        return response
          .status(400)
          .send({ message: { error: 'User already registered' }});
      }

      const user = await User.create(data);

      return user;
    } catch (err) {
      return response
        .status(err.status)
        .send(err);
    }
  }

  async index ({ request, response }) {
    try {
      const users = await User.findBy('deleted_at', null);

      return users;
    } catch (err) {
      console.error(err);
      return response
        .status(err.status)
        .send(err);
    }
  }

  async update ({ request, response, params }) {
    try {
      const user = await User.findOrFail(params.id);
      const data = request.only(["name", "email"]);

      user.merge(data);
      await user.save();

      return user;
    } catch (err) {
      return response
        .status(err.status)
        .send(err);
    }
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id);

    user.merge({ deleted_at: Date.now() })
    await user.save();
  }
}

module.exports = UserController
