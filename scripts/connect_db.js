const { Client } = require("pg");

const configs = [
  {
    name: "Pooler us-west-1",
    connectionString: "postgresql://postgres.iiottihhpfaqqqsywmnm:Ilovemama%4001@aws-0-us-west-1.pooler.supabase.com:6543/postgres",
  },
  {
    name: "Pooler us-east-1",
    connectionString: "postgresql://postgres.iiottihhpfaqqqsywmnm:Ilovemama%4001@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
  },
  {
    name: "Direct with ssl",
    connectionString: "postgresql://postgres:Ilovemama%4001@db.iiottihhpfaqqqsywmnm.supabase.co:5432/postgres",
  },
];

async function tryConnect(config) {
  return new Promise((resolve) => {
    const client = new Client({
      connectionString: config.connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });

    client.connect((err) => {
      if (err) {
        console.log(`FAIL ${config.name}: ${err.message}`);
        resolve(false);
      } else {
        console.log(`SUCCESS ${config.name}: Connected!`);
        client.query('SELECT NOW()', (err, res) => {
          if (err) console.log(`  Query error: ${err.message}`);
          else console.log(`  Server time: ${res.rows[0].now}`);
          client.end();
          resolve(true);
        });
      }
    });
  });
}

async function main() {
  console.log("Trying database connections...\n");
  for (const config of configs) {
    const success = await tryConnect(config);
    if (success) {
      console.log("\n*** CONNECTION WORKS! ***\n");
      process.exit(0);
    }
    console.log("");
  }
  console.log("All connection attempts failed.");
  process.exit(1);
}

main();
