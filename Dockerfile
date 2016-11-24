FROM nodesource/node:6.3.0

# Dumb Init - https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js
ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Create a user, other than route, to prevent breakout attacks. - https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js 
RUN groupadd -r nodejs \
   && useradd -m -r -g nodejs nodejs

# Give nodejs user and group ownership of root and usr folders.
RUN chown -R nodejs:nodejs /root /usr

# Change to nodejs user.
USER nodejs

# Copy package.json
ADD package.json package.json

RUN npm install

# Global Packages
RUN npm install -g nodemon yo generator-bookshelf knex

CMD ["dumb-init", "bash"]
