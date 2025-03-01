#Build Stage
FROM node:22 AS builder

#set the working directory
WORKDIR /build

#copy the package file
COPY package*.json ./

#install the dependencises 
RUN npm install

#Copy the source code 
COPY tsconfig.json ./
COPY src ./src

RUN npm run build

#Runner Stage
FROM node:22-slim

# Add curl 
RUN apt-get update && apt-get install -y curl

# Create a non-root user nodeappuser & group
RUN addgroup --system nodeappgroup 
# Create a system user and add it to the group
RUN adduser --system --ingroup nodeappgroup nodeappuser

WORKDIR /app

COPY --from=builder build/dist ./dist
COPY --from=builder build/node_modules ./node_modules

# Change ownership to the non-root user
RUN chown -R nodeappuser:nodeappgroup /app

# Switch to the non-root user
USER nodeappuser

# Expose port and start the application
EXPOSE 3000

CMD ["node", "dist/index.js"]