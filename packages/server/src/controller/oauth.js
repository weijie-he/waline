const qs = require('querystring');
const jwt = require('jsonwebtoken');
const { PasswordHash } = require('phpass');
const request = require('request-promise-native');
module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.service(
      `storage/${this.config('storage')}`,
      'Users'
    );
  }

  async indexAction() {
    const { code, type, redirect } = this.get();
    const { oauthUrl } = this.config();

    if (!code) {
      const { protocol, host } = this.ctx;
      const redirectUrl = `${protocol}://${host}/oauth?${qs.stringify({
        redirect,
        type,
      })}`;
      return this.redirect(
        `${oauthUrl}/${type}?${qs.stringify({ redirect: redirectUrl })}`
      );
    }

    /**
     * user = { id, name, email, avatar,url };
     */
    const user = await request({
      url: `${oauthUrl}/${type}?code=${code}`,
      method: 'GET',
      json: true,
    });
    if (!user || !user.id) {
      return this.fail();
    }

    const userBySocial = await this.modelInstance.select({ [type]: user.id });

    if (!think.isEmpty(userBySocial)) {
      const token = jwt.sign(userBySocial[0].email, this.config('jwtKey'));

      if (redirect) {
        return this.redirect(
          redirect + (redirect.includes('?') ? '&' : '?') + 'token=' + token
        );
      }

      return this.success();
    }

    if (!user.email) {
      user.email = `${user.id}@mail.${type}`;
    }

    const current = this.ctx.state.userInfo;
    if (!think.isEmpty(current)) {
      const updateData = { [type]: user.id };

      if (!current.avatar && user.avatar) {
        updateData.avatar = user.avatar;
      }

      await this.modelInstance.update(updateData, {
        objectId: current.objectId,
      });

      return this.success();
    }

    const userByEmail = await this.modelInstance.select({ email: user.email });
    if (think.isEmpty(userByEmail)) {
      const count = await this.modelInstance.count();
      const data = {
        display_name: user.name,
        email: user.email,
        url: user.url,
        avatar: user.avatar,
        [type]: user.id,
        password: new PasswordHash().hashPassword(Math.random()),
        type: think.isEmpty(count) ? 'administrator' : 'guest',
      };

      await this.modelInstance.add(data);
    } else {
      const updateData = { [type]: user.id };

      if (!userByEmail.avatar && user.avatar) {
        updateData.avatar = user.avatar;
      }
      await this.modelInstance.update(updateData, { email: user.email });
    }

    const token = jwt.sign(user.email, this.config('jwtKey'));

    if (redirect) {
      return this.redirect(
        redirect + (redirect.includes('?') ? '&' : '?') + 'token=' + token
      );
    }

    return this.success();
  }
};
