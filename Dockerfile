# syntax=docker/dockerfile:1

FROM node:18.6-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
# Install Doppler CLI - test
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler \
CMD ["doppler","run","--", "npm", "run", "no-build-start"]
LABEL org.opencontainers.image.source=https://github.com/Team-Resourceful/discord-bot-ts
LABEL org.opencontainers.image.description="Team Resourceful Discord Bot"
LABEL org.opencontainers.image.licenses=ARR