# Jreq Backend (Node.js)
FROM node:20-alpine
WORKDIR /app
# Install deps first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund || npm install --no-audit --no-fund
# Copy source
COPY server.mjs ./
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.mjs"]
