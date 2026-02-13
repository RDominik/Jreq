# Jreq Frontend (static HTML via tiny Node server)
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund || npm install --no-audit --no-fund
COPY index.html server.mjs ./
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.mjs"]
