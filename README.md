# Digital Consultancy API – Quick Setup

1. **Clone & enter the repo**

   ```bash
   git clone https://github.com/your-org/Digital-Consultancy-BE-.git
   cd Digital-Consultancy-BE-

2. **Install packages**
npm install

3. **Add a .env file**
PORT=5002
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=digitalconsultancy
DB_PORT=3306

MAIL_USER=
MAIL_PASS=

TOKEN_SECRET=12a35535c305f6b9d1c90ee73f7a4be5e869304eacf0e3474e556118b1e2b90c
SALT_ROUNDS=12
SECRET_KEY=SDFNSDMNFKSNFJKSDNF

4. **Create the database**

5. **Migrate → seed → run**
npm run migrate       # make tables
npm run seed          # fill initial data
npm run dev           # start server on http://localhost:5002