FROM node as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install


FROM node as builder
ARG api_url
ENV REACT_APP_API_URL=$api_url
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build


FROM node as runner
WORKDIR /app
COPY --from=builder /app/build ./build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build"]