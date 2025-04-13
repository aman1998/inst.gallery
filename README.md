
## Run Locally

Clone the project

```bash
  git clone https://github.com/aman1998/inst.gallery.git
```

Go to the project directory

```bash
  cd inst.gallery
```

Install dependencies

```bash
  npm install
```

Build

```bash
  npm run build
  cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
```

Start the server

```bash
  node .next/standalone/server.js
```

