# Docker Setup untuk Sirekor App

## 🐳 Menjalankan Aplikasi dengan Docker

### Prerequisites
- Docker
- Docker Compose

### 🚀 Quick Start

1. **Clone repository dan masuk ke direktori**
```bash
cd sirekor-app
```

2. **Buat file environment (opsional)**
```bash
cp .env.example .env
# Edit .env sesuai kebutuhan
```

3. **Jalankan aplikasi dengan Docker Compose**
```bash
# Build dan jalankan semua services
docker-compose up -d

# Atau menggunakan npm script
npm run docker:up
```

4. **Akses aplikasi**
- Frontend: http://localhost:3000
- PostgreSQL: localhost:5432

### 📋 Available Commands

#### Docker Commands
```bash
# Build image
npm run docker:build

# Start services
npm run docker:up

# Stop services
npm run docker:down

# View logs
npm run docker:logs

# View logs for specific service
docker-compose logs -f app
docker-compose logs -f postgres
```

#### Database Commands
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Deploy migrations (production)
npm run db:deploy

# Open Prisma Studio
npm run db:studio
```

### 🔧 Services

#### PostgreSQL Database
- **Container**: sirekor-postgres
- **Port**: 5432
- **Database**: sirekor_db
- **User**: sirekor_user
- **Password**: sirekor_password

#### Next.js Application
- **Container**: sirekor-app
- **Port**: 3000
- **Environment**: production

### 🛠️ Development

#### Hot Reload (untuk development)
Untuk development dengan hot reload, jalankan secara terpisah:

```bash
# Terminal 1: Start PostgreSQL
docker-compose up postgres -d

# Terminal 2: Run app locally
npm run dev
```

#### Database Connection
```bash
# Connect ke PostgreSQL dari host
psql -h localhost -p 5432 -U sirekor_user -d sirekor_db
```

### 🐛 Troubleshooting

#### Reset Database
```bash
# Stop semua services
docker-compose down

# Hapus volume database
docker-compose down -v

# Start ulang
docker-compose up -d
```

#### View Container Status
```bash
docker-compose ps
```

#### Rebuild Application
```bash
docker-compose up --build -d
```

### 📁 File Structure untuk Docker
```
sirekor-app/
├── Dockerfile              # Docker image configuration
├── docker-compose.yml      # Multi-container setup
├── .dockerignore           # Files to ignore in Docker build
├── DOCKER.md              # This file
└── prisma/
    └── schema.prisma       # Updated for PostgreSQL
```

### 🔒 Environment Variables

Environment variables yang digunakan dalam Docker:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_BASE_URL`: Base URL aplikasi
- `NEXT_PUBLIC_ENVIRONMENT`: Environment (docker)
- `JWT_SECRET`: Secret key untuk JWT

### 📝 Notes

- Database akan otomatis di-migrate saat container pertama kali dijalankan
- Volume PostgreSQL akan persist data meskipun container di-restart
- Aplikasi akan menunggu database ready sebelum start
- Health check memastikan database siap sebelum aplikasi start
