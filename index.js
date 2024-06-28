const http = require("http");
const url = require("url");
const fs = require("fs/promises");

async function read404Page() {
	try {
		const data = await fs.readFile("./404.html");
		return data;
	} catch (error) {
		throw error;
	}
}

http
	.createServer(async (req, res) => {
		const parsedReqURL = url.parse(req.url);
		const filename =
			"." + parsedReqURL.pathname === "./"
				? "./index.html"
				: "." + parsedReqURL.pathname + ".html";
		let data;
		try {
			data = await fs.readFile(filename);
			res.writeHead(200, { "Content-Type": "text/html" });
			return res.end(data);
		} catch {
			data = await read404Page();
			res.writeHead(404, { "Content-Type": "text/html" });
			res.write(data);
			return res.end();
		}
	})
	.listen(8080, "127.0.0.1");
console.log("Server running at http://127.0.0.1:8080/");
