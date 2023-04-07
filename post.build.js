const fs = require("fs");
const path = require("path");
const type = require("mime-types");

const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "pgapex",
  password: "postgres",
  port: 5432,
});

let files = [];

const readBuild = (_path) => {
  let dir = fs.readdirSync(_path);

  for (let node of dir) {
    let p = path.join(_path, node);
    if (fs.lstatSync(p).isDirectory()) {
      readBuild(p);
    } else {
      files.push(p);
    }
  }
};

readBuild("./build");
client.connect((err, client, done) => {
  if (err) throw err;
  client.query("delete from api.statics", (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res);
    }
  });

  for (let file of files) {
    if (
      file.split(".").pop() == "js" ||
      file.split(".").pop() == "html" ||
      file.split(".").pop() == "json" ||
      file.split(".").pop() == "css"
    ) {
      console.log(file);
      for (let f of files)
        if (
          f.split(".").pop() == "js" ||
          f.split(".").pop() == "html" ||
          f.split(".").pop() == "json" ||
          f.split(".").pop() == "css"
        )
          fs.writeFileSync(
            file,
            fs
              .readFileSync(file)
              .toString()
              .replaceAll(
                f.replace("/build/", "").replace("build/", ""),
                "rpc/runtime?_=" + f.replace("/build/", "").replace("build/", "")
              )
          );
        else
          fs.writeFileSync(
            file,
            fs
              .readFileSync(file)
              .toString()
              .replaceAll(
                f.replace("/build/", "").replace("build/", ""),
                "rpc/static?_=" + f.replace("/build/", "").replace("build/", "")
              )
          );
    }

    let q = `
    insert into api.statics (code, version, path,mime) values ('${fs.readFileSync(
      file,
      "base64"
    )}','1','${file.replace("build/", "")}','${type.lookup(file)}');
`;

    if (err) throw err;
    client.query(q, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res);
      }
    });
  }
});