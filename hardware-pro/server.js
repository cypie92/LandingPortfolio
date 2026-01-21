const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// --- FIX START: IISNODE NAMED PIPE SUPPORT ---

// 1. Do NOT parse INT. IISNode passes a Named Pipe string (e.g. \\.\pipe\...)
//    If we parseInt() a pipe string, it becomes NaN, and the app fails to connect to IIS.
const currentPort = process.env.PORT || 3000;

// 2. Handle Hostname for Pipes.
//    If currentPort is a Pipe (NaN), 'hostname' must be undefined to let Node listen on the file system.
//    If we force '0.0.0.0' while using a Pipe, it might cause errors.
const hostname = (process.env.PORT && Number.isNaN(Number(process.env.PORT)))
    ? undefined
    : (process.env.HOSTNAME || "0.0.0.0");

// --- FIX END ---

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Be sure to pass true as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);

            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("internal server error");
        }
    })
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(currentPort, hostname, () => {
            console.log(`> Ready on http://${hostname || 'localhost'}:${currentPort}`);
        });
});
